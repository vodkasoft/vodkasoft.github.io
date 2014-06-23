function LogIn(){
	var _Username = document.getElementById("UsernameInput").value;
	var _Password = document.getElementById("PasswordInput").value;
	if(_Username == "" || _Password == ""){
		alert("Falta información");
	}else{

		var Person = Parse.Object.extend("Person");
		var query = new Parse.Query(Person);
		query.equalTo("username", _Username);
		query.find({
		  success: function(results) {
		    var _object = results[0];
		    if(_object.get("password")==_Password){
		    	localStorage.setItem("Name",_object.get("name"));
		    	localStorage.setItem("LastName",_object.get("lastName"));
		    	localStorage.setItem("CurrentID",_object.id);
		    	if(_object.get("sysadmin")){
		    		document.location.href = "sysadmin.html";
		    	}else{
		    		localStorage.setItem("CurrentUserID",_object.id);
		    		localStorage.setItem("Name",_object.get("name"));
		    		localStorage.setItem("LastName",_object.get("lastName"));
		    		document.location.href = "user.html";
		    	}
		    }else{
		    	alert("Incorrect password or username");
		    }
		  },
		  error: function(error) {
		    alert("ERROR CODE: "+error.code+": "+getError(error.code));
		  }
		});
	}
}