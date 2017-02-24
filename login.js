/*
	Name: Yojana Patil jadrn040
	CS 645
	Project #1
	login.js

*/
$(document).ready(function() {
    var errorMsg = $('#error_msg');
    	
//Validate if username and password are present
	validate_inputs();
	
//Login submit	
    $(':submit').on('click', function(e) {
		e.preventDefault();
        if ($("#user").val() == "") {
            errorMsg.text("Please enter username!");
           $("#user").focus();            
        } else if ($("#password").val() == "") {
            errorMsg.text("Please enter password!");
            $("#password").focus();
        } else {            
            params = "user=" + $("#user").val() + "&password=" + $("#password").val();
            $.post('http://jadran.sdsu.edu/perl/jadrn040/login.cgi', params, auth_handler);
        }
    });

	
//Clear all fields
    $(':reset').on('click', function() {       
		$("#user").removeClass("error");
		$("#password").removeClass("error");
        $("#user").focus();
    });
});

function auth_handler(response) {
    if (response === 'OK')
        window.location.replace("/perl/jadrn040/add.cgi");
    else {
        $('#error_msg').text("Incorrect username or password!");
		$("#user").focus();
	}
}

//Validate if username and password are present
function validate_inputs(){
	var errorMsg = $('#error_msg');
	$("#user").focus();
    $("#user").on('blur', function() {
        if (($("#user").val()) != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    });
    $("#password").on('blur', function() {
        if (($("#password").val()) != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    }); 
}