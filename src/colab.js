$(function() {
		// Handler for .ready() called.
        console.log('ready');
		var username;
		
		/*
			Bind to the create so the page gets updated with the listing
		*/
        $('#homePageID').bind('pagebeforeshow',function(event, ui)
		{
				$.ajax({
					url: "api/user",
					dataType: "text",
					async: false,
					success: function(data3, textStatus, jqXHR) 
					{
						console.log("***getting currently login username");
						console.log(data3);
						username = data3;
					},
					error: ajaxError
				});
				
				//console.log("***after ajax call, js has username: " + username);
				/*
				$.ajax({
					url: "https://t-square.gatech.edu/direct/site.json",
					dataType: "json",
					async: false,
					success: function(data4, textStatus, jqXHR) 
					{
						console.log("***getting entity collection for the login user");
						console.log(data4);
					},
					error: ajaxError
				});
				*/
				/*
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "https://t-square.gatech.edu/direct/site.json", true);
				xhr.onreadystatechange = function() 
				{
					if (xhr.readyState == 4) 
					{
						console.log("***t-square response: \n" + xhr.responseText);
					}
				}
				xhr.send();
				*/
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
											/*
											$('#peopleListID').append("<li class='people'>" 
												+ "<a href='#'>" + this.studentFirst + " " + this.studentLast + "</a>"
												+ "<div data-role='controlgroup' data-type='horizontal'>"
												+ "<a href='#' data-mini='true' id='visID' data-inline='true' data-icon='plus' data-role='button'>Visibility</a>"
												+ "<a href='#' data-mini='true' id='chatID' data-inline='true' data-icon='plus' data-role=\"button\">Chat</a>"
												+ "<a href='#' data-role=\"button\" data-mini='true' id='mapID' data-inline='true' data-icon='plus'>Map</a>"
												+ "</div></li>");
											*/
											
											$('#peopleListID').append("<li class='people'>" 
												+ "<a href='#mapPageID'>" + this.studentFirst + " " + this.studentLast + "</a></li>");
											
											
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
				
				/*
				$('#peopleListID').each(function()
				{
					$(this).bind('click', function(e)
					{
						console.log("item clicked: " + e);
					});
				});
				*/
        });
		
		$('#mapPageID').bind('pagebeforeshow',function(event, ui)
		{
			//var yourStartLatLng = new google.maps.LatLng(59.3426606750, 18.0736160278);
			//$('#mapPageContentID').gmap({'center': yourStartLatLng});
		});
		
		/*
			Bind the back to home button
		*/
		/*
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
		*/
		
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