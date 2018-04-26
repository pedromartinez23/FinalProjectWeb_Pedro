$(document).ready(function(){
	$("footer").text("All Rights Resered. Market IT");

	fillComponents();

	getNames();

	$("#Submit").on("click", validateOrder);

	$("#mail").on("click", sendMail);

	$("#Reset").on("click", reset);


});

function fillComponents(){
	$.ajax({
		url: "data/it_market.json",
		type: "GET",
		dataType : "json",
		success : function(jsonData){
			var HTML = "";
			for(var i = 0; i < jsonData.parts.Case.length; i++){
				var Case = jsonData.parts.Case[i].type;
				var CaseValue = jsonData.parts.Case[i].value;
				var CasePrice = jsonData.parts.Case[i].cost;
				HTML += '<input type="radio" name="Case" value="' + CasePrice  + '"><label>' + Case + '</label></br>';
			}
			$("#Case").append(HTML);

			HTML = "";
			for(var i = 0; i < jsonData.parts.RAM.length; i++){
				var RAM = jsonData.parts.RAM[i].type;
				var RAMValue = jsonData.parts.RAM[i].value;
				var RAMPrice = jsonData.parts.RAM[i].cost;
				HTML += '<input type="radio" name="RAM" value="' + RAMPrice + '"><label>' + RAM + '</label></br>';
			}
			$("#RAM").append(HTML);

			HTML = "";
			for(var i = 0; i < jsonData.parts.GraphicCard.length; i++){
				var GraphicCard = jsonData.parts.GraphicCard[i].type;
				var GraphicCardValue = jsonData.parts.GraphicCard[i].value;
				var GraphicCardPrice = jsonData.parts.GraphicCard[i].cost;
				HTML += '<input type="radio" name="GraphicCard" value="' + GraphicCardPrice + '"><label>' + GraphicCard + '</label></br>';
			}
			$("#GraphicCard").append(HTML);


			HTML = "";
			for(var i = 0; i < jsonData.parts.Processor.length; i++){
				var Processor = jsonData.parts.Processor[i].type;
				var ProcessorValue = jsonData.parts.Processor[i].value;
				var ProcessorPrice = jsonData.parts.Processor[i].cost;
				HTML += '<input type="radio" name="Processor" value="' + ProcessorPrice +'"><label>' + Processor + '</label></br>';
			}
			$("#Processor").append(HTML);


			HTML = "";
			for(var i = 0; i < jsonData.parts.OperatingSystem.length; i++){
				var OperatingSystem = jsonData.parts.OperatingSystem[i].type;
				var OperatingSystemValue = jsonData.parts.OperatingSystem[i].value;
				var OperatingSystemPrice = jsonData.parts.OperatingSystem[i].cost;
				HTML += '<input type="radio" name="OperatingSystem" value="' + OperatingSystemPrice + '"><label>' + OperatingSystem + '</label></br>';
			}
			$("#OperatingSystem").append(HTML);

		}
	});
}



function getNames(){
	var fName, lName;
	$.ajax({
		url : "data/checkSession.php",
		type : "POST",
		dataType : "json",
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


function orderSummary(username){
	var Case = $("input:radio[name=Case]:checked").next('label:first').html();
	var CasePrice = $("input:radio[name=Case]:checked").val()
	var total = 0;
	var x = Number(CasePrice);
	total += x;

	var RAM = $("input:radio[name=RAM]:checked").next('label:first').html();
	var RAMPrice = $("input:radio[name=RAM]:checked").val();	
	x = Number(RAMPrice);
	total += x;

	var GraphicCard = $("input:radio[name=GraphicCard]:checked").next('label:first').html();
	var GraphicCardPrice = $("input:radio[name=GraphicCard]:checked").val();
	x = Number(GraphicCardPrice);
	total += x;

	var Processor = $("input:radio[name=Processor]:checked").next('label:first').html();
	var ProcessorPrice = $("input:radio[name=Processor]:checked").val();
	x = Number(ProcessorPrice);
	total += x;


	var OperatingSystem = $("input:radio[name=OperatingSystem]:checked").next('label:first').html();
	var OperatingSystemPrice = $("input:radio[name=OperatingSystem]:checked").val();
	x = Number(OperatingSystemPrice);
	total += x;

	var summary = $("#summaryOrder");
	var summaryText = 
		"<p>Case:</p>\n \
		 <ul><li>" + Case + "</li></ul>\n \
		 <p>RAM:</p>\n \
		 <ul><li>" + RAM + "</li></ul>\n \
		 <p>GraphicCard:</p>\n \
		 <ul><li>" + GraphicCard + "</li></ul>\n \
		 <p>Processor:</p>\n \
		 <ul><li>" + Processor + "</li></ul>\n \
		 <p>OperatingSystem:</p>\n \
		 <ul><li>" + OperatingSystem + "</li></ul>\n \
		 <p>Grand Total:</p>\n \
		 <ul><li>" + total + "</li></ul>\n \
		";


	summaryText += "-----------------------------------";

	summary.html(summary.html() + summaryText);

	$("#mail").removeClass("hideElement");

	console.log(summaryText)

	var jsonToSend = {
		"uName" : username,
		"order" : summaryText,
		"action" : "SAVE_ORDER"
	};

	$.ajax({
		url : "data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		dataType : "json",
		success : function(dataReceived){
			alert("Order saved!");
		},
		error : function(errorMessage){
			console.log("trono2")
			alert(errorMessage.statusText);
		}
	});
}



function sendMail() {
		var Case = $("input:radio[name=Case]:checked").next('label:first').html();
		var CasePrice = $("input:radio[name=Case]:checked").val()
		var total = 0;
		var x = Number(CasePrice);
		total += x;

		var RAM = $("input:radio[name=RAM]:checked").next('label:first').html();
		var RAMPrice = $("input:radio[name=RAM]:checked").val();	
		x = Number(RAMPrice);
		total += x;

		var GraphicCard = $("input:radio[name=GraphicCard]:checked").next('label:first').html();
		var GraphicCardPrice = $("input:radio[name=GraphicCard]:checked").val();
		x = Number(GraphicCardPrice);
		total += x;

		var Processor = $("input:radio[name=Processor]:checked").next('label:first').html();
		var ProcessorPrice = $("input:radio[name=Processor]:checked").val();
		x = Number(ProcessorPrice);
		total += x;


		var OperatingSystem = $("input:radio[name=OperatingSystem]:checked").next('label:first').html();
		var OperatingSystemPrice = $("input:radio[name=OperatingSystem]:checked").val();
		x = Number(OperatingSystemPrice);
		total += x;

	var body = 
		"Your Case:\n \
		 " + Case + "\n \
		 Your RAM:\n \
		 " + RAM + "\n \
		 Your GraphicCard:\n \
		 " + GraphicCard + "\n \
		 Your Processor: \n \
		 " + Processor + "\n \
		 Your OperatingSystem:\n \
		 " + OperatingSystem + "\n \
		 Grand Total:\n \
		 " + total + "\n \
		";

		window.location.href = "mailto:ivan_0423@hotmail.com?subject=Your PC&body="+body;
}

function validateOrder(){

	var bErrors = false;
	var username = "";
	
	if($("input:radio[name=Case]").is(":checked")){
		$("#CasesError").addClass("hideElement");
	}
	else{
		$("#CasesError").removeClass("hideElement");
		bErrors = true;
	}

	if($("input:radio[name=RAM]").is(":checked")){
		$("#RAMError").addClass("hideElement");
	}
	else{
		$("#RAMError").removeClass("hideElement");
		bErrors = true;
	}

	if($("input:radio[name=GraphicCard]").is(":checked")){
		$("#GraphicCardError").addClass("hideElement");
	}
	else{
		$("#GraphicCardError").removeClass("hideElement");
		bErrors = true;
	}

	if($("input:radio[name=GraphicCard]").is(":checked")){
		$("#GraphicCardError").addClass("hideElement");
	}
	else{
		$("#GraphicCardError").removeClass("hideElement");
		bErrors = true;
	}

	if($("input:radio[name=Processor]").is(":checked")){
		$("#ProcessorError").addClass("hideElement");
	}
	else{
		$("#ProcessorError").removeClass("hideElement");
		bErrors = true;
	}

	if($("input:radio[name=OperatingSystem]").is(":checked")){
		$("#OperatingSystemError").addClass("hideElement");
	}
	else{
		$("#OperatingSystemError").removeClass("hideElement");
		bErrors = true;
	}

	if(!bErrors){
		$.ajax({
			url : "data/checkSession.php",
			type : "POST",
			dataType : "json",
			success : function(dataReceived){
				if(dataReceived.fName == "false"){
					alert("A user must be logged in to submit an order.");
				}
				else{
					username = dataReceived.uName;
					orderSummary(username);
				}
			},
			error : function(errorMessage){
				//alert(errorMessage.statusText);
			}
		});
	}
}


function reset(){
	$("input:radio[name=Case]").prop("checked", false);
	$("input:radio[name=RAM]").prop("checked", false);
	$("input:radio[name=GraphicCard]").prop("checked", false);
	$("input:radio[name=Processor]").prop("checked", false);
	$("input:radio[name=OperatingSystem]").prop("checked", false);
}
