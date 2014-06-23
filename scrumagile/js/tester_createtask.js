var USERSTORIES = [];

function createtaskpage(){
	getUserStories();
}

function getUserStories(){
	var UserStory = Parse.Object.extend("UserStory");
	var query = new Parse.Query(UserStory);
	query.equalTo("project",localStorage.getItem("CurrentProjectID"));
	query.containsAll("testers",[localStorage.getItem("CurrentUserID")]);
	query.find({
		success: function(result){
			window.USERSTORIES = result;
			for(var i = 0; i < result.length; i++){
				appendUserStory(result[i]);
			}
		},
		error: function(error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function storeSprintID(){
	var Sprint = Parse.Object.extend("Sprint");
	var query = new Parse.Query(Sprint);
	query.containsAll("userStories",[document.getElementById("UserStorySelect").value]);
	query.find({
		success: function(result){
			localStorage.setItem("CurrentSprintID",result[0].id);
		}
	});
}

function appendUserStory(pUS){
	var _mother = document.getElementById("UserStorySelect");
	var _element = document.createElement("option");
	_element.setAttribute("value",pUS.id);
	_element.setAttribute("id",pUS.id);
	_element.innerHTML = pUS.get("story");
	_mother.appendChild(_element);
}

function createTask(){
	if(document.getElementById("TaskInput").value == ""){
		alert("You haven't written the task");
	}else{
		if(document.getElementById("UserStorySelect").value == "-"){
			alert("You haven't selected a user story");
		}else{
			if(document.getElementById("TaskDurationInput").value == "-"){
				alert("You haven't selected a duration for the task");
			}else{
				var _description = document.getElementById("TaskInput").value;
				var _duration = parseInt(document.getElementById("TaskDurationInput").value);
				var Task = Parse.Object.extend("Task");
				var task = new Task();
				task.set("description", _description);
				task.set("estimatedDuration", _duration);
				task.set("investedDuration",0);
				task.set("projectID",localStorage.getItem("CurrentProjectID"));
				task.set("sprintID", localStorage.getItem("CurrentSprintID"));
				task.save(null, {
					success: function(task){
						alert("Task successfully created");
						var UserStory = Parse.Object.extend("UserStory");
						var query = new Parse.Query(UserStory);
						query.get(document.getElementById("UserStorySelect").value,{
							success: function(userstory){
								userstory.add("tasks",task.id);
								userstory.save();
								cleanPage();
							},
							error: function(userstory, error){
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
	}
}

function goBack(){
	document.location.href = "tester.html";
}

function cleanPage(){
	document.getElementById("TaskInput").value = "";
	document.getElementById("TaskDurationInput").value = 1;
	document.getElementById("UserStorySelect").value = "-";
	document.getElementById("TaskDurationInput").value = "-";
}