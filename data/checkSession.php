<?php
	header('Content-type: application/json');
	header('Accept: application/json');

	session_start();
	if(isset($_SESSION["userFirstName"])){
		echo json_encode(array("fName" => $_SESSION["userFirstName"], "lName" => $_SESSION["userLastName"], "uName" => $_SESSION["userName"]));
	}
	else{
		echo json_encode(array("fName" => "false"));
	}
?>