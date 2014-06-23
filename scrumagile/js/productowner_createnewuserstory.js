var PROJECTS = [];

function createnewuserstorypage(){
}

function getProjects(){
	window.PROJECTS = [];
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.equalTo("productOwner",localStorage.getItem("CurrentID"));
	query.find({
	  success: function(results) {
	  	window.PROJECTS = results;
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}

function createUserStory(){
	var _story = document.getElementById("Story").value;
	var _priority = document.getElementById("prioritySelect").value;
	var _poker = document.getElementById("pokerCardSelect").value;
	if(inputStory(_story) && inputPriority(_priority) && inputPoker(_poker)){
		var UserStory = Parse.Object.extend("UserStory");
		var userStory = new UserStory();
		userStory.set("story",_story);
		userStory.set("priority",getRelativePriority(_priority));
		userStory.set("pokerCard",getRelativePokerCard(_poker));
		userStory.set("free", true);
		userStory.set("tasks",[]);
		userStory.set("criterions",[]);
		userStory.set("developers",[]);
		userStory.set("testers",[]);
		userStory.set("project",localStorage.getItem("CurrentProjectID"));
		userStory.save(null, {
			success: function(userStory){
				var project = getProject(localStorage.getItem("CurrentProjectID"));
				project.add("userStories",userStory.id);
				project.save();
				alert("User story successfully added to "+localStorage.getItem("CurrentProjectName")+ " project");
				document.location.href="productowner.html";
			},
			error: function(error){
				alert("ERROR CODE: "+error.code+": "+getError(error.code));
			}
		})
	}
}

function getRelativePriority(pPriority){
	if(pPriority=="1"){
		return 1;
	}
	if(pPriority=="2"){
		return 2; 
	}
	if(pPriority=="3"){
		return 3;
	}
}

function getRelativePokerCard(pPoker){
	if(pPoker=="1"){
		return 1;
	}
	if(pPoker=="2"){
		return 2;
	}
	if(pPoker=="3"){
		return 3;
	}
	if(pPoker=="5"){
		return 5;
	}
	if(pPoker=="8"){
		return 8;
	}
	if(pPoker=="13"){
		return 13;
	}
	if(pPoker=="20"){
		return 20;
	}
	if(pPoker=="40"){
		return 40;
	}
}

function inputStory(pStory){
	if(pStory == ""){
		alert("You need to write a story");
		return false;
	}return true;
}

function inputPriority(pPriority){
	if(pPriority == "-"){
		alert("Please, choose a priority");
		return false;
	}return true;
}

function inputPoker(pPoker){
	if(pPoker == "-"){
		alert("Please, choose a poker card");
		return false;
	}return true;
}

function getProject(pID){
	for(var i = 0; i < PROJECTS.length; i++){
		if(PROJECTS[i].id == pID){
			return PROJECTS[i];
		}
	}return null;
}