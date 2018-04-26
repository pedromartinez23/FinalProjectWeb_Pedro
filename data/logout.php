<?php
	session_start();
	unset($_SESSION["userFirstName"]);
	unset($_SESSION["userLastName"]);
	unset($_SESSION["userName"]);
	session_destroy();
?>