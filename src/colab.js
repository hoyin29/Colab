$(function() {
 // Handler for .ready() called.
        console.log('ready');
 
        //Bind to the create so the page gets updated with the listing
        $('#homePageID').bind('pagebeforeshow',function(event, ui)
		{
                //console.log('pagebeforeshow');
                //Remove the old rows
                $('#peopleListID').remove();
            
                //JQuery Fetch The New Ones
                $.ajax({
                        url: "api/user/a/course",
                        dataType: "json",
						async: false,
						success: function(data, textStatus, jqXHR) 
						{
							console.log("***got all courses for this student");
							console.log(data);
							jQuery.each(data, function() 
							{
								
								$('#peopleListID').append("<li>" + this.studentFirst + " " + this.studentLast + "</li>");
							});
						},
						error: ajaxError
                });
                
                $('#peopleListID').listview('refresh');
        });
		
		$('#addCourseBtnID').bind('click', function() 
		{
                console.log("add course");
                $.ajax({
                        url: "api/user/a/course",
                        dataType: "json",
						async: false,
                        data: {'courseName': $('#courseNameID').val(),
								'studentNum': $('#studentNumID').val(),
								'studentFirst': $('#studentFirstID').val(),
								'studentLast': $('#studentLastID').val()},
                        type: 'POST',
						success: function() 
						{ 
							console.log("***added new class - " + $('#courseNameID').val()); 
						},
						error: ajaxError
                });
        });
               
});
 
/******************************************************************************/
 
function ajaxError(jqXHR, textStatus, errorThrown){
        console.log('ajaxError '+textStatus+' '+errorThrown);
        $('#error_message').remove();
        $("#error_message_template").tmpl( {errorName: textStatus, errorDescription: errorThrown} ).appendTo( "#error_dialog_content" );
        $.mobile.changePage($('#error_dialog'), {
                transition: "pop",
                reverse: false,
                changeHash: false
        });
}