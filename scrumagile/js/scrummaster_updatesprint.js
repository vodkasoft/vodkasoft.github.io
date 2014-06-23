var SPRINTS = [];
var RELEASES = [];
var STORIES = [];

function updatesprintpage(){
	var SprintSelect = document.getElementById("SprintSelect");
	SprintSelect.disabled = true;
	getReleases();
	getUserStories();
}

function updateSprint(){
	if(document.getElementById("ReleaseSelect").value=="-"){
		alert("You haven't selected a release yet");
	}else{
		if(document.getElementById("SprintSelect").value=="-"){
			alert("You haven't selected a sprint yet");
		}else{
			var _Stories = getChecked(document.getElementById("UserStoriesTable"));
			var _SprintID = document.getElementById("SprintSelect").value;
			var _SprintReview = document.getElementById("SprintReviewInput").value;
			var Sprint = Parse.Object.extend("Sprint");
			var query = new Parse.Query(Sprint);
			query.get(_SprintID,{
				success: function(result){
					result.set("sprintReview",_SprintReview);
					for(var i = 0; i < _Stories.length; i++){
						result.add("userStories",_Stories[i]);
					}
					result.save();
					for(var i = 0; i < _Stories.length; i++){
						for(var j = 0; j < window.STORIES.length; j++){
							if(STORIES[j].id==_Stories[i]){
								STORIES[j].set("free",false);
								STORIES[j].save();
							}
						}
					}
					alert("Sprint successfully updated");
					document.location.href="scrummaster.html";
				},
				error: function(result, error){
					alert("ERROR CODE: "+error.code+": "+getError(error.code));
				}
			});
		}
	}
}

function getReleases(){
	var Release = Parse.Object.extend("Release");
	var query = new Parse.Query(Release);
	query.ascending("createdAt");
	query.equalTo("projectID",localStorage.getItem("CurrentProjectID"));
	query.find({
		success: function(results){
			window.RELEASES = results;
			for(var i = 0; i < results.length; i++){
				addRelease(results[i].id, i+1);
			}
		},
		error: function(error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function addRelease(pReleaseID, pNum){
	var _ReleaseSelect = document.getElementById("ReleaseSelect");
	var _element = document.createElement("option");
	_element.setAttribute("id",pReleaseID);
	_element.setAttribute("value",pReleaseID);
	_element.innerHTML=pNum;
	_ReleaseSelect.appendChild(_element);
}

function addCorrespondingSprints(){
	if(document.getElementById("ReleaseSelect").value!="-"){
		var _SprintSelect = document.getElementById("SprintSelect");
		_SprintSelect.disabled = false;
		_SprintSelect.innerHTML="";
		getReleaseSprints();
	}
}

function getReleaseSprints(){
	window.SPRINTS = [];
	var Release = Parse.Object.extend("Release");
	var query = new Parse.Query(Release);
	query.get(document.getElementById("ReleaseSelect").value, {
		success: function(result){
			SPRINTS = result.get("sprints");
			for(var i = 0; i < SPRINTS.length; i++){
				var Sprint = Parse.Object.extend("Sprint");
				var query = new Parse.Query(Sprint);
				query.get(SPRINTS[i], {
					success: function(result2){
						var _mother = document.getElementById("SprintSelect");
						var _element = document.createElement("option");
						_element.setAttribute("value","-");
						_element.innerHTML = "-";
						_mother.appendChild(_element);
						addSprint(result2.id,result2.get("name"));
					},
					error: function(result2, error){
						alert("ERROR CODE: "+error.code+": "+getError(error.code));
					}
				});
			}
		},	
		error: function(result, error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function addSprint(pSprintID, pSprintName){
	var _SprintSelect = document.getElementById("SprintSelect");
	var _element = document.createElement("option");
	_element.setAttribute("id",pSprintID);
	_element.setAttribute("value",pSprintID);
	_element.innerHTML = pSprintName;
	_SprintSelect.appendChild(_element);
}

function getUserStories(){
	window.STORIES = [];
	var UserStory = Parse.Object.extend("UserStory");
	var query = new Parse.Query(UserStory);
	query.equalTo("project",localStorage.getItem("CurrentProjectID"));
	query.equalTo("free",true);
	query.find({
		success: function(result){
			window.STORIES = result;
			insertStoriesInTable();
		},
		error: function(error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	})
}

function insertStoriesInTable(){
	var _mother = document.getElementById("UserStoriesTable");
	for(var i = 0; i < STORIES.length; i++){
		var _element = document.createElement("tr");
		_element.innerHTML = "<input type='checkbox' id='"+STORIES[i].id+"'>"+STORIES[i].get("story")+"</input>";
		_mother.appendChild(_element);
	}
}

function getChecked(pMother){
	var _checkboxes = pMother.getElementsByTagName("input");
	var _R = [];
	for(var i = 0; i < _checkboxes.length; i++){
		if(_checkboxes[i].checked){
			_R.push(_checkboxes[i].id);
		}
	}return _R;	
}

function updateSprintReview(){
	if(document.getElementById("SprintSelect").value == "-"){
		document.getElementById("SprintReviewInput").value = "";
	}else{
		var _SprintID = document.getElementById("SprintSelect").value;
		var Sprint = Parse.Object.extend("Sprint");
		var query = new Parse.Query(Sprint);
		query.get(_SprintID, {
			success: function(result){
				document.getElementById("SprintReviewInput").value = result.get("sprintReview");
			},
			error: function(result, error){
				alert("ERROR CODE: "+error.code+": "+getError(error.code));
			}
		});
	}
}