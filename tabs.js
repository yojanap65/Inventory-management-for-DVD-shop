/*
	Name: Yojana Patil jadrn040
	CS 645
	Project #1
	tabs.js

*/
$(document).ready(function() {

//Logout functionality	
	function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
	}
	if(getCookie("jadrn040SID")=="")
		//$("body").html("Please login again!");
	$("body").html("<a class='button' href='http://jadran.sdsu.edu/~jadrn040/proj1/'><b>Please login again!</b></a>");
	
	/*Reference:https://www.w3schools.com */
	
    $("#tabs").tabs();

    var errorMsg = $('#error_message1');
    var errorMsg2 = $('#error_message2');
    var errorMsg3 = $('#error_message3');

    $.get("/perl/jadrn040/fetch_vendor.cgi", fix_vendor);
    $.get("/perl/jadrn040/fetch_category.cgi", fix_category);
    $("#sku").focus();

 // TAB-1 :Add New Record	
	validate_tab1();
	
 // TAB-2 :Edit Existing Record
	validate_tab2();

 //TAB-3 :Delete Record
	validate_tab3();
	

});
// Validate TAB-1 :Add New Record	
function validate_tab1(){
	var errorMsg = $('#error_message1');
	var cost =$("#cost").val();
	
	var retail = $("#retail").val();
	$("#sku").on('blur', function() {
        if ($("#sku").val() != "" && validate_sku($("#sku").val()) == true) {
            param = "sku=" + $("#sku").val();
            $.post('http://jadran.sdsu.edu/perl/jadrn040/duplicate.cgi', param, check_duplicate);
        }
    });
    $("#mid").on('blur', function() {
        if ($("#mid").val() != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    });
    $("#description").on('blur', function() {
        if ($("#description").val() != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    });
    $("#features").on('blur', function() {
        if ($("#features").val() != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    });
    $("#cost").on('blur', function() {
        if ($("#cost").val() != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    });
    $("#retail").on('blur', function() {
        if ($("#retail").val() != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    });
    $("#image").on('blur', function() {
        if ($("#image").val() != "") {
            $(this).removeClass("error");
            errorMsg.text("");
        }
    });
    $('#tabs-1').on('click', '#reset1', function() {
        errorMsg.text("");
        $("#upload_img1").text("");
        $("#sku").focus();
    });
    $('#tabs-1').on('click', '#add_btn', function(e) {
        e.preventDefault();
        if ($("#sku").val() == "") {
            $("#sku").addClass("error");
            errorMsg.text("Please enter SKU!");
            $("#sku").focus();

        } else if (validate_sku($("#sku").val()) == false) {
            $("#sku").addClass("error");
            errorMsg.text("Invalid SKU! It should be of the form CAT-123");
            $("#sku").focus();

        } else if ($("#vendor").children(":selected").val() === "-1") {
            $("#vendor").addClass("error");
            errorMsg.text("Please select Vendor!");
            $("#vendor").focus();

        } else if ($("#mid").val() == "") {
            $("#mid").addClass("error");
            errorMsg.text("Please enter Manufacturer ID!");
            $("#mid").focus();

        } else if ($("#category").children(":selected").val() === "-1") {
            $("#category").addClass("error");
            errorMsg.text("Please select Category!");
            $("#category").focus();

        } else if ($("#description").val() == "") {
            $("#description").addClass("error");
            errorMsg.text("Please enter Description!");
            $("#description").focus();

        } else if ($("#features").val() == "") {
            $("#features").addClass("error");
            errorMsg.text("Please enter Features!");
            $("#features").focus();

        } else if ($("#cost").val() == "") {
            $("#cost").addClass("error");
            errorMsg.text("Please enter Cost(numeric)!");
            $("#cost").focus();

        }else if ($("#retail").val() == "") {
            $("#retail").addClass("error");
            errorMsg.text("Please enter Retail Price(numeric)!");
            $("#retail").focus();

        }  else if ($("#image").val() == "") {
            $("#image").addClass("error");
            errorMsg.text("Please select Image!");
            $("#image").focus();
        } else {
            errorMsg.text("Please wait while processing....");
            var img_name = $("#sku").val();
            var form_data = new FormData($('[name="form-1"]')[0]);
            form_data.append("image", document.getElementById("image").files[0]);
            form_data.append("image_name", img_name);
		// AJAX image upload
            $.ajax({
                url: "http://jadran.sdsu.edu/perl/jadrn040/ajax_upload.cgi",
                type: "post",
                data: form_data,
				contentType: false,
                processData: false,              
                success: function(response) {
                param = "sku=" + $("#sku").val() +"&vendor=" + $("#vendor").val() +
				"&category=" + $("#category").val() +"&mid=" + $("#mid").val() +
                "&description=" + $("#description").val() + "&features=" + $("#features").val() +
                "&cost=" + $("#cost").val() + "&retail=" + $("#retail").val() +
                "&image=" + img_name;
                $.post("http://jadran.sdsu.edu/perl/jadrn040/insert.cgi", param, add_data_handler);
                errorMsg.text("Record added successfully !");
                },
                error: function(response) {
                    errorMsg.html("An upload error occurred! Please try again.");
                    $("#image").addClass("error");
                    $("#image").focus();
                }
            });
            e.preventDefault();
        }
    });
}

// Validate TAB-2 :Edit Record	
function validate_tab2(){
	 var errorMsg2 = $('#error_message2');	 	
	 $("#sku2").on('blur', function() {
        if ($("#sku2").val() != "" && validate_sku($("#sku2").val()) == true) {
            $(this).removeClass("error");
            errorMsg2.text("");			
			removeclass();		
			return;
        }
		else {			
		addclass();
		$("#skub").removeClass("hidecls");
		}
    });
    $("#mid2").on('blur', function() {
        if ($("#mid2").val() != "") {
            $(this).removeClass("error");
            errorMsg2.text("");
        }
    });
    $("#description2").on('blur', function() {
        if ($("#description2").val() != "") {
            $(this).removeClass("error");
            errorMsg2.text("");
        }
    });
    $("#features2").on('blur', function() {
        if ($("#features2").val() != "") {
            $(this).removeClass("error");
            errorMsg2.text("");
        }
    });
    $("#cost2").on('blur', function() {
        if ($("#cost2").val() != "") {
            $(this).removeClass("error");
            errorMsg2.text("");
        }
    });
    $("#retail2").on('blur', function() {
        if ($("#retail2").val() != "") {
            $(this).removeClass("error");
            errorMsg2.text("");
        }
    });
    $("#image2").on('blur', function() {
        if ($("#image2").val() != "") {
            $(this).removeClass("error");
            errorMsg2.text("");
        }
    });
    $('#tabs-2').on('click', '#reset2', function() {
        errorMsg2.text("");
        $("#upload_img2").text("");
        $("#sku2").focus();
    });
    $('#tabs-2').on('click', '#editbtn', function(e) {
        e.preventDefault();
        if ($("#sku2").val() == "") {
            $("#sku2").addClass("error");
            errorMsg2.text("Please enter SKU!");
            $("#sku2").focus();

        } else if (validate_sku($("#sku2").val()) == false) {
            $("#sku2").addClass("error");
            errorMsg2.text("Invalid SKU! It should be of the form CAT-123");
            $("#sku2").focus();

        } else if ($("#vendor2").children(":selected").val() === "-1") {
            $("#vendor2").addClass("error");
            errorMsg2.text("Please select Vendor!");
            $("#vendor2").focus();

        } else if ($("#mid2").val() == "") {
            $("#mid2").addClass("error");
            errorMsg2.text("Please enter Manufacturer ID!");
            $("#mid2").focus();

        } else if ($("#category2").children(":selected").val() === "-1") {
            $("#category2").addClass("error");
            errorMsg2.text("Please select Category!");
            $("#category2").focus();

        } else if ($("#description2").val() == "") {
            $("#description2").addClass("error");
            errorMsg2.text("Please enter Description!");
            $("#description2").focus();

        } else if ($("#features2").val() == "") {
            $("#features2").addClass("error");
            errorMsg2.text("Please enter Features!");
            $("#features2").focus();

        } else if ($("#cost2").val() == "") {
            $("#cost2").addClass("error");
            errorMsg2.text("Please enter Cost(numeric)!");
            $("#cost2").focus();

        } else if ($("#retail2").val() == "") {
            $("#retail2").addClass("error");
            errorMsg2.text("Please enter Retail Price(numeric)!");
            $("#retail2").focus();

        }  else { //no image edit      
            errorMsg2.text("Please wait while processing....");
            var img_name;
			//without edit image
            if ($("#image2").val() == "") {
                img_name = $("#sku2").val();
                param = "sku=" + $("#sku2").val() + "&vendor=" + $("#vendor2").val() +
                "&category=" + $("#category2").val() + "&mid=" + $("#mid2").val() +
                "&description=" + $("#description2").val() + "&features=" + $("#features2").val() +
                "&cost=" + $("#cost2").val() + "&retail=" + $("#retail2").val() +
                "&image=" + img_name;              
				// addclass();
				// alert("VALIDATION IF");
				// $("#skub").removeClass("hidecls");
				$.post("http://jadran.sdsu.edu/perl/jadrn040/update.cgi", param, edit_data_handler);
                errorMsg2.text("Record edited successfully !");
				

            } else { //with image edit
                img_name = $("#sku2").val();// Rename uploaded image with unique SKU 
                var form_data = new FormData($('[name="form-2"]')[0]);
                form_data.append("image", document.getElementById("image2").files[0]);
                form_data.append("image_name", img_name);
				// AJAX image upload
                $.ajax({
                    url: "http://jadran.sdsu.edu/perl/jadrn040/ajax_upload.cgi",
                    type: "post",
                    data: form_data,
					contentType: false,
                    processData: false,                 
                    success: function(response) {
                    param = "sku=" + $("#sku2").val() + "&vendor=" + $("#vendor2").val() +
                    "&category=" + $("#category2").val() + "&mid=" + $("#mid2").val() +
                    "&description=" + $("#description2").val() + "&features=" + $("#features2").val() +
                    "&cost=" + $("#cost2").val() + "&retail=" + $("#retail2").val() +
                    "&image=" + img_name;                                               
						// alert("VALID ELSE");
						// addclass();
						// $("#skub").removeClass("hidecls");
						$.post("http://jadran.sdsu.edu/perl/jadrn040/update.cgi", param, edit_data_handler);
                        errorMsg2.text("Record edited successfully !");
												
                    },
                    error: function(response) {
                        errorMsg2.html("An upload error occurred! Please try again.");
                        $("#image2").addClass("error");
                        $("#image2").focus();
                    }
                });
                e.preventDefault();
            }
        }
    }); 
    $('#tabs-2').on('blur', '#sku2', function(e) {
        if ($("#sku2").val() != "" && validate_sku($("#sku2").val()) == true) {
            e.preventDefault();
            $(this).removeClass("error");
            errorMsg2.text("");
            param = "sku=" + $("#sku2").val();			
            $.get("http://jadran.sdsu.edu/perl/jadrn040/echo.cgi", param, modified_data);	
        }
    });
}

// Validate TAB-3 :Delete Record	
function validate_tab3(){
	var errorMsg3 = $('#error_message3');
 	
    $("#sku3").on('blur', function() {
        if ($("#sku3").val() != "" && validate_sku($("#sku3").val()) == true) {
            param = "sku=" + $("#sku3").val();
            $.post("http://jadran.sdsu.edu/perl/jadrn040/duplicate.cgi", param, duplicate_del_handler);
        }
    });
    $('#tabs-3').on('click', '#resetbtn3', function() {
        errorMsg3.text("");
        $("#upload_img3").text("");
        $("#vendor3").val("");
        $("#category3").val("");
        $("#sku3").focus();
    });
    $('#tabs-3').on('blur', '#sku3', function(e) {
        if ($("#sku3").val() != "" && validate_sku($("#sku3").val()) == true) {
            e.preventDefault();
            $(this).removeClass("error");
            errorMsg3.text("");
            param = "sku=" + $("#sku3").val();
            $.get("http://jadran.sdsu.edu/perl/jadrn040/echo.cgi", param, handle_del_data);
        }
    });
    $('#tabs-3').on('click', '#deletebtn', function(e) {
        e.preventDefault();
        if ($("#sku3").val() == "") {
            $("#sku3").addClass("error");
            errorMsg3.text("Please enter SKU!");
            $("#sku3").focus();

        } else if (validate_sku($("#sku3").val()) == false) {
            $("#sku3").addClass("error");
            errorMsg3.text("Invalid SKU! It should be of the form CAT-123");
            $("#sku3").focus();

        } else {
            param = "sku=" + $("#sku3").val();
            $.post("http://jadran.sdsu.edu/perl/jadrn040/remove.cgi", param, remove_data);
        }
    });
}

// Dynamically populate vendors
function fix_vendor(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('.vendor').append(toWrite);
}

// Dynamically populate categories
function fix_category(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('.category').append(toWrite);

}

function clear_del_Data(){
		$("#category3").val("");
        $("#vendor3").val("");
        $("#mid3").val("");
        $("#description3").val("");
        $("#features3").val("");
        $("#cost3").val("");
        $("#retail3").val("");
        $("#image3").val("");
        $('#upload_img3').html("");
}
function clear_add_data(){
		$('#sku').val("");
        $("#category").val("0");
        $("#vendor").val("0");
        $("#mid").val("");
        $("#description").val("");
        $("#features").val("");
        $("#cost").val("");
        $("#retail").val("");
        $("#image").val("");
        $('#upload_img1').html("");
        $('#sku').focus();
}
function clear_edit_data(){
		$('#sku2').val("");
        $("#category2").val("0");
        $("#vendor2").val("0");
        $("#mid2").val("");
        $("#description2").val("");
        $("#features2").val("");
        $("#cost2").val("");
        $("#retail2").val("");
        $("#image2").val("");
        $('#upload_img2').html("");
}

//Duplicate handler for adding new record
function check_duplicate(response) {
    var ans = $.trim(response);
    if (ans === 'SUCCESS')
		
         $('#error_message1').text("");
    else {
         $('#error_message1').text("Duplicate SKU! Please enter new SKU.");
        $("#sku").focus();
    }
}

//Checking records for deletion 
function duplicate_del_handler(response) {
    var ans = $.trim(response);
    if (ans === 'SUCCESS') {
        $('#error_message3').text("Record does not exist! Please enter valid SKU.");
        $("#sku3").focus();	
		clear_del_Data();			
    } else
        $('#error_message3').text("");
}

function add_data_handler(response) {
    var ans = $.trim(response);
    if (ans === 'SUCCESS') {
        var msg = $("#sku").val() + " added successfully!";
        $('#error_message1').text(msg);
		clear_add_data();
    } else
        $('#error_message1').text("Duplicate SKU! Please enter new SKU.");
}

function edit_data_handler(response) {
    var ans = $.trim(response);
    if (ans === 'SUCCESS') {
        var result = $("#sku2").val() + " edited successfully!";
        $('#error_message2').text(result);
		clear_edit_data();       
        $('#sku2').focus();
		addclass();
		$("#skub").removeClass("hidecls");
    } else {
		alert("");
        $('#error_message2').text("Record does not exist! Please enter valid SKU.");
		addclass();
		$("#skub").removeClass("hidecls");
		  $("#sku2").focus();
	}
}

//For hiding classes in edit 
function addclass(){
	$("#description2").addClass("hidecls");
	$("#vendor2").addClass("hidecls");
	$("#mid2").addClass("hidecls");
	$("#features2").addClass("hidecls");
	$("#category2").addClass("hidecls");
	$("#cost2").addClass("hidecls");
	$("#retail2").addClass("hidecls");
	$("#image2").addClass("hidecls");
	$("#upload1").addClass("hidecls");
	$("b").addClass("hidecls");
		
}
function removeclass(){
	$("#description2").removeClass("hidecls");
	$("#vendor2").removeClass("hidecls");	 
	$("#mid2").removeClass("hidecls");
	$("#features2").removeClass("hidecls");
	$("#category2").removeClass("hidecls");
	$("#cost2").removeClass("hidecls");
	$("#retail2").removeClass("hidecls");
	$("#image2").removeClass("hidecls");
	$("#upload1").removeClass("hidecls");
	$("b").removeClass("hidecls");
			
}
function modified_data(response) {
    var result = $.trim(response);
    if (result !== ']') { //Parse response received from echo.cgi
		fill_data(response);
        upload_file2($("#sku2").val());
		removeclass();
    } else {
        $('#error_message2').text("Record does not exist! Please enter valid SKU.");
		addclass();
		$("#skub").removeClass("hidecls");
		  $("#sku2").focus();
	}
}

function fill_data(response){
	var res_obj = eval("(" + response + ")");
        $("#category2").val(res_obj[0][1]);
        $("#vendor2").val(res_obj[0][2]);
        $("#mid2").val(res_obj[0][3]);
        $("#description2").val(res_obj[0][4]);
        $("#features2").val(res_obj[0][5]);
        $("#cost2").val(res_obj[0][6]);
        $("#retail2").val(res_obj[0][7]);
        $("#edit_image").val(res_obj[0][8]);
}

function remove_data(response) {
    var ans = $.trim(response);
    if (ans === 'SUCCESS') {
        var result = $("#sku3").val() + " deleted successfully!";
        $('#error_message3').text(result);
        $('#sku3').val("");
        $("#category3").val("");
        $("#vendor3").val("");
        $("#mid3").val("");
        $("#description3").val("");
        $("#features3").val("");
        $("#cost3").val("");
        $("#retail3").val("");
        $("#image3").val("");
        $('#upload_img3').html("");
        $('#sku3').focus();
    } else
        $('#error_message3').text("Record does not exist! Please enter valid SKU.");
}

function handle_del_data(response) {
    var result_data = eval("(" + response + ")");
    $("#category3").val(result_data[0][1]);
    $("#vendor3").val(result_data[0][2]);
    $("#mid3").val(result_data[0][3]);
    $("#description3").val(result_data[0][4]);
    $("#features3").val(result_data[0][5]);
    $("#cost3").val(result_data[0][6]);
    $("#retail3").val(result_data[0][7]);
    $("#image3").val(result_data[0][8]);
    upload_file3($("#sku3").val());
}

//Echo image for edit
function upload_file2(img) {
	//var d = new Date();
    var toDisplay = "<img id=\"upload1\" class=\"hidecls\" src='/~jadrn040/proj1/images/" + img + "?" + new Date().getTime() +"' />";	
    $('#upload_img2').html(toDisplay);
}

//Echo image for delete
function upload_file3(img) {
	//var d = new Date();
    var toDisplay = "<img id=\"upload2\" src='/~jadrn040/proj1/images/" + img + "?" + new Date().getTime() +"' />";
    $('#upload_img3').html(toDisplay);
}

/*function validate_money(amount){
	return (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(amount));
} */
function validate_sku(var_sku){
	return (new RegExp('^([A-Z]{3}[-]{1}[0-9]{3})$').test(var_sku));
}


