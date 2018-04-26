$(document).ready(function(){
	$("#slogan").html("Burgers and fries the way they were always <span class=\"slogan\">meant to be.</slogan>");
	$("footer").text("All Rights Resered. Market IT");

	var username;
	$.ajax({
		url : "data/checkSession.php",
		type : "POST",
		dataType : "json",
		success : function(dataReceived){
			if(dataReceived.fName == "false"){
				alert("No user logged in.");
				window.location.href = "login.html";
			}
			else{
				username = dataReceived.uName;
				showOrders(username);
			}
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);
		}
	});
});

function showOrders(username){
	
	var jsonToSend = {
		"username" : username,
		"action" : "GET_ORDER"
	};
	$.ajax({
		url : "data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		dataType : "json",
		success : function(dataReceived)
		{
			$("#myorders").html("");
			for(var i = 0; i < dataReceived.length; i++){
				var order = dataReceived[i].order;
				$("#myorders").html($("#myorders").html().concat(order));
			}
		},
		error : function(errorMessage)
		{
			console.log("trono");
			alert(errorMessage.statusText);
		}
	});
}