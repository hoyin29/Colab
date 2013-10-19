<?php
	include 'db_helper.php';
	
	function getLoginUsername()
	{
		global $_USER;
		echo $_USER['uid'];

		/*
		global $_PLATFORM;
		$result = $_PLATFORM->secureWeb("https://shepherd.cip.gatech.edu/proxy/?url=".urlencode("https://pinch1.lms.gatech.edu/sakai-login-tool/container"));
		$result = $_PLATFORM->secureWeb("https://shepherd.cip.gatech.edu/proxy/?url=".urlencode("https://t-square.gatech.edu/direct/site.json"));
		*/
			
		/*
		global $_PLATFORM;
		$result = $_PLATFORM->secureWeb("https://shepherd.cip.gatech.edu/proxy/?url=".urlencode("https://pinch1.lms.gatech.edu/sakai-login-tool/container"));
		$result = $_PLATFORM->secureWeb("https://shepherd.cip.gatech.edu/proxy/?url=".urlencode("https://pinch1.lms.gatech.edu/direct/user/current.json"));
		//var_dump($result);
		
		if($result == null)
			echo json_encode($_USER['uid']);
		else
			echo $result;
		*/
	}
	
	/*
		Show a list of all courses for a student by student ID
	*/
	function listCourses($studentId)
	{
		$dbQuery = sprintf("SELECT * FROM course WHERE courseId IN
			(SELECT courseId FROM studentCourseMapping WHERE studentId=" . $studentId . ")");
			
		$result = getDBResultsArray($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
		Get a single course for a student by student ID and course ID 
	*/
	function getCourse($studentId, $courseId) 
	{
        $dbQuery = sprintf("SELECT courseName FROM course WHERE courseId IN
			(SELECT courseId FROM studentCourseMapping WHERE studentId=" . $studentId . " AND courseId=" . $courseId . ")");
				
		$result = getDBResultsArray($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}

	/*
		Add a new course for a student
	*/
	function addCourse($studentId) 
	{
		$dbQuery = sprintf("SELECT courseId FROM course WHERE courseName='%s' LIMIT 1",
			mysql_real_escape_string($_POST['aCourseName']));
			
		$result = getDBResultsArray($dbQuery);
		$courseId = $result[0]['courseId'];

        $dbQuery = sprintf("INSERT INTO studentCourseMapping (courseId, studentId, visibility) 
			VALUES (" . $courseId . "," . $studentId . "," . $_POST['aVisibility'] . ")");
			
        $result = getDBResultInserted($dbQuery, 'courseId');
        
        header("Content-type: application/json");
        echo json_encode($result);
	}

	/*
		Update an existing course for a student
	*/
	function updateCourse($studentId) 
	{
		$dbQuery = sprintf("SELECT courseId FROM course WHERE courseName='%s' LIMIT 1",
			mysql_real_escape_string($_POST['eCourseName']));
			
		$result = getDBResultsArray($dbQuery);	
		$courseId = $result[0]['courseId'];
		
        $dbQuery = sprintf("UPDATE studentCourseMapping SET visibility=" . $_POST['eVisibility'] 
			. " WHERE courseId=" . $courseId . " AND studentId=" . $studentId);
        
        $result = getDBResultAffected($dbQuery);
        
        header("Content-type: application/json");
        echo json_encode($result);
	}

	/*
		Delete an existing course for a student
	*/
	function deleteCourse($studentId) 
	{
		$dbQuery = sprintf("SELECT courseId FROM course WHERE courseName='%s' LIMIT 1",
			mysql_real_escape_string($_POST['dCourseName']));
			
		$result = getDBResultsArray($dbQuery);
		$courseId = $result[0]['courseId'];
        $dbQuery = sprintf("DELETE FROM studentCourseMapping WHERE courseId=" . $courseId . " AND studentId=" . $studentId);  
	
        $result = getDBResultAffected($dbQuery);
        
        header("Content-type: application/json");
        echo json_encode($result);
	}
	
	function listFriends($courseId)
	{
		$dbQuery = sprintf("SELECT studentFirst, studentLast FROM student WHERE studentId IN
			(SELECT studentId FROM studentCourseMapping WHERE courseId=" . $courseId . ")");

		$result = getDBResultsArray($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
?>