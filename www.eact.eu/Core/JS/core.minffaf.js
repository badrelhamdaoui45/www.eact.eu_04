
// FX Add : BEGIN 

$(document).off("click","#FXCode_Submit").on("click", "#FXCode_Submit", function() {
"use strict";

	
	var myForm =document.getElementById('fxcode_form');
    var formData = new FormData(myForm);	

		
	$.ajax({
		url  : '/Core/Includes/FXCode/add_function.php',
		type: 'POST',
		data: formData,
		async: false,
		dataType: 'json',
		beforeSend: function() {$('.input-error').removeClass('input-error');} ,	
		success: function (data) {
			
			
			if(data.status == '400'){	
				
				$('#'+data.errorelement).addClass('input-error');	
				$('.error').text(data.errorcode);
				
				grecaptcha.reset();
				
			} else if(data.status == '200') {
				
				
				$('#stage_one').fadeOut(' ',function(){
					$('#stage_two').fadeIn().delay( 1500 ).fadeOut(' ',function(){
						$('#stage_three').fadeIn();
					});
			});					
				
			} 

		},

		cache: false,
		contentType: false,
		processData: false
	});

	return false;	

});

$(document).off("click","#FXCode_Update").on("click", "#FXCode_Update", function() {
"use strict";
	
	var myForm =document.getElementById('page_form');
    var formData = new FormData(myForm);	

		
	$.ajax({
		url  : '/Core/Admin/FXCode/FXCode-Edit-function.php',
		type: 'POST',
		data: formData,
		async: false,
		beforeSend: function() {$('.input-error').removeClass('input-error');} ,	
		success: function (data) {
			
						
		var r = JSON.parse(data);	
		
			if(r.status == '400'){	
				$('#'+r.errorelement).addClass('input-error');	
				$('.error').text(r.errorcode);
				
				alert(r.errorcode);
				
			} else if(r.status == '200') {
				
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$('#eact_Modal').load("/Core/Admin/index.php  #eact_Modal_after", function(){
					$('#eact_Modal').modal('show');	
					$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
					});	
				});	
				
			} 

		},

		cache: false,
		contentType: false,
		processData: false
	});

	return false;	

});


function uploadFile(elm){	
	
   var id = $(elm).attr('id');
   var fn = $(elm).val();
   var filename = fn.match(/[^\\/]*$/)[0]; // remove C:\fakename

   $('#' + id + '_success').html('<strong>Succesfully attached:</strong> ' + filename );	
	
} 


// FX AD : END 


// JavaScript Document

// Login system August 17 
	
$("#login-form").validate({
	rules: {
		"login-username": {
			required: true,
		},
		"login-password": {
			required: true,
		},
	},
	messages: {
		"login-password":{
		  required: "Please enter your password"
		 },
		"login-username": "Please enter your username",
	},

	submitHandler: submitForm	
});	

/* Handling login functionality */
function submitForm() {	
	
var data = $("#login-form").serialize();	
	
		$.ajax({				
		   type : 'POST',
		   url  : '/Core/Includes/login-check.php',
		   data : data,
		   dataType: 'text',
			beforeSend: function() {$('#errorMessage').empty();} ,	
			
		   success :  function(response) {
			   
		   var r = JSON.parse(response); 			
			
			if(r.status === 200){	

 				window.location.href = "/admin/";
				
				
			} else if(r.status === 400 ) {
										
				$( '#errorMessage' ).text(r.errorcode); 
				
			} 				
	
		}   

		});
}



//Place this plugin snippet into another file in your applicationb
(function ($) {
    $.toggleShowPassword = function (options) {
        var settings = $.extend({
            field: "#password",
            control: "#toggle_show_password",
        }, options);

        var control = $(settings.control);
        var field = $(settings.field)

        control.bind('click', function () {
            if (control.is(':checked')) {
                field.attr('type', 'text');
            } else {
                field.attr('type', 'password');
            }
        })
    };
}(jQuery));


//Here how to call above plugin from everywhere in your application document body
$.toggleShowPassword({
    field: '#login-password',
    control: '#login-sp'
});



// Search Update : BEGIN 
$(document).off("click","#search_popup").on("click", '#search_popup', function() {
"use strict";
    
   $('#M_Search').modal('show');
	
});
// Search Update : END 



// Emails : BEGIN
$(document).off("click","#showmore").on("click", '#showmore', function() {
"use strict";

	
    var toggle = $(this).data('show');
    
    $('#'+toggle).fadeToggle();

	
});

$(document).off("click","#new_email_button").on("click", '#new_email_button', function() {
"use strict";

	$("#fakeloader").fakeLoader().show();	
	var link  = $(this).data("href");	
	$('#eact_Modal').load("/Core/Admin/popups.php?type="+link + "  #add_email_pre", function(){
		$('#eact_Modal').modal('show');
		$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
	});

	
});

$(document).off("click","#add_email_form_button").on("click", '#add_email_form_button', function() {
"use strict";
	
	
	
	var myForm = document.getElementById('add_email_form');
    var formData = new FormData(myForm);
		
    $.ajax({
        url: '/Core/Admin/Summit/Emails/Emails-Add-Function.php',
        type: 'POST',
        data: formData,
		beforeSend: function() {$("#fakeloader").fakeLoader().show();} ,	
        success: function (data) {
			

			if (jQuery.trim(data) === "D1") { 	
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);
				alert(data);
			} else {				
				var link = jQuery.trim(data);
				$('#admin_pre').load(link, function(){
				$('#eact_Modal').load("/Core/Admin/index.php  #eact_Modal_after");	
				$('#eact_Modal').modal('show');	
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				});	
			}
			
		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;

});



$(document).off("click","#update_email_draft_button").on("click", '#update_email_draft_button', function() {
"use strict";
	
	var myForm = document.getElementById('update_email_draft_form');
    var formData = new FormData(myForm);
		
    $.ajax({
        url: '/Core/Admin/Summit/Emails/Emails-Edit-Function.php',
        type: 'POST',
        data: formData,
		beforeSend: function() {$("#fakeloader").fakeLoader().show();} ,	
        success: function (data) {

			if (jQuery.trim(data) === "OK") { 	
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$('#eact_Modal').load("/Core/Admin/index.php  #eact_Modal_after", function(){
					$('#eact_Modal').modal('show');	
					$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
					});	
				});	
			} else {
			$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
			alert(data);	
			}
			
		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;

});

$(document).off("click","#send_test_email_button").on("click", '#send_test_email_button', function() {
"use strict";
	
	var myForm = document.getElementById('update_email_draft_form');
    var formData = new FormData(myForm);
	formData.append('send_test_email', '1');

    $.ajax({
        url: '/Core/Admin/Summit/Emails/Emails-Edit-Function.php',
        type: 'POST',
        data: formData,
		beforeSend: function() {$("#fakeloader").fakeLoader().show();} ,	
        success: function (data) {

			if (jQuery.trim(data) === "OK") { 	
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$('#eact_Modal').load("/Core/Admin/index.php  #eact_Modal_after", function(){
					$('#eact_Modal').modal('show');	
					$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
					});	
				});	
			} else {
			$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
			alert(data);	
			}
			
		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;

});


$(document).off("click","#publish_email_button").on("click", '#publish_email_button', function() {
"use strict";
	
	var myForm = document.getElementById('update_email_draft_form');
    var formData = new FormData(myForm);

    $.ajax({
        url: '/Core/Admin/Summit/Emails/Emails-Publish-Function.php',
        type: 'POST',
        data: formData,
		beforeSend: function() {$("#fakeloader").fakeLoader().show();} ,	
        success: function (data) {

			if (jQuery.trim(data) === "D1") { 
				
				
				
			$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				
			} else {
				var link = jQuery.trim(data);
				$('#admin_pre').load(link, function(){
					$('#eact_Modal').load("/Core/Admin/index.php  #eact_Modal_after");
					$('#eact_Modal').modal('show');	
					$('#successtext').empty().text("Emails Sent");
					$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				});	
			}
			
		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;

});


// Emails : END 



// Sections : BEGIN 
$(document).off("click","#update_section").on("click", '#update_section', function() {
"use strict";
	
	$("#fakeloader").fakeLoader().show();	
	var link  = $(this).data("href");	
	$('#eact_Modal').load("/Core/Admin/popups.php?section="+link+" #eact_Modal_after", function(){
		$('#hotel_Setting_Locked').datetimepicker();
		$('#eact_Modal').modal('show');
		$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
	});


});

$(document).off("click","#section_edit_form_button").on("click", '#section_edit_form_button', function() {
"use strict";
	
	var myForm = document.getElementById('section_edit_form');
    var formData = new FormData(myForm);
		
    $.ajax({
        url: '/Core/Admin/Summit/Hotel_Prefrences/Summit-Popup-Function.php',
        type: 'POST',
        data: formData,
        async: false,
		beforeSend: function() {$("#fakeloader").fakeLoader().show();} ,	
        success: function (data) {

			if (jQuery.trim(data) === "OK") { 
			$('#eact_Modal').load("/Core/Admin/index.php  #eact_Modal_after", function(){
					$('#eact_Modal').modal('show');	
					$('#successtext').empty().text("Updated");
					$("#fakeloader").fakeLoader().delay(500).fadeOut(400);
			});
			} else {
				
				alert(data);
			}
		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;

});
// Sections : END 





// Settings: BEGIN 

$(document).off("click","#sitesettings_button").on("click", '#sitesettings_button', function() {
"use strict";
var data = $("#sitesettings_form").serialize();	
	$.ajax({				
	type : 'POST',
	url  : '/Core/Admin/Settings/Site-Settings-function.php',
	data : data,
	dataType: 'text',
	beforeSend: function() { $( '#msg' ).empty();} ,	
	success :  function(foo) {	
		$( '#msg' ).empty().text(foo); 	
		$( '#msg' ).append('<i class="fa fa-check green" aria-hidden="true"></i>'); 	
		}
	});	
});

// Settings: END 


// Authorisation: BEGIN 

$(document).off("click","#siteauthorisation_button").on("click", "#siteauthorisation_button", function() {
"use strict";
    var contentPanelId = jQuery(this).attr("name");
	var data = $('#' + contentPanelId + 'SA').serialize();	
	
	$.ajax({				
	type : 'POST',
	url  : '/Core/Admin/Settings/Site-Authorisation-function.php',
	data : data,
	dataType: 'text',
	beforeSend: function() { $( '#msg' ).empty();} ,	
	success :  function(foo) {	
		$( '#msg' ).empty().text(foo); 	
		$( '#msg' ).append('<i class="fa fa-check green" aria-hidden="true"></i>'); 	
		}
	});		
	
});

// Authorisation: END 

// NTA: BEGIN 

$(document).off("click","#addnta_button").on("click", "#addnta_button", function() {
"use strict";
	
	var myForm = document.getElementById('addnta_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/NTA/NTA-Add_New-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
		var link = jQuery.trim(data);
		$("#fakeloader").fakeLoader().show();	
		$('#admin_pre').load(link, function(){
		$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
		});			

		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

// Edit Select 
$(document).off("click","#ta_url_button").on("click", '#ta_url_button', function() {
"use strict";
	$("#fakeloader").fakeLoader().show();	
	var link  = $(this).data("href");	
	$('#admin_pre').load(link, function(){
	$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
	});	
	
	
});


// Edit Function 
$(document).off("click","#editnta_button").on("click", "#editnta_button", function() {
"use strict";
	
	var myForm = document.getElementById('addnta_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/NTA/NTA-Edit-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
			if (jQuery.trim(data) === "OK") { 	
				$("#fakeloader").fakeLoader().show();
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$( "li" ).removeClass( "open" );
					$('#sidebar').off('hover');
					$('#eact_Modal').modal('show');
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				});	
			} else {
			alert(data);	
			}
		},
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});



// NTA: END 


// Pages : BEGIN
// Edit Function 
$(document).off("click","#editpage_button").on("click", "#editpage_button", function() {
"use strict";

	var myForm = document.getElementById('editpage_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/Pages/Pages-Edit-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
			if (jQuery.trim(data) === "OK") { 	
				$("#fakeloader").fakeLoader().show();
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$( "li" ).removeClass( "open" );
					$('#sidebar').off('hover');
					$('#eact_Modal').modal('show');
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				});	
			} else {
			alert(data);	
			}
		},
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

// Pages : END 

// Articles : BEGIN 
$(document).off("click","#addarticle_button").on("click", "#addarticle_button", function() {
"use strict";
	
	var myForm = document.getElementById('addnews_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/Articles/Articles-Add-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
		var link = jQuery.trim(data);
		$("#fakeloader").fakeLoader().show();	
		$('#admin_pre').load(link, function(){
		$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
		});			

		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});


$(document).off("click","#editarticle_button").on("click", "#editarticle_button", function() {
"use strict";

	var myForm = document.getElementById('editarticle_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/Articles/Articles-Edit-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
                        
			if (jQuery.trim(data) === "OK") { 	
				$("#fakeloader").fakeLoader().show();
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$( "li" ).removeClass( "open" );
					$('#sidebar').off('hover');
					$('#eact_Modal').modal('show');
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				});	
			}
		},
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

// Articles : END

// News : BEGIN 
$(document).off("click","#addnews_button").on("click", "#addnews_button", function() {
"use strict";
	
	var myForm = document.getElementById('addnews_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/News/News-Add-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
		var link = jQuery.trim(data);
		$("#fakeloader").fakeLoader().show();	
		$('#admin_pre').load(link, function(){
		$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
		});			

		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});


$(document).off("click","#editnews_button").on("click", "#editnews_button", function() {
"use strict";

	var myForm = document.getElementById('editnews_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/News/News-Edit-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            
            alert(data);
            
            
			if (jQuery.trim(data) === "OK") { 	
				$("#fakeloader").fakeLoader().show();
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$( "li" ).removeClass( "open" );
					$('#sidebar').off('hover');
					$('#eact_Modal').modal('show');
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				});	
			}
		},
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

// News : END


// Events : BEGIN 
$(document).off("click","#addevent_button").on("click", "#addevent_button", function() {
"use strict";
	
	var myForm = document.getElementById('addevent_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/Events/Events-Add-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
			
			
		var link = jQuery.trim(data);
		$("#fakeloader").fakeLoader().show();	
		$('#admin_pre').load(link, function(){
		$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
		});			

		},
		
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});


$(document).off("click","#editevent_button").on("click", "#editevent_button", function() {
"use strict";

	var myForm = document.getElementById('editevent_form');
    var formData = new FormData(myForm);	
	
    $.ajax({
        url: '/Core/Admin/Events/Events-Edit-function.php',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
			if (jQuery.trim(data) === "OK") { 
				$("#fakeloader").fakeLoader().show();
				var link  = $("#refresh_page").data("href");
				$('#admin_pre').load(link, function(){
					$( "li" ).removeClass( "open" );
					$('#sidebar').off('hover');
					$('#eact_Modal').modal('show');
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
				});	
			} else {
			alert(data);	
			}
		},
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

// Events : END


// Carousel : BEGIN 

$(document).off("click","#playButton").on("click", "#playButton", function() {
"use strict";
	
	$('.carousel').carousel('cycle');
	$('#playButton').attr( 'id' , 'pauseButton' );
	$('#glyphicon-pp').removeClass( "glyphicon-play" ).addClass( "glyphicon-pause");
});

$(document).off("click","#pauseButton").on("click", "#pauseButton", function() {
"use strict";
	
	$('.carousel').carousel('pause');
	$('#pauseButton').attr( 'id' , 'playButton' );
	$('#glyphicon-pp').removeClass( "glyphicon-pause" ).addClass( "glyphicon-play");

});		

// Carousel : END

// Invite Codes : BEGIN 

$(document).off("click","#add_invite_code").on("click", "#add_invite_code", function() {
"use strict";
	$('#popup_content').empty().load("/Core/Includes/popups.php #invite_code_popup", function() { 
		$('#eact_Modal').modal('show');	
	});	
});		




$(document).off("click","#code-form_Button").on("click", "#code-form_Button", function() {
"use strict";
	
var data = $("#invite-code").val();
	
    $.ajax({
        url: '/Core/Admin/Summit/Invite-Code/Invite-Code-Add-function.php',
        type: 'POST',
        data: {invite_code: data},
		dataType: 'text',
        success: function (data) {
			
			var data_trim = jQuery.trim(data);
			
			if (data_trim === "E1") { 
			$('#invite-code-msg').text('Missing Invite Code');	
			} else if (data_trim === "E2") { 
			$('#invite-code-msg').text('Error Inserting Seek Assistance');	
			} else if (data_trim === "D1") { 
			$('#invite-code-msg').text('Invite Code already in there');	
			} else {
			$('#invite-code-msg').text('Invite Code ' + data_trim + ' added');					
			}			
			
		},
    });

    return false;	

});



// Invite Codes : END 



// Misc : BEGIN 
$(document).off("click","#continue_modal").on("click", '#continue_modal', function() {
"use strict";	
	$('#eact_Modal').modal('hide');
	
});

// Subscribe : Begin 

function subscribe_validation() {	
"use strict";	
	$("#subscribe_form").validate({
		rules: {
			"email-address": {
				required: true,
				email: true,
			},
		},
		messages: {

		},

		submitHandler: function(){
		grecaptcha.execute();
	
		}	
	});	

	
}

// Linkedin Subscribe More 

/* Handling login functionality */
function subscribeForm() {	
"use strict";
			
var data = $("#subscribe_form").serialize();	
	
	$.ajax({				
		type : 'POST',
		url  : '/Core/Includes/Subscribe/Subscribe_Function.php',
		data : data,
		dataType: 'text',
		success :  function(foo) {
		if (jQuery.trim(foo) === "ERROR") { 
			
		alert('Somthing has gone wrong seek assistance');	
			
		} else {
			
			$('#popup_pre').empty().load("/Core/Includes/popups.php #popup_verify", function() { 
				$('#eact_Modal').modal({
				keyboard: false,	
				show: true,
				backdrop:'static',
				});	
			});	
			
		}
		}   
	});
}


$(document).off("click","#subscribe_more_pre").on("click", "#subscribe_more_pre", function() {
"use strict";
	
	$('#popup_pre').empty().load("/Core/Includes/popups.php #subscribe_more", function() { 
		
	
	});	
	
});		


function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}



$(document).off("click","#subscribe_extra_form_button").on("click", "#subscribe_extra_form_button", function() {
"use strict";

/* Handling login functionality */
var data = $("#subscribe_extra_form").serialize();	
	
	
	$.ajax({				
	   type : 'POST',
	   url  : '/Core/Includes/Subscribe/Subscribe_Function_Basic.php',
	   data : data,
	   dataType: 'text',
	   success :  function(data) {
		   
		if (jQuery.trim(data) === "OK") { 	
			$('#popup_pre').empty().load("/Core/Includes/popups.php #popup_verify_success", function() { 
				$('#emailaddress_verify').text(data);
				$('#eact_Modal').modal({
				backdrop: 'static',
				keyboard: false,
				show: true,
			});	
			});		
		} else{
			alert(data);
			
		}
	   }
	});
});

// Subscribe : END



function textCounter(field,field2,maxlimit){
"use strict";	
	
 var countfield = document.getElementById(field2);
 if ( field.value.length > maxlimit ) {
  field.value = field.value.substring( 0, maxlimit );
  return false;
 } else {
  countfield.value = maxlimit - field.value.length;
	 
 }
}

function summitlive(){
"use strict";	
	
var data = $("#summit_live_form").serialize();	
	
	$.ajax({				
		type : 'POST',
		url  : '/Core/Admin/Summit/Summit-Settings-function.php',
		data : data,
		dataType: 'text',
		success :  function(foo) {
		alert(foo);	
			
		}   
	});
	
}



// Contact Form Including Google Invisible Re-Captcha 
function contact_validation() {	
"use strict";

	$("#contact_form").validate({
		rules: {
			"message_email": {
				required: true,
				email: true,
			},
			"message_body": {
				required: true,
			},
			"message_name": {
				required: true,
			},			
			"message_subject": {
				required: true,
			},			
		},
		messages: {

		},

		submitHandler: function(){
			grecaptcha.execute();
		}	
	});	

	
}


// fakeloader

/* Handling login functionality */
function submit_contact_form() {	
"use strict";
	
var data = $("#contact_form").serialize();	

$.ajax({				
	type : 'POST',
	url  : '/Core/Includes/Contact/Contact_Function.php',
	data : data,
	beforeSend: function() { $('#fakeloader').fakeLoader({left:'0px',}).show();;} ,	
	dataType: 'text',
	success :  function(data) {
			// Trim Data 
			var data_trim = jQuery.trim(data);
			
			if (data_trim === "C1") { 
			// Captcha Error 	
			grecaptcha.reset();	
			$("#msg_contact").text( "Google Captcha Error – Please Try again" );	
				
			} else if (data_trim === "D1") { 
			// Database Error
			grecaptcha.reset();		
			$("#msg_contact").text( "Database Error – Please email us on contact@eact.online" );	
	
				
			} else if (data_trim === "OK") { 
			// Message Sent 	
			$("#contact_form_elements").empty();
			$("#contact_form_success").show();
			$('#fakeloader').delay(500).hide();	
	
			}

	}   
});	
}


// Carousel 

$(document).off("click","#editcarousel_button").on("click", "#editcarousel_button", function() {
"use strict";
		
	
var myForm = document.getElementById('editcarousel_form');
var formData = new FormData(myForm);	

$.ajax({
	url  : '/Core/Admin/Carousel/Carousel-Edit-Function.php',
	type: 'POST',
	data: formData,
	async: false,
	success: function (data) {
		var data_trim = jQuery.trim(data);
		if (data_trim === "F1") { 
		alert('File Name Exists');
		} else if (data_trim === "OK") { 
			$("#fakeloader").fakeLoader().show();
			var link  = $("#refresh_page").data("href");
			$('#admin_pre').load(link, function(){
				$( "li" ).removeClass( "open" );
				$('#sidebar').off('hover');
				$('#eact_Modal').modal('show');
			$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
			});		
		}
		
	},

	cache: false,
	contentType: false,
	processData: false
});

return false;	

});	

$(document).off("click","#addcarousel_button").on("click", "#addcarousel_button", function() {
"use strict";
	
var myForm = document.getElementById('addcarousel_form');
var formData = new FormData(myForm);	

$.ajax({
	url  : '/Core/Admin/Carousel/Carousel-Add-Function.php',
	type: 'POST',
	data: formData,
	async: false,
	success: function (data) {
		var data_trim = jQuery.trim(data);
		if (data_trim === "E1") { 
		alert('Either Image or Title is missing');
		} else {	
			var link = jQuery.trim(data);
			$("#fakeloader").fakeLoader().show();	
			$('#admin_pre').load(link, function(){
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
			});	
		} 
		
	},

	cache: false,
	contentType: false,
	processData: false
});

return false;	

});

$(document).off("click","#edit_summit_button").on("click", "#edit_summit_button", function() {
"use strict";
	
var myForm = document.getElementById('edit_summitform');
var formData = new FormData(myForm);	

$.ajax({
	url  : '/Core/Admin/Summit/Summit-Edit-Function.php',
	type: 'POST',
	data: formData,
	async: false,
	success: function (data) {
		var data_trim = jQuery.trim(data);
		if (data_trim === "OK") {
		
		} else {
		$("#fakeloader").fakeLoader().show();
			var link  = $("#refresh_page").data("href");
			$('#admin_pre').load(link, function(){
				$( "li" ).removeClass( "open" );
				$('#sidebar').off('hover');
				$('#eact_Modal').modal('show');
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
			});			
		}		
	},

	cache: false,
	contentType: false,
	processData: false
});

return false;	

});


$(document).off("click","#reset_password_summit_button").on("click", "#reset_password_summit_button", function() {
"use strict";

event.stopPropagation();
if(confirm("Do you want to reset password?")) {

var myForm = document.getElementById('edit_summitform');
var formData = new FormData(myForm);	

$.ajax({
	url  : '/Core/Admin/Summit/Account/Password-Reset-Function.php',
	type: 'POST',
	data: formData,
	async: false,
	success: function (data) {
	alert(data);	
		
	},

	cache: false,
	contentType: false,
	processData: false
});

return false;	
}      
	
event.preventDefault();	


});

$(document).off("click","#edit_subscription_button").on("click", "#edit_subscription_button", function() {
"use strict";
	
var myForm = document.getElementById('edit_subscription_form');
var formData = new FormData(myForm);	

$.ajax({
	url  : '/Core/Admin/Subscriptions/Subscriptions-Edit-Function.php',
	type: 'POST',
	data: formData,
	async: false,
	success: function (data) {
		var data_trim = jQuery.trim(data);
		if (data_trim === "OK") {
		
		} else {
		$("#fakeloader").fakeLoader().show();
			var link  = $("#refresh_page").data("href");
			$('#admin_pre').load(link, function(){
				$( "li" ).removeClass( "open" );
				$('#sidebar').off('hover');
				$('#eact_Modal').modal('show');
				$("#fakeloader").fakeLoader().delay(500).fadeOut(400);	
			});			
		}		
	},

	cache: false,
	contentType: false,
	processData: false
});

return false;	

});

$(document).off("click","#show_search").on("click", "#show_search", function() {
"use strict";
	
	$('#hide_search').fadeIn();
});


$(document).off("click","#remove-user").on("click", "#remove-user", function() {
"use strict";
	
	var id = $(this).data("id");
	var n = $(this).data("name");
	
	var formData = new FormData();
	formData.append('userId', id);
	
    if (confirm("Confirm you wish to delete '"+n+"'")) {
		
	$.ajax({
		url  : '/Core/Admin/Summit/remove-user-function.php',
		type: 'POST',
		data: formData,
		async: false,
		success: function (data) {
			var data_trim = jQuery.trim(data);
			if (data_trim === "OK") {

				window.location.replace("https://eact.eu/admin/Summit/");
				
			} else {
				
				alert('Failed to delete user');
		
			}		
		},

		cache: false,
		contentType: false,
		processData: false
	});

	return false;	
		
		
	}
	
	
});

function ChangeUrl(page, url) {
	if (typeof (history.pushState) != "undefined") {
		var obj = { Page: page, Url: url };
		history.pushState(obj, obj.Page, obj.Url);
	} 
}

$(document).off("click","#youtube-video-play").on("click", "#youtube-video-play", function() {
"use strict";
	
	var current_id = $(".youtube-top-video > iframe").data('id');
	var id = $(this).data('id');
	var title = $(this).data('title');
	
	var url = '/video/' + id + '/' + title + '.html';
	ChangeUrl(title, url);
	
	
 	$(".youtube-top-video > iframe").attr("src", "https://www.youtube.com/embed/" + id );	
	$("html, body").animate({scrollTop: 0}, 600);

	
	
	
});

$(document).off("click","#fxcode_register").on("click", '#fxcode_register', function() {
"use strict";

	$('#M__Content').empty().load("/Core/Includes/FXCode/pop-ups.php #fxcode_modal", function() { 
		$('#M__EACT').modal({
							  keyboard: false,
							  backdrop: 'static'
			
							});	
	});	
	
});

$(document).off("click","#change-password").on("click", '#change-password', function() {
"use strict";

	
	$('#eact_Modal_after').empty().load("/Core/Admin/Users/pop-ups.php #cp_modal", function() { 
		$('#eact_Modal').modal('show');	
	});	
	
});

$(document).off("click","#cp_Submit").on("click", "#cp_Submit", function() {
"use strict";
	
	var myForm = document.getElementById('cp_form');
    var formData = new FormData(myForm);	
	
	$.ajax({
		url:  '/Core/Admin/Users/Users-Change-Password-function.php',
		type: 'POST',
		data: formData,
		async: false,
		beforeSend: function() {$('.input-error').removeClass('input-error');$('.error').empty();} ,	
		success: function (response) {
			
			
		   var r = JSON.parse(response); 			
			
			if(r.status === 200){	

				$('#stage_one').fadeOut(' ',function(){
					$('#stage_two').fadeIn().delay( 1500 ).fadeOut(' ',function(){
						$('#stage_three').fadeIn();
					});
				});		
				
				
			} else if(r.status === 403 ) {
										
				window.location = "/admin/logout/";
				
			} else {
						
				$('#'+r.errorelement).addClass('input-error');	
				$('.error').text(r.errorcode);
				
			}				
			
			
		},

		cache: false,
		contentType: false,
		processData: false
	});

	return false;	
		
		
	
	
});


function sortSelect (select, attr, order) {
    if(attr === 'text'){
        if(order === 'asc'){
            $(select).html($(select).children('option').sort(function (x, y) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).get(0).selectedIndex = 0;
            //e.preventDefault();
        }// end asc
        if(order === 'desc'){
            $(select).html($(select).children('option').sort(function (y, x) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            $(select).get(0).selectedIndex = 0;
           // e.preventDefault();
        }// end desc
    }

};


// core below

navagationwidth();
$(document).ready(function(){
 navagationwidth();
});

$(document).off("click",".showhide").on("click", '.showhide', function() {
"use strict";
	
	
	var id = $(this).data('id');
	$('#'+id).fadeToggle("slow");

});	
	
	
$(window).resize(navagationwidth);

function navagationwidth () {		
"use strict";
	
	// $('#navmorecolapse').collapseMe();
	
	$("#main_navagation").removeAttr( 'style' );
	//$("#pagebody").removeAttr( 'style' );
	$("#pagebody").css("padding-top", '');

	
	var navagation_links = $("#main_navagation").width(); 	
	var navagation_logo = $("#navagation_header").width(); 	

	var navagation_all = $("#navagation_header").height(); 	
	
	var navagation_container = $("#navagation_container").width(); 	 
	
	var bodywidth = $(document).width();	

	var newwidth = navagation_container - navagation_logo - 30;	
	
	var carousel = (bodywidth - 1366)/2;
			
	if (bodywidth > 600) { 
	$("#main_navagation").css({ float: "left", width: newwidth});
	} 
	
	if(bodywidth  > 768){	
	$("#pagebody").css("padding-top",navagation_all);
	}
	
	if(bodywidth  > 1366){	
	$(".carousel-caption").css("left",carousel);
	$("#carouselButtons").css("right",carousel+10);
		
		
	} else if(bodywidth  < 1366){	
	$(".carousel-caption").css("left","15");
	}
	
	var windowheight = $(window).height(); 

	var mainbody = $("#mainbody").height(); 
	var carousel = $("#carousel").height(); 
	var youtube = $("#youtube-container").height(); 
	
	
	
	var newmainbody = windowheight - carousel - navagation_all - youtube -100; 
	
	if((mainbody + carousel + youtube)  < windowheight){	
		
	$("#mainbody").css("min-height",newmainbody);
	}

	$('#navmorecolapse').collapseMe();

	
};

$(document).ready(function () {		

	$('#M__EACT').on('show.bs.modal', function (e) {	
		$('.selectpicker').selectpicker('render');
		$('#sig_Date').datetimepicker({
		 useCurrent: false,
		 format: 'DD-MM-YYYY',
		});	
		
        grecaptcha.render('v2-g-recaptcha', {
          'sitekey' : '6LeWrV8UAAAAAGWsR4iYvNG21T_adcxWv9WFA90K'
        });
		
		
	});	
	
});

$(document).ready(function () {	
// ------------------------------------------------------- //
// Transition Placeholders
// ------------------------------------------------------ //
$('input.input-material').on('focus', function () {
$(this).siblings('.label-material').addClass('active');
});

$('input.input-material').on('blur', function () {
$(this).siblings('.label-material').removeClass('active');

if ($(this).val() !== '') {
	$(this).siblings('.label-material').addClass('active');
} else {
	$(this).siblings('.label-material').removeClass('active');
}
});

	
});
	
$(document).ready(function () {	
// ------------------------------------------------------- //
// Transition Placeholders
// ------------------------------------------------------ //
$('input.input-email').on('focus', function () {
$(this).siblings('.label-email').addClass('active');
});

$('input.input-email').on('blur', function () {
$(this).siblings('.label-email').removeClass('active');

if ($(this).val() !== '') {
	$(this).siblings('.label-email').addClass('active');
} else {
	$(this).siblings('.label-email').removeClass('active');
}
});

	
});	

    $(document).on('shown.bs.modal','.modal', function () {
		tinymce.init({
		selector: 'textarea.editable',
		min_height: 300,
		setup: function (editor) {
				editor.on('change', function () {
					editor.save();
				});
			},
		theme: 'modern',
		  plugins: [
			'advlist autolink lists link image charmap print preview hr anchor pagebreak',
			'searchreplace wordcount visualblocks visualchars code fullscreen',
			'insertdatetime media nonbreaking save table contextmenu directionality',
			'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
		  ],
		  toolbar1: 'undo redo | insert | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		  toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
		  fontsize_formats: '8pt 10pt 11pt 12pt 14pt 18pt 24pt 36pt',	
		  content_css: [
			'/Core/CSS/core.css'
		  ]	,
		});
	});
	
   $('#eact_Modal').on('hide.bs.modal', function () {
    tinyMCE.editors=[];
    });	
	