var PROJECTS = [];
var TEAMS = [];
var USERS = [];

function init_createproject(){
	getProjects();
	getTeams();
	getUsers();
}

function getProjects(){
	window.PROJECTS = [];
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.find({
	  success: function(results) {
	  	window.PROJECTS = results;
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}

function getTeams(){
	window.TEAMS = [];
	var Team = Parse.Object.extend("Team");
	var query = new Parse.Query(Team);
	query.find({
	  success: function(results) {
	  	window.TEAMS = results;
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}

function getUsers(){
	window.USERS = [];
	var Person = Parse.Object.extend("Person");
	var query = new Parse.Query(Person);
	query.equalTo("sysadmin",false);
	query.find({
	  success: function(results) {
	  	window.USERS = results;
	  	fillProductOwners(USERS);
	  	fillScrumMasters(USERS);
	  	fillDevelopers(USERS);
	  	fillTesters(USERS);
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}

function fillProductOwners(pPersons){
	for(var i = 0; i < pPersons.length; i++){
		var motherDiv = document.getElementById("productowners");
		var element=document.createElement("option");
		element.setAttribute("value",pPersons[i].id);
		element.innerHTML= pPersons[i].get("name")+" "+pPersons[i].get("lastName");
	    motherDiv.appendChild(element);
	}
}

function fillScrumMasters(pPersons){
	for(var i = 0; i < pPersons.length; i++){
		var motherDiv = document.getElementById("scrummasters");
		var element=document.createElement("option");
		element.setAttribute("value",pPersons[i].id);
		element.innerHTML= pPersons[i].get("name")+" "+pPersons[i].get("lastName");
	    motherDiv.appendChild(element);
	}
}

function fillDevelopers(pPersons){
	for(var i = 0; i < pPersons.length; i++){
		var motherDiv = document.getElementById("developers");
		var element = document.createElement("div");
		var _name = pPersons[i].get("name");
		var _lastName = pPersons[i].get("lastName");
		var _id = pPersons[i].id;
		element.innerHTML = "<input type='checkbox' value='"+_id+"'>"+_name+" "+_lastName+"</input>";
	    motherDiv.appendChild(element);
	}
}

function fillTesters(pPersons){
	for(var i = 0; i < pPersons.length; i++){
		var motherDiv = document.getElementById("testers");
		var element=document.createElement("div");
		var _name = pPersons[i].get("name");
		var _lastName = pPersons[i].get("lastName");
		var _id = pPersons[i].id;
		element.innerHTML = "<input type='checkbox' value='"+_id+"'>"+_name+" "+_lastName+"</input>";
	    motherDiv.appendChild(element);
	}
}

function createProject(){
	var _projectName = document.getElementById("ProjectNameInput").value;
	var _projectDescription = document.getElementById("ProjectDescriptionInput").value;
	var _productOwner = document.getElementById("productowners").value;
	var _scrumMaster = document.getElementById("scrummasters").value;
	var _developers = getChecked(document.getElementById("developers"));
	var _testers = getChecked(document.getElementById("testers"));
	//NECCESSARY TO THE NEXT
	var _IDs = [];
	if(_productOwner != "-"){
		_IDs.push(_productOwner);
	}
	if(_scrumMaster != "-"){
		_IDs.push(_scrumMaster);
	}
	for(var i = 0; i < _developers.length; i++){
		_IDs.push(_developers[i]);
	}
	for(var i = 0; i < _testers.length; i++){
		_IDs.push(_testers[i]);
	}
	if(_productOwner=="-"){
		_productOwner="";
	}
	if(_scrumMaster=="-"){
		_scrumMaster="";
	}
	if(validateEmptyFields(_projectName, _projectDescription) && !projectExists(_projectName) && !idRepeat(_IDs)){
		var Project = Parse.Object.extend("Project");
		var project = new Project();
		project.set("name",_projectName);
		project.set("description",_projectDescription);
		project.set("productOwner",_productOwner);
		project.set("scrumMaster",_scrumMaster);
		project.set("developers",_developers);
		project.set("testers",_testers);
		project.set("userStories",[]);
		project.set("releases",0);
		project.save(null, {
		  success: function(project) {
		    // Execute any logic that should take place after the object is saved.
		    alert("Project "+_projectName+" was created successfully");
		    document.location.href = "sysadmin.html";
		  },
		  error: function(project, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and description.
		    alert("ERROR CODE: "+error.code+": "+getError(error.code));
		  }
		});	
	}
}

function projectExists(pName){
	for(var i = 0; i < PROJECTS.length; i++){
		if(PROJECTS[i].get("name")==pName){
			alert("There's already a project with that name")
			return true;
		}
	}return false;
}

function getChecked(pMother){
	var _checkboxes = pMother.getElementsByTagName("input");
	var _R = [];
	for(var i = 0; i < _checkboxes.length; i++){
		if(_checkboxes[i].checked){
			_R.push(_checkboxes[i].value);
		}
	}return _R;	
}

function validateEmptyFields(pProjectName, pProjectDescription){
	if(pProjectName=="" || pProjectDescription==""){
		alert("Missing information");
		return false;
	}return true;
}

function idRepeat(pIDs){
	for(var i = 0; i < pIDs.length; i++){
		var _currentID = pIDs[i];
		if(howManyTimes(_currentID, pIDs)>1){
			var _user = getUser(_currentID);
			alert("The user "+_user.get("name") + " " + _user.get("lastName")+" can't have multiple roles in a single project");
			return true;	
		}
	}return false;
}

function howManyTimes(pElement, pArray){
	var _count = 0;
	for(var i = 0; i < pArray.length; i++){
		if(pElement==pArray[i]){
			_count++;
		}
	}return	_count;
}

function getUser(pID){
	for(var i = 0; i < USERS.length; i++){
		if(USERS[i].id == pID){
			return USERS[i];
		}
	}return null;
}