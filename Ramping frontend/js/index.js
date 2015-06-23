$(document).ready(function(){	
	$('#login').click(function() {
		var username = $('#username').val();
		var password = $('#password').val();
		//alert(username + password)
		localStorage.setItem("username", username);
		localStorage.setItem("password", password);

		$.ajax( {
			url: 'http://localhost:3001/user?username='+username+'&password='+password,
			method: "GET",
			//data: {"username": username, "password": password},
			success: function(data) {
				//alert(data);
				if(data == "success") {
					document.location.href='file:///Users/ptumkurseetharamu/Desktop/Feature Ramping/Ramping frontend/ramping.html';
				}
			}
		})
	})
});