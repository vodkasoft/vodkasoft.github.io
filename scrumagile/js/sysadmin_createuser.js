var USERS = [];
var PROJECTS = [];
var HAVEPROJECTS = false;

function init_createuser(){
	getUsers();
	getProjects();
}

function getUsers(){
	USERS = [];
	var Person = Parse.Object.extend("Person");
	var query = new Parse.Query(Person);
	query.find({
	  success: function(results) {
	    USERS = results;
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});	
}

function getProjects(){
	PROJECTS = [];
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.find({
	  success: function(results) {
	    PROJECTS = results;
	    fillProjects();
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});	
}

function createUser(){
	if(HAVEPROJECTS){
		complexCreateUser();
	}else{
		simplyCreateUser();
	}
}

function insertPerson(pUsername, pName, pLastName, pPassword, pProject, pRole){
	var Person = Parse.Object.extend("Person");
	var person = new Person();
	person.set("name",pName);
	person.set("username",pUsername);
	person.set("lastName",pLastName);
	person.set("sysadmin",false);
	person.set("password",pPassword);
	person.save(null, {
		success: function(person){
			if(HAVEPROJECTS){
				switch(pRole){
					case 0:
						alert("User "+pName+" "+pLastName+" was created successfully");
						break;
					case 1:
						pProject.set("scrumMaster",person.id);
						pProject.save();
						alert("User "+pName+" "+pLastName+" was created successfully and is the Scrum Master of the "+pProject.get("name")+" project");
						break;
					case 2:
						pProject.set("productOwner",person.id);
						pProject.save();
						alert("User "+pName+" "+pLastName+" was created successfully and is the Product Owner of the "+pProject.get("name")+" project");
						break;
					case 3: 
						pProject.add("developers",person.id);
						pProject.save();
						alert("User "+pName+" "+pLastName+" was created successfully and is the new Developer of the "+pProject.get("name")+" project");
						break;
					case 4:
						pProject.add("testers",person.id);
						pProject.save();
						alert("User "+pName+" "+pLastName+" was created successfully and is the new Tester of the "+pProject.get("name")+" project");
						break;
				}
				document.location.href = "sysadmin.html";
			}else{
				alert("User "+_name+" "+_lastName+" was created successfully");
				document.location.href = "sysadmin.html";
			}
		},
		error: function(error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function complexCreateUser(){
	var _userName = document.getElementById("UsernameInput").value;
	var _name = document.getElementById("NameInput").value;
	var _lastName = document.getElementById("LastNameInput").value;
	var _password = document.getElementById("PasswordInput").value;
	var _secondPassword = document.getElementById("PasswordSecondInput").value;
	var _role = document.getElementById("RoleSelect").value;
	var _projectID = document.getElementById("ProjectToSelect").value;
	var _Project = getProject(_projectID);
	if(inputsFilled(_userName, _name, _lastName, _password, _secondPassword) && !userNameExists(_userName) && passwordsMatch(_password, _secondPassword)){
		if(_role == "-" && _projectID == "-"){
			insertPerson(_userName, _name, _lastName, _password, "", 0);
			return;
		}
		if(_role == "-"){
			alert("No role selected");
			return;
		}
		if(_projectID == "-"){
			alert("No project selected");
			return;
		}
		if(_role == "scrummaster" && !hasScrumMaster(_Project)){
			insertPerson(_userName, _name, _lastName, _password, _Project, 1);
		}
		if(_role == "productowner" && !hasProductOwner(_Project)){
			insertPerson(_userName, _name, _lastName, _password, _Project, 2);
		}
		if(_role == "developer"){
			insertPerson(_userName, _name, _lastName, _password, _Project, 3);
		}
		if(_role == "tester"){
			insertPerson(_userName, _name, _lastName, _password, _Project, 4);
		}
	}
}

function simplyCreateUser(){
	var _userName = document.getElementById("UsernameInput").value;
	var _name = document.getElementById("NameInput").value;
	var _lastName = document.getElementById("LastNameInput").value;
	var _password = document.getElementById("PasswordInput").value;
	var _secondPassword = document.getElementById("PasswordSecondInput").value;
	if(inputsFilled(_userName, _name, _lastName, _password, _secondPassword) && !userNameExists(_userName) && passwordsMatch(_password, _secondPassword)){
		insertPerson(_userName, _name, _lastName, _password, "", 0);
	}
}

function inputsFilled(pUserName, pName, pLastName, pPassword, pSecondPassword){
	if(pUserName == "" || pName == "" || pLastName == "" || pPassword == "" || pSecondPassword == ""){
		alert("Missing information");
		return false;
	}return true;
}

function passwordsMatch(pPU, pPD){
	if(pPU != pPD){
		alert("Passwords mismatch");
		return false;
	}return true;
}

function getProject(pID){
	for(var i = 0; i < PROJECTS.length; i++){
		if(PROJECTS[i].id == pID){
			return PROJECTS[i];
		}
	}
	return null;
}

function userNameExists(pUsername){
	for(var i = 0; i < USERS.length; i++){
		if(USERS[i].get("username")==pUsername){
			alert("There's already an user with that user name");
			return true;
		}
	}
	return false;
}

function fillProjects(){
	if(PROJECTS.length==0){
		alert("There are no projects yet, so the user that you're about to create, isn't going to have a role");
		var _roleSelect = document.getElementById("RoleSelect");
		_roleSelect.setAttribute("disabled","true");
		var _projectToSelect = document.getElementById("ProjectToSelect");
		_projectToSelect.setAttribute("disabled","true");
		HAVEPROJECTS = false;
	}else{
		HAVEPROJECTS = true;
		var motherDiv = document.getElementById("ProjectToSelect");
		for(var i = 0; i < PROJECTS.length; i++){
			var element=document.createElement("option");
			element.setAttribute("value",PROJECTS[i].id);
			element.innerHTML= PROJECTS[i].get("name");
		    motherDiv.appendChild(element);
		}
	}
}

function hasScrumMaster(pProject){
	if(pProject.get("scrumMaster")==""){
		return false;
	}
	alert("Can't create this user because the project already has a Scrum Master");
	return true;
}

function hasProductOwner(pProject){
	if(pProject.get("productOwner")==""){
		return false;
	}
	alert("Can't create this user because the project already has a Product Owner");
	return true;
}