var RELEASES;

function definesprintspage(){
	getReleases();
	var _Project = Parse.Object.extend("Project");
	query = new Parse.Query(_Project);
	query.get(localStorage.getItem("CurrentProjectID"), {
		success: function(project){
			var _releases = window.RELEASES;
			var _mother = document.getElementById("ReleaseSelect");
			for(var i = 0; i < _releases.length; i++){
				var e = document.createElement("option");
				e.setAttribute("value",_releases[i].id);
				e.setAttribute("id",i+1);
				e.innerHTML = i+1;
				_mother.appendChild(e);
			}
		},
		error: function(project, error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function getReleases(){
	var Release = Parse.Object.extend("Release");
	var query = new Parse.Query(Release);
	query.ascending("createdAt");
	query.equalTo("projectID",localStorage.getItem("CurrentProjectID"));
	query.find({
		success: function(results){
			window.RELEASES = results;
		},
		error: function(error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function defineSprint(){
	var _SprintName = document.getElementById("SprintNameInput").value;
	var _SprintDuration = parseInt(document.getElementById("SprintDurationInput").value);
	if(_SprintName==""){
		alert("You haven't entered the sprint name yet");
	}else{
		var Sprint = Parse.Object.extend("Sprint");
		var sprint = new Sprint();
		sprint.set("name",_SprintName);
		sprint.set("userStories",[]);
		sprint.set("duration",_SprintDuration);
		sprint.set("sprintReview","");
		sprint.set("projectID",localStorage.getItem("CurrentProjectID"));
		sprint.save(null, {
			success: function(sprint){
				var _release = document.getElementById("ReleaseSelect").value;
				var Release = Parse.Object.extend("Release");
				var query = new Parse.Query(Release);
				query.get(_release, {
					success: function(release){
						release.add("sprints",sprint.id);
						release.save();
						alert("Sprint defined successfully");
						document.location.href="scrummaster.html";
					},
					error: function(release, error){
						alert("ERROR CODE: "+error.code+": "+getError(error.code));
					}
				});
			},
			error: function(error){
				alert("ERROR CODE: "+error.code+": "+getError(error.code));
			}
		});
	}
}