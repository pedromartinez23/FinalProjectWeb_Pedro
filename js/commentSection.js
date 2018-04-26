$(document).ready(function(){
	$("#slogan").html("Burgers and fries the way they were always <span class=\"slogan\">meant to be.</slogan>");
	$("footer").text("All Rights Resered. Market IT");

	getNames();

	fillCommentSection();


	$("#submitForm").on("click", checkSession);
});

function fillCommentSection(){
	$.ajax({
		url: "data/applicationLayer.php",
		type: "POST",
		data: {'action' : 'LOAD_COMMENTS'},
		dataType : "json",
		success : function(jsonData){
			$("#commentLog").html("");
			for(var i = 0; i < jsonData.length; i++){
				var email = jsonData[i].email;
				var username = jsonData[i].username;
				var comment = jsonData[i].comment;
				var commentLog = "<br>" + email + "<br>" + username + " wrote:<br>" + comment + "<br>";
				$("#commentLog").html($("#commentLog").html().concat(commentLog));
			}
		},
		error : function(errorMessage){
			console.log('trono');
			alert(errorMessage.statusText);
		}
	});
}

function checkSession(){
	$.ajax({
		url : "data/checkSession.php",
		type : "POST",
		dataType : "json",
		contentType: 'application/x-www-form-urlencoded',
		success : function(dataReceived){
			if(dataReceived.fName != "false")
			{
				fName = dataReceived.fName;
				lName = dataReceived.lName;
				username = dataReceived.uName;
				postComment(username);
			}
							
			else
			{
				$("#loginMessage").show();
			}
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
		}
	});
}

function getNames(){
	var fName, lName;
	$.ajax({
		url : "data/checkSession.php",
		type : "POST",
		dataType : "json",
		contentType: 'application/x-www-form-urlencoded',
		success : function(dataReceived){
			if(dataReceived.fName != "false"){
				fName = dataReceived.fName;
				lName = dataReceived.lName;
				$("#welcomeMessage").text("Welcome " + fName + " " + lName);
			}
			else{
				$("#welcomeMessage").text("No user logged in.");
			}
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
		}
	});
}

function postComment(username)
{
	var commentText = $("#commentText").val();

	var jsonToSend = {
		"commentText" : commentText,
		"username" : username,
		"action" : 'POST_COMMENT'
	}
	$.ajax({
		url : "data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
			alert("Comment posted!");
				window.location.href = "commentSection.html";
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
		}
	});
}

