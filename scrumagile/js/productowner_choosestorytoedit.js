var SHADOW = false;

function loadStories(){
	window.PROJECTS = [];
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.get(localStorage.getItem("CurrentProjectID"), {
	  success: function(result) {
	    var _stories = result.get("userStories");
	    for(var i = 0; i < _stories.length; i++){
	    	var UserStory = Parse.Object.extend("UserStory");
	    	var query = new Parse.Query(UserStory);
	    	query.get(_stories[i],{
	    		success: function(story){
	    			addStory(story);
	    		},
	    		error: function(story, error){
	    			alert("ERROR CODE: "+error.code+": "+getError(error.code));
	    		}
	    	})
	    }
	  },
	  error: function(result, error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}	

function addStory(pStory){
	var _story = pStory.get("story");
	var _priority = pStory.get("priority");
	var _poker = pStory.get("pokerCard");
	var mother = document.getElementById("FormTable");
	var e = document.createElement("tr");
	if(SHADOW){
		e.setAttribute("style","background-color: #eeeeee;");
	}
	e.setAttribute("onclick","goToEditUserStory('"+pStory.id+"');");
	e.innerHTML = "<td>"+_story+"</td><td>"+getRelativePriority(_priority)+"</td><td>"+_poker+"</td>";
	mother.appendChild(e);
	if(SHADOW){
		SHADOW = false;
	}else{
		SHADOW = true;
	}
}

function goToEditUserStory(pID){
	localStorage.setItem("CurrentUserStoryID",pID);
	document.location.href = "productowner_edituserstory.html";
}

function getRelativePriority(pPriority){
	switch(pPriority){
		case 1:
			return "High";
		case 2:
			return "Medium";
		case 3:
			return "Low";
	}
}