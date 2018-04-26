$(document).ready(function(){
	$("#logout").on("click", logout);
});

function logout(){
    $.ajax({
        url : "data/logout.php",
        type : "POST",
        dataType : "text",
        success : function(dataReceived){
            window.location.href = "login.html";
        },
        error : function(errorMessage){
            alert(errorMessage.statusText);
        }
    });
}
