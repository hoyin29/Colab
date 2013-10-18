$(function() {
 // Handler for .ready() called.
        console.log('ready');
		
		/*
			Bind to the create so the page gets updated with the listing
		*/
        $('#homePageID').bind('pagebeforeshow',function(event, ui)
		{
                //console.log('pagebeforeshow');
                //Remove the old rows
                $('.people').remove();
				
                //JQuery Fetch The New Ones
                $.ajax({
                        url: "api/user/1/course",
                        dataType: "json",
						async: false,
						success: function(data, textStatus, jqXHR) 
						{
							console.log("***got all courses for this student");
							console.log(data);
							
							jQuery.each(data, function() 
							{	
								$('#peopleListID').append("<li class='people' data-role='list-divider' data-divider-theme='g'>" + this.courseName + "</li>");
								console.log("--" + this.courseName + " -> " + this.courseId);

								$.ajax({
									url: "api/user/1/course/" + this.courseId + "/friend",
									dataType: "json",
									async: false,
									success: function(data2, textStatus, jqXHR) 
									{
										console.log("***got all friends for this course");
										console.log(data2);
										jQuery.each(data2, function() 
										{	
											$('#peopleListID').append("<li class='people'><a href='#'>" + this.studentFirst + " " + this.studentLast + "</a></li>");
											console.log("---" + this.studentFirst + " " + this.studentLast);
										});
									},
									error: ajaxError
								});
							});
						},
						error: ajaxError
                });
                
                $('#peopleListID').listview('refresh');
        });
	
		/*
			Bind the back to home button
		*/
		$('#homePageID').bind('click', function() 
		{
                console.log("***going back to home clicked");
                //Remove the old rows
                $('.people').remove();
		
                //JQuery Fetch The New Ones
                $.ajax({
                        url: "api/user/1/course",
                        dataType: "json",
						async: false,
						success: function(data, textStatus, jqXHR) 
						{
							console.log("***got all courses for this student");
							console.log(data);
							jQuery.each(data, function() 
							{	
								$('#peopleListID').append("<li class='people' data-role='list-divider' data-divider-theme='g'>" + this.courseName + "</li>");
								console.log("--" + this.courseName + " -> " + this.courseId);

								$.ajax({
									url: "api/user/1/course/" + this.courseId + "/friend",
									dataType: "json",
									async: false,
									success: function(data2, textStatus, jqXHR) 
									{
										console.log("***got all friends for this course");
										console.log(data2);
										jQuery.each(data2, function() 
										{	
											$('#peopleListID').append("<li class='people'><a href='#'>" + this.studentFirst + " " + this.studentLast + "</a></li>");
											console.log("---" + this.studentFirst + " " + this.studentLast);
										});
									},
									error: ajaxError
								});
							});
						},
						error: ajaxError
                });
                
                $('#peopleListID').listview('refresh');
        });
		
		/*
			Bind the add course button
		*/
		$('#addCourseBtnID').bind('click', function() 
		{
                console.log("***add course clicked");
				var visibility = 0;
				
				if($('#aVisibilityID').is(':checked'))
					visibility = 1;

                $.ajax({
                        url: "api/user/1/course",
                        dataType: "json",
						async: false,
                        data: {'aCourseName': $('#aCourseNameID').val(),
								'aVisibility': visibility},
                        type: 'POST',
						success: function() 
						{ 
							console.log("***added new class - " + $('#aCourseNameID').val()); 
						},
						error: ajaxError
                });
        });
             
		/*
			Bind the edit course button
		*/
		$('#editCourseBtnID').bind('click', function() 
		{
				console.log("***edit course clicked");
				var visibility = 0;
				
				if($('#eVisibilityID').is(':checked'))
					visibility = 1;

                $.ajax({
                        url: "api/user/1/course",
                        dataType: "json",
						async: false,
                        data: {'eCourseName': $('#eCourseNameID').val(),
								'eVisibility': visibility},
						headers: {'X-HTTP-Method-Override': 'PUT'},
                        type: 'POST',
						success: function() 
						{ 
							console.log("***edited class - " + $('#eCourseNameID').val()); 
						},
						error: ajaxError
                });
        });
		
		/*
			Bind the delete course button
		*/
		$('#deleteCourseBtnID').bind('click', function() 
		{
                console.log("***delete course clicked");
                $.ajax({
                        url: "api/user/1/course",
                        dataType: "json",
						async: false,
                        data: {'dCourseName': $('#dCourseNameID').val()},
                        type: 'DELETE',
						success: function() 
						{ 
							console.log("***deleted class - " + $('#dCourseNameID').val()); 
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