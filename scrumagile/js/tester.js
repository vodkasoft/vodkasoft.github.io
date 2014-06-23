var PROJECTS = [];

function testerpage(){
	document.getElementById("UserNameSpan").innerHTML = localStorage.getItem("Name")+" "+localStorage.getItem("LastName");
	document.getElementById("UserRoleSpan").innerHTML = "<b><i>Tester</i></b>";
}

function getProjects(){
	window.PROJECTS = [];
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.containsAll("testers",[localStorage.getItem("CurrentID")]);
	query.find({
	  success: function(results) {
	  	window.PROJECTS = results;
	  	for(var i = 0; i < results.length; i++){
	  		appendProject(results[i]);
	  	}
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}

function appendProject(pProject){
	var motherDiv = document.getElementById("projectSelect");
	var e = document.createElement("option");
	e.setAttribute("id",pProject.id);
	e.setAttribute("value",pProject.id);
	e.innerHTML = pProject.get("name");
	motherDiv.appendChild(e);
}

function goToCreateTask(){
	var _projectID = document.getElementById("projectSelect").value;
	if(_projectID == "-"){
		alert("You haven't selected a project to work");
	}else{
		localStorage.setItem("CurrentProjectID",_projectID);
		document.location.href = "tester_createtask.html";
	}
}

function goToUpdateTask(){
	var _projectID = document.getElementById("projectSelect").value;
	if(_projectID == "-"){
		alert("You haven't selected a project to work");
	}else{
		localStorage.setItem("CurrentProjectID",_projectID);
		document.location.href="tester_choosetasktoedit.html";
	}
}

function goExit(){
	localStorage.clear();
	document.location.href = "index.html";
}

function goToDefineCriterion(){
	var _projectID = document.getElementById("projectSelect").value;
	if(_projectID == "-"){
		alert("You haven't selected a project to work");
	}else{
		localStorage.setItem("CurrentProjectID",_projectID);
		document.location.href="tester_definecriterion.html";
	}
}
