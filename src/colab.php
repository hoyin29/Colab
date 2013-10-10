<?php
	include 'db_helper.php';
	
	/*
	CREATE TABLE course
	(
		courseId INT(11) NOT NULL AUTO_INCREMENT,
		courseName varchar(255) NOT NULL, 
		studentId varchar(255) NOT NULL,
		studentFirst varchar(255) NOT NULL,
		studentLast varchar(255) NOT NULL,
		PRIMARY KEY (`courseId`)
	);
	
	INSERT INTO course 
	(courseName, studentId, studentFirst, studentLast) 
	VALUES ('CS11', '11', 'f1', 'l1');
	
	INSERT INTO course 
	(courseName, studentId, studentFirst, studentLast) 
	VALUES ('CS22', '22', 'f2', 'l2');
	
	INSERT INTO course 
	(courseName, studentId, studentFirst, studentLast) 
	VALUES ('CS33', '33', 'f3', 'l3');
	
	INSERT INTO course 
	(courseName, studentId, studentFirst, studentLast) 
	VALUES ('CS44', '44', 'f4', 'l4');
	*/
	
	function listCourses($username)
	{
		$dbQuery = sprintf("SELECT courseName FROM course ORDER BY courseName ASC");
		//$dbQuery = sprintf("SELECT studentGt FROM student WHERE studentGt='%s'",
			//mysql_real_escape_string($username));
			
		$result = getDBResultsArray($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	function getCoursesByStudentId($studentId) 
	{
        $dbQuery = sprintf("SELECT * FROM course WHERE studentId = '%s'",
            mysql_real_escape_string($studentId));
				
        $result = getDBResultRecord($dbQuery);
		
        header("Content-type: application/json");
        echo json_encode($result);
	}

	function addCourse() 
	{
        $dbQuery = sprintf("INSERT INTO course (courseName, studentId, studentFirst, studentLast) VALUES ('%s', '%s', '%s', '%s')",
            mysql_real_escape_string($_POST['courseName']),
			mysql_real_escape_string($_POST['studentNum']), 
			mysql_real_escape_string($_POST['studentFirst']), 
			mysql_real_escape_string($_POST['studentLast']));
 
        $result = getDBResultInserted($dbQuery, 'courseId');
        
        header("Content-type: application/json");
        echo json_encode($result);
	}

	function updateCourse($courseId, $courseName) 
	{
        $dbQuery = sprintf("UPDATE course SET courseName = '%s' WHERE courseId = '%s'",
			mysql_real_escape_string($courseName),
			mysql_real_escape_string($courseId));
        
        $result = getDBResultAffected($dbQuery);
        
        header("Content-type: application/json");
        echo json_encode($result);
	}

	function deleteCourse($courseId) 
	{
        $dbQuery = sprintf("DELETE FROM course WHERE courseId = '%s'",
            mysql_real_escape_string($courseId));  
			
        $result = getDBResultAffected($dbQuery);
        
        header("Content-type: application/json");
        echo json_encode($result);
	}
?>