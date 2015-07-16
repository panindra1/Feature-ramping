$(document).ready(function(){	
	$('#login').click(function() {
		var username = $('#username').val();
		var password = $('#password').val();

		if(username =="" || password == "") {
			alert("Please Enter Username and Password")
			return
		}
		//alert(username + password)
		localStorage.setItem("username", username);
		localStorage.setItem("password", password);

		$.ajax( {
			url: 'http://localhost:3001/user?username='+username+'&password='+password,
			method: "GET",
			dataType: "json",
			//data: {"username": username, "password": password},
			success: function(data) {
				//alert(JSON.stringify(data));
				if(data["authentication"] != "success") {
					document.location.href='file:///Users/ptumkurseetharamu/Desktop/Demo-claudio-Thursday/Ramping%20frontend/ramping.html';
				}
			}
		})
	})
});