var PROJECTS = [];

function scrummasterpage(){
	document.getElementById("UserNameSpan").innerHTML = localStorage.getItem("Name")+" "+localStorage.getItem("LastName");
	document.getElementById("UserRoleSpan").innerHTML = "<b><i>Scrum Master</i></b>";
}

function getProjects(){
	window.PROJECTS = [];
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.equalTo("scrumMaster",localStorage.getItem("CurrentID"));
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

function goToDefineSprints(){
	if(document.getElementById("projectSelect").value=="-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID",getProject(projectID).id);
		localStorage.setItem("CurrentProjectName",getProject(projectID).get("name"));
		document.location.href="scrummaster_definesprints.html";
	}
}

function goToUpdateSprint(){
	if(document.getElementById("projectSelect").value=="-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID",getProject(projectID).id);
		localStorage.setItem("CurrentProjectName",getProject(projectID).get("name"));
		document.location.href="scrummaster_updatesprint.html";
	}
}

function getProject(pID){
	for(var i = 0; i < PROJECTS.length; i++){
		if(PROJECTS[i].id == pID){
			return PROJECTS[i];
		}
	}
	return null;	
}

function goToAssociate(){
	if(document.getElementById("projectSelect").value == "-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID",getProject(projectID).id);
		localStorage.setItem("CurrentProjectName",getProject(projectID).get("name"));
		document.location.href = "scrummaster_associate.html";
	}
}

function goToCharts(){
	if(document.getElementById("projectSelect").value == "-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID",getProject(projectID).id);
		localStorage.setItem("CurrentProjectName",getProject(projectID).get("name"));
		document.location.href = "scrummaster_charts.html";
	}
}

function goToExit(){
	localStorage.clear();
	document.location.href="index.html";
}