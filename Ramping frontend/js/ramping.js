var featureKeys = ["Logging", "Authentication", "Instrumentation", "Notifications", "Email_marketting", "GoSocial"]
	
var customerNo = ""

$(document).ready(function(){	
	getUserSettings();	
	
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
				alert("Your settings saved!")
			}
		});
	});

	$('#logout').click(function() {
		document.location.href='file:///Users/ptumkurseetharamu/Desktop/Demo-claudio-Thursday/Ramping%20frontend/index.html';
	});

	$('#investorApp').on('click', function() {
		getSettingsForAppAndVersion("InvestorApp", "v1")
	});

	$('#domainFinder').on('click', function() {
		getSettingsForAppAndVersion("DomainFinder", "v1")
	});

	$('#v1').on('click', function() {
		getSettingsForAppAndVersion("InvestorApp", "v1")
	});

	$('#v15').on('click', function() {
		getSettingsForAppAndVersion("InvestorApp", "v1.5")
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

function getSettingsForAppAndVersion(appId, versionNumber) {	
	var appKeys = ["Logging", "Authentication", "Instrumentation", "Notifications", "Email_marketting", "GoSocial", "Extra Diagnostics"]
	$.ajax( {
			url: 'http://localhost:3001/user/getAppSettings?appId='+appId+'&versionNumber='+versionNumber,
			method: "GET",
			dataType: "json",
			//data: {"username": username, "password": password},
			success: function(data) {					
				$('#settingsList').html("")
				$('#settingsList').append('<tr><th> Features </th> <th> Default Settings</th> </tr>')					

				var features = data[0].features
				var keys = Object.keys(features);
				
				for(var i = 0; i < keys.length; i++) {					
					var checked = false
					var isTrueSet = (features[appKeys[i]] === true);

					var elm = '	<div class="switch"><input id="default-cmn-toggle-'+i+'" name="default_settings" class="cmn-toggle cmn-toggle-round" type="checkbox" value="'+appKeys[i]+'" ><label for="default-cmn-toggle-'+i+'"></label> </div>'

					if(isTrueSet == true) {
						elm = '	<div class="switch"><input id="default-cmn-toggle-'+i+'" name="default_settings" class="cmn-toggle cmn-toggle-round" type="checkbox" checked value="'+appKeys[i]+'"><label for="default-cmn-toggle-'+i+'"></label> </div>'
					}
					
					$('#settingsList').append('<tr align = "center"> <td >' + appKeys[i]+' </td> <td > '+ elm+'</td> </tr>')					
					
					if(username != "admin") {
						$(".cmn-toggle").attr('disabled', true);
					}						
				}
			}
	});

	
}

function getUserSettings() {
	var username = localStorage.getItem("username");
	var password = localStorage.getItem("password");

	$('#welcomeTitle').text("Welcome " + username);
	
	if(username != "admin") {
		$('#adduser').hide();
	}

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
						
						var features = data[0].features
						getDefaultSettingsForThisUser(features);

						var keys = Object.keys(features);
						
						for(var i = 0; i < featureKeys.length; i++) {							
							var checked = false
							if(features[featureKeys[i]] != null) {
							
								var isTrueSet = (features[featureKeys[i]] === true);

								var elm = '	<div class="switch"><input name="userSettings" id="cmn-toggle-'+i+'" class="cmn-toggle cmn-toggle-round" type="checkbox" value="'+featureKeys[i]+'"><label for="cmn-toggle-'+i+'"></label> </div>'

								if(isTrueSet == true) {
									elm = '	<div class="switch"><input name="userSettings" id="cmn-toggle-'+i+'" class="cmn-toggle cmn-toggle-round" type="checkbox" checked value="'+featureKeys[i]+'"><label for="cmn-toggle-'+i+'"></label> </div>'
								}
							
								if(featureKeys[i])
									$('#usersList').append('<tr align = "center"> <td > '+ elm+'</td> </tr>')	
							}											
						}
						
					}
				});
			}
	});
	
	
}

function getDefaultSettingsForThisUser(userFeatures) {		
		var username = localStorage.getItem("username");
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
					var isTrueSet = (features[featureKeys[i]] === true);
					//alert(features[featureKeys[i]]);
					if(userFeatures[featureKeys[i]] != undefined) {
						var elm = '	<div class="switch"><input id="default-cmn-toggle-'+i+'" name="default_settings" class="default_class cmn-toggle cmn-toggle-round" type="checkbox" value="'+featureKeys[i]+'" ><label for="default-cmn-toggle-'+i+'"></label> </div>'

						if(isTrueSet == true) {
							elm = '	<div class="switch"><input id="default-cmn-toggle-'+i+'" name="default_settings" class="default_class cmn-toggle cmn-toggle-round" type="checkbox" checked value="'+featureKeys[i]+'"><label for="default-cmn-toggle-'+i+'"></label> </div>'
						}
						
						$('#settingsList').append('<tr align = "center"> <td >' + featureKeys[i]+' </td> <td > '+ elm+'</td> </tr>')					
						
						if(username != "admin") {
							$(".default_class").attr('disabled', true);
						}						
					}
				}
			}
		});
	}	
