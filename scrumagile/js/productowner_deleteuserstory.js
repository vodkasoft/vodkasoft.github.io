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
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and description.
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
	e.setAttribute("onclick","deleteStory('"+pStory.id+"');");
	e.innerHTML = "<td>"+_story+"</td><td>"+getRelativePriority(_priority)+"</td><td>"+_poker+"</td>";
	mother.appendChild(e);
	if(SHADOW){
		SHADOW = false;
	}else{
		SHADOW = true;
	}
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

function deleteStory(pStoryID){
	if(confirm("Are you sure you want to delete this User Story?")){
		var UserStory = Parse.Object.extend("UserStory");
		var query = new Parse.Query(UserStory);
		query.get(pStoryID,{
			success: function(result){
				result.destroy();
				var Project = Parse.Object.extend("Project");
				var query2 = new Parse.Query(Project);
				query2.get(localStorage.getItem("CurrentProjectID"),{
					success: function(project){
						project.set("userStories",deleteStoryID(pStoryID,project.get("userStories")));
						project.save();
						alert("User story successfully deleted");
						document.location.href = "productowner.html";
					},
					error: function(project, error){
						alert("ERROR CODE: "+error.code+": "+getError(error.code));
					}
				})
			},
			error: function(result, error){
				alert("ERROR CODE: "+error.code+": "+getError(error.code));
			}
		});
	}
} 

function deleteStoryID(pID, pArray){
	var _Result = [];
	for(var i = 0; i < pArray.length; i++){
		if(pArray[i]!=pID){
			_Result.push(pArray[i]);
		}
	}return _Result;
}