<?php

	function connect()
	{
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "finalproject";

		$connection = new mysqli($servername, $username, $password, $dbname);
	
		# Check connection
		if ($connection->connect_error) 
		{
		    return null;
		}
		else
		{
			return $connection;
		}
	}

	# Query to find out if the user already exist in the Database
    function verifyUser($userName)
    {
    	# Open and validate the Database connection
    	$conn = connect();

        if ($conn != null)
        {
        	$sql = "SELECT * FROM Users WHERE username = '$userName'";
			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				# The current user already exists
				$conn->close();
				return array("status" => "ERROR");
			}
			else
			{
				# Username not yet in use
				$conn->close();
				return array("status" => "COMPLETE");
			}
        }
        else
        {
        	# Connection to Database was not successful
        	$conn->close();
        	return array("status" => "ERROR");
        }
    }

    # Query to insert a new user to the Database
    function registerNewUser($userFirstName, $userLastName, $userName, $email, $userPassword)
    {
    	# Open and validate the Database connection
    	$conn = connect();

        if ($conn != null)
        {
        	$sql = "INSERT INTO Users(fName, lName, username, email, passwrd) VALUES ('$userFirstName', '$userLastName', '$userName', '$email', '$userPassword')";		
			if (mysqli_query($conn, $sql)) 
	    	{
	    		# User registered correctly
	    		$conn->close();
			    return array("status" => "COMPLETE");
			} 
			else 
			{
				# Something went wrong when inserting the user
				$conn->close();
				return array("status" => "ERROR");
			}
        }
        else
        {
        	# Connection to Database was not successful
        	$conn->close();
        	return array("status" => "ERROR");
        }
    } 

    # Query to retrieve a user data
    function validateUser($userName)
    {
        # Open and validate the Database connection
    	$conn = connect();

        if ($conn != null)
        {
        	$sql = "SELECT * FROM Users WHERE userName = '$userName'";
			$result = $conn->query($sql);
			
			# The current user exists
			if ($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc()) 
		    	{
					$conn->close();
					return array("status" => "COMPLETE", "fName" => $row['fName'], "lName" => $row['lName'], "password" => $row['passwrd']);
				}
			}
			else
			{
				# The user doesn't exists in the Database
				$conn->close();
				return array("status" => "ERROR");
			}
        }
        else
        {
        	# Connection to Database was not successful
        	$conn->close();
        	return array("status" => "ERROR");
        }
    }

    function dbLoadComments(){
    	$conn = connect();
        if ($conn != null)
		{
			$sql = "SELECT * FROM Users JOIN Comment ON Users.username = Comment.username";

			$result = $conn->query($sql);

			$response = array(array("status" => "COMPLETE"));

			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					array_push($response, array("username" => $row["username"], "email" => $row["email"], "comment" => $row["commentText"]));
				}
			}
			$conn->close();
			return $response;

		}
		else
		{
			$conn->close();
			return array("status" => "ERROR");
		}
	}

	function dbPostComment($uName, $commentText)
	{
		$conn = connect();
		if($conn != null){
			
			$sql = "INSERT INTO comment(username, commentText)
					VALUES('$uName', '$commentText')";

			if(mysqli_query($conn, $sql))
			{
				$response = array("status" => "COMPLETE");
				return $response;
			}
			else
			{
				return array("status" => "ERROR");
			}
		}

		else
		{

			return array("status" => "ERROR");
		}
	}

	function dbSaveOrder($username, $order)
	{
		$conn = connect();
		if($conn != null){
			$sql = "INSERT INTO Orders(username, orders)
					VALUES('$username', '$order')";

			$result = mysqli_query($conn, $sql);
			if ($result){
				$response = array("status" => "COMPLETE");
				return $response;
			}
			else{
				return array("status" => "ERROR");
			}
		}
		else{
			return array("status" => "ERROR");
		}	
	}

	function dbGetOrders($username)
	{
		$conn = connect();
		if($conn != null)
		{
			$sql = "SELECT orders
					FROM Orders
					WHERE username = '$username'";

			$result = $conn->query($sql);

			$response = array(array("status" => "COMPLETE"));
			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					array_push($response, array("order" => $row["orders"]));
				}
			}

			return $response;
		}
		else{
			return array("status" => "ERROR");
		}
	}
 
?>
