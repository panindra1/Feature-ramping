$(document).ready(function(){
	var loggedUser = ""	
	var featureKeys = ["Logging", "Authentication", "Instrumentation", "Notifications", "Email_marketting", "GoSocial"]
	var username = localStorage.getItem("username");
	var password = localStorage.getItem("password");

	if(username == null)  {
		username = "admin";
		password = "admin";
	}
		
	//username = "admin";
	//password = "admin";

	var customerNo = ""
	if(username != "admin") {
		$('#adduser').hide();
	}

	$.ajax( {
			url: 'http://localhost:3001/user/getSettings',
			method: "GET",
			dataType: "json",
			//data: {"username": username, "password": password},
			success: function(data) {	

				var features = data[0].features
				var keys = Object.keys(features);
				
				for(var i = 0; i < keys.length; i++) {
					var checked = false
					var isTrueSet = (features[keys[i]] === true);

					var elm = '	<div class="switch"><input id="default-cmn-toggle-'+i+'" name="default_settings" class="cmn-toggle cmn-toggle-round" type="checkbox" value="'+keys[i]+'" ><label for="default-cmn-toggle-'+i+'"></label> </div>'

					if(isTrueSet == true) {
						elm = '	<div class="switch"><input id="default-cmn-toggle-'+i+'" name="default_settings" class="cmn-toggle cmn-toggle-round" type="checkbox" checked value="'+keys[i]+'"><label for="default-cmn-toggle-'+i+'"></label> </div>'
					}
					
					$('#settingsList').append('<tr align = "center"> <td >' + keys[i]+' </td> <td > '+ elm+'</td> </tr>')					
					
					if(username != "admin") {
						$(".cmn-toggle").attr('disabled', true);
					}
				}
			}
	});
		

	$('#welcomeTitle').text("Welcome " + username);
	

	$.ajax( {
			url: 'http://localhost:3001/user/getUser?username='+username+'&password='+password,
			method: "GET",
			dataType: "json",
			//data: {"username": username, "password": password},
			success: function(data) {

				customerNo = data[0].customerNo;
				$.ajax( {
					url: 'http://localhost:3001/user/getUserSettings?customerNo='+customerNo,
					method: "GET",
					dataType: "json",
					//data: {"username": username, "password": password},
					success: function(data) {								 
						//alert(JSON.stringify(data));
						var features = data[0].features

						var keys = Object.keys(features);
				
						for(var i = 0; i < keys.length; i++) {
							var checked = false
							var isTrueSet = (features[featureKeys[i]] === true);

							var elm = '	<div class="switch"><input name="userSettings" id="cmn-toggle-'+i+'" class="cmn-toggle cmn-toggle-round" type="checkbox" value="'+keys[i]+'"><label for="cmn-toggle-'+i+'"></label> </div>'

							if(isTrueSet == true) {
								elm = '	<div class="switch"><input name="userSettings" id="cmn-toggle-'+i+'" class="cmn-toggle cmn-toggle-round" type="checkbox" checked value="'+keys[i]+'"><label for="cmn-toggle-'+i+'"></label> </div>'
							}
						
							if(keys[i])
								$('#usersList').append('<tr align = "center"> <td > '+ elm+'</td> </tr>')					
						}
						
					}
				});
			}
	});
	
	 $(document).on("change", "input[name='userSettings']", function () {
	    //alert(this.id);
	    if (this.checked) {
	    	if($('#default-'+this.id).is(':checked') == false) {
	    		alert("Sorry this feature not supported yet!")
	    		 $(this).prop('checked', false);
	    	}
	    }	    	    
	});

	$('#saveSettings').click(function() {
		if(username == "admin") {
			var defaultSettinValues = {};
			$('input[name="default_settings"]').each(function() {
			 	if($(this).is(':checked')) {
			    	defaultSettinValues[$(this).val()] = true;
				}
				else {
					defaultSettinValues[$(this).val()] = false;
				}
			});

			$.ajax({
				url: 'http://localhost:3001/user/saveDefaultSettings',
				method: "GET",
				dataType: "json",
				data: {"features": defaultSettinValues},
				success: function(data) {			
					alert("Default settings saved!")
				}
			});
		}

		 var checkboxValues = {};
		 $('input[name="userSettings"]').each(function() {
		 	if($(this).is(':checked')) {
		    	checkboxValues[$(this).val()] = true;
			}
			else {
				checkboxValues[$(this).val()] = false;
			}
		});

		$.ajax({
			url: 'http://localhost:3001/user/saveSettings',
			method: "GET",
			dataType: "json",
			data: {"customerNo": customerNo, "features": checkboxValues},
			success: function(data) {			

			}
		});
	});

	$('#logout').click(function() {
		document.location.href='file:///Users/ptumkurseetharamu/Desktop/Feature Ramping/Ramping frontend/index.html';
	});


	$('#UserDetailsDiv').hide();		

	$('#adduser').click(function() {		
		$( "#addUserDialog" ).dialog({
		  autoOpen:false,
		  title: "Add User",
		  dialogClass: "no-close",
		  buttons: [
		  {
		      text: "Add User",
		    	click: function() {
		    		var username = $('#username').val();
					var password = $('#password').val();
					var custNo = $('#customerNo').val();

		    		$.ajax( {
						url: 'http://localhost:3001/user/addUser?username='+username+'&password='+password+'&customerNo='+custNo,
						method: "GET",
						//data: {"username": username, "password": password},
						success: function(data) {
							alert(data);	
							$('#username').val("");	
							$('#password').val("");
							$('#customerNo').val("");
						}
					})
		      }
		    },
		    {
		      text: "Close",
		      click: function() {
		        $( this ).dialog( "close" );
		      }
		    }		    
		  ]
		});
		  $('#UserDetailsDiv').show();		  
		  var div = $('#UserDetailsDiv');

		  $( "#addUserDialog" ).html(div);
		  $( "#addUserDialog" ).dialog('open');
	});

});