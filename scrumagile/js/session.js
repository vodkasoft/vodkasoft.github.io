function initialize(){
	Parse.initialize("9ZtQ9ZoT0cGI9TQI1oLvrVPO1ZXR7kmvKXFNM41i", "QJX0GQDUsPqrtsuMgRW5381aj2rk03ueszYmmSbK");
}

function getPerson(pID){
	var Person = Parse.Object.extend("Person");
	var query = new Parse.Query(Person);
	query.get(pID, {
	  success: function(result) {
	    return result;
	  },
	  error: function(result, error) {
	  	alert("ERROR CODE: "+error.code+": "+getError(error.code));
	    return null;				
	  }
	});
}
	
function getChecked(pMother){
	var _TD = document.getElementById(pMother);
	var _Inputs = _TD.getElementsByTagName("input");
	var _IDs = [];
	for(var i = 0; i < _Inputs.length; i++){
		if(_Inputs[i].checked){
			_IDs.push(_Inputs[i].value);
		}
	}
	return _IDs;
}

function insertPerson(pUsername, pName, pLastname, pPassword, pRole){
	var Person = Parse.Object.extend("Person");
	var person = new Person();
	person.set("name", pName);
	person.set("username", pUsername);
	person.set("lastName", pLastname);
	person.set("password",pPassword);
	person.set("role",pRole);
	person.save(null, {
	  success: function(person) {
	    // Execute any logic that should take place after the object is saved.
	    document.location.href = "sysadmin.html";
	  },
	  error: function(error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and description.
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});	
}