<?php
	include 'db_helper.php';
	
	function listLocations() {
		$dbQuery = sprintf("SELECT username,longitude,latitude,altitude,accuracy,time_spotted FROM student_locations");
		$result = getDBResultsArray($dbQuery);
		error_log("Could not get student locations");
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	function getStudentLocation($username) {
		$dbQuery = sprintf("SELECT username,longitude,latitude,altitude,accuracy,time_spotted FROM student_locations WHERE username = '%s'",
			mysql_real_escape_string($username));
		$result=getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	/*
	function addLocation($username){
	//, $longitude, $latitude, $altitude, $accuracy) {
		$lon = $_POST['longitude'];
		$lon = floatval($var);
		$lat = floatval($latitude);
		$alt = floatval($altitude);
		$acc = floatval($accuracy);
		
		$dbQuery = sprintf(
			"INSERT INTO student_locations (username,longitude,latitude,altitude,accuracy,time_spotted) VALUES ('%s', $lon, $lat, $alt, $acc, NOW())",
			mysql_real_escape_string($username));
			
		$result = getDBResultInsert($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
		
	}*/
	
?>
