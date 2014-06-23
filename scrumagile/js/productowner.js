var PROJECTS = [];

function productownerpage(){
	document.getElementById("UserNameSpan").innerHTML = localStorage.getItem("Name")+" "+localStorage.getItem("LastName");
	document.getElementById("UserRoleSpan").innerHTML = "<b><i>Product Owner</i></b>";
}

function getProjects(){
	window.PROJECTS = [];
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.equalTo("productOwner",localStorage.getItem("CurrentID"));
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

function goToCreateNewUserStory(){
	if(document.getElementById("projectSelect").value == "-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID",getProject(projectID).id);
		localStorage.setItem("CurrentProjectName",getProject(projectID).get("name"));
		document.location.href = "productowner_createnewuserstory.html";
	}
}

function goToEditUserStory(){
	if(document.getElementById("projectSelect").value=="-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID", getProject(projectID).id);
		localStorage.setItem("CurrentProjectName", getProject(projectID).get("name"));
		document.location.href="productowner_choosestorytoedit.html";
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

function goToDeleteUserStory(){
	if(document.getElementById("projectSelect").value=="-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID", getProject(projectID).id);
		localStorage.setItem("CurrentProjectName",getProject(projectID).get("name"));
		document.location.href="productowner_deleteuserstory.html";
	}
}

function goToEditNumberOfReleases(){
	if(document.getElementById("projectSelect").value=="-"){
		alert("You haven't selected a project to work");
	}else{
		var projectID = document.getElementById("projectSelect").value;
		localStorage.setItem("CurrentProjectID",getProject(projectID).id);
		localStorage.setItem("CurrentProjectName",getProject(projectID).get("name"));
		document.location.href="productowner_editnumberofreleases.html";
	}
}

function goToExit(){
	localStorage.clear();
	document.location.href="index.html";
}