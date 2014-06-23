var USERSTORIES;

function createtaskpage(){
	getUserStories();
}

function getUserStories(){
	var UserStory = Parse.Object.extend("UserStory");
	var query = new Parse.Query(UserStory);
	query.equalTo("project",localStorage.getItem("CurrentProjectID"));
	query.containsAll("developers",[localStorage.getItem("CurrentUserID")]);
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

function appendUserStory(pID){
	var _mother = document.getElementById("UserStorySelect");
	var _element = document.createElement("option");
	_element.setAttribute("value",pUS.id);
	_element.setAttribute("id",pUS.id);
	_element.innerHTML = pUS.get("story");
	_mother.appendChild(_element);
}

function defineCriterion(){
	if(document.getElementById("CriterionInput").value == ""){
		alert("You haven't written the task");
	}else{
		if(document.getElementById("UserStorySelect").value == "-"){
			alert("You haven't selected a user story");
		}else{
			var _description = document.getElementById("CriterionInput").value;
			var Criterion = Parse.Object.extend("Criterion");
			var criterion = new Criterion();
			criterion.set("description", _description);
			criterion.set("done", false);
			criterion.save(null, {
				success: function(criterion){
					alert("Criterion successfully created");
					var UserStory = Parse.Object.extend("UserStory");
					var query = new Parse.Query(UserStory);
					query.get(document.getElementById("UserStorySelect").value,{
						success: function(userstory){
							userstory.add("criterions",criterion.id);
							userstory.save();
							cleanPage();
						},
						error: function(userstory, error){
							alert("ERROR CODE: "+error.code+": "+getError(error.code));
						}
					});
				},
				error: function(criterion, error){
					alert("ERROR CODE: "+error.code+": "+getError(error.code));
				}
			});
			
		}
	}
}

function goBack(){
	document.location.href = "developer.html";
}

function cleanPage(){
	document.getElementById("CriterionInput").value = "";
	document.getElementById("UserStorySelect").value = "-";
}