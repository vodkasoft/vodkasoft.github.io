function associatepage(){	
	getUserStories();
	getTesters();
	getDevelopers();
}

function getUserStories(){
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.get(localStorage.getItem("CurrentProjectID"),{
		success: function(result){
			var _UserStoriesID = result.get("userStories");
			for(var i = 0; i < _UserStoriesID.length; i++){
				var UserStory = Parse.Object.extend("UserStory");
				var query2 = new Parse.Query(UserStory);
				query2.get(_UserStoriesID[i],{
					success: function(result2){
						var _mother = document.getElementById("UserStorySelect");
						var _element = document.createElement("option");
						_element.setAttribute("value",result2.id);
						_element.setAttribute("id",result2.id);
						_element.innerHTML = result2.get("story");
						_mother.appendChild(_element);
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

function getDevelopers(){
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.get(localStorage.getItem("CurrentProjectID"),{
		success: function(result){
			var _DevelopersID = result.get("developers");
			for(var i = 0; i < _DevelopersID.length; i++){
				var Person = Parse.Object.extend("Person");
				var query2 = new Parse.Query(Person);
				query2.get(_DevelopersID[i],{
					success: function(result2){
						var _mother = document.getElementById("DeveloperSelect");
						var _element = document.createElement("option");
						_element.setAttribute("value",result2.id);
						_element.setAttribute("id",result2.id);
						_element.innerHTML = result2.get("name") + " " + result2.get("lastName");
						_mother.appendChild(_element);
					},
					error: function(result2, error){
						alert("ERROR CODE: "+error.code+": "+getError(error.code));
					}
				});
			}
		}
	});
}

function getTesters(){
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.get(localStorage.getItem("CurrentProjectID"),{
		success: function(result){
			var _DevelopersID = result.get("testers");
			for(var i = 0; i < _DevelopersID.length; i++){
				var Person = Parse.Object.extend("Person");
				var query2 = new Parse.Query(Person);
				query2.get(_DevelopersID[i],{
					success: function(result2){
						var _mother = document.getElementById("TesterSelect");
						var _element = document.createElement("option");
						_element.setAttribute("value",result2.id);
						_element.setAttribute("id",result2.id);
						_element.innerHTML = result2.get("name") + " " + result2.get("lastName");
						_mother.appendChild(_element);
					},
					error: function(result2, error){
						alert("ERROR CODE: "+error.code+": "+getError(error.code));
					}
				});
			}
		}
	})
}

function isAssociated(pID){
	var _UserStoryID = document.getElementById()
	var UserStory = Parse.Object.extend("UserStory");
	var query = new Parse.Query(UserStory);
	query.get(_UserStoryID, {
		success: function(result){
			var _testers = result.get("testers");
			var _developers = result.get("developers");
			return inArray(pID, _testers) && inArray(pID, _developers);
		},
		error: function(result, error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function inArray(pElement, pArray){
	for(var i = 0; i < pArray.length; i++){
		if(pArray[i]==pElement){
			return true;
		}
	}
	return false;
}

function associateStory(){
	var _UserStoryID = document.getElementById("UserStorySelect").value;
	var _DeveloperID = document.getElementById("DeveloperSelect").value;
	var _TesterID = document.getElementById("TesterSelect").value;
	if(_UserStoryID == "-"){
		alert("You haven't selected an user story");
	}else{
		if(_DeveloperID == "-" && _TesterID == "-"){
			alert("You haven't selected neither a developer or a tester");
		}else{
			var UserStory = Parse.Object.extend("UserStory");
			var query = new Parse.Query(UserStory);
			query.get(_UserStoryID, {
				success: function(result){
					if(_DeveloperID!="-"){
						if(inArray(_DeveloperID, result.get("developers"))){
							alert("This developer is already associated to this user story");
						}else{
							result.add("developers",_DeveloperID);
							result.save();
							alert("The developer has been successfully associated to this user story");
						}
					}
					if(_TesterID!="-"){
						if(inArray(_TesterID, result.get("testers"))){
							alert("This tester is already associated to this user story");
						}else{
							result.add("testers",_TesterID);
							result.save();
							alert("The tester has been successfully associated to this user story");
						}
					}
					cleanPage();
				},
				error: function(result, error){
					alert("ERROR CODE: "+error.code+": "+getError(error.code));
				}
			});
		}
	}
}

function goBack(){
	document.location.href = "scrummaster.html";
}

function cleanPage(){
	document.getElementById("UserStorySelect").value = "-";
	document.getElementById("DeveloperSelect").value = "-";
	document.getElementById("TesterSelect").value = "-";
}