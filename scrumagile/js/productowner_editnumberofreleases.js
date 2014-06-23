var PROJECT;

function editnumberofreleasespage(){
	var _CurrentProjectID = localStorage.getItem("CurrentProjectID");
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.get(_CurrentProjectID,{
		success: function(project){
			document.getElementById("ProjectName").value = project.get("name");
			document.getElementById("ProjectDescription").value = project.get("description");
			document.getElementById("releasesInput").value = project.get("releases");
			window.PROJECT = project;
		},
		error: function(project, error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function editReleases(){
	var _currentNumberOfReleases = window.PROJECT.get("releases");
	var _selectedNumberOfReleases = parseInt(document.getElementById("releasesInput").value);
	if((_selectedNumberOfReleases - _currentNumberOfReleases)<0){
		alert("You have to select a greater number of releases");
	}else{
		var _releasesToCreate = _selectedNumberOfReleases - _currentNumberOfReleases;
		var Release = Parse.Object.extend("Release");
		for(var i = 0; i < _releasesToCreate; i++){
			var release = new Release();
			release.set("sprints",[]);
			release.set("projectID",window.PROJECT.id);
			release.save();
			window.PROJECT.set("releases",_currentNumberOfReleases+_releasesToCreate);
			window.PROJECT.save();
		}
		alert("Project's number of releases successfully updated");
		document.location.href="productowner.html";
	}
}