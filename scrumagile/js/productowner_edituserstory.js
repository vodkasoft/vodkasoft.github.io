function edituserstorypage(){
	var UserStory = Parse.Object.extend("UserStory");
	var query = new Parse.Query(UserStory);
	query.get(localStorage.getItem("CurrentUserStoryID"),{
		success: function(result){
			document.getElementById("Story").value = result.get("story");
			switch(result.get("priority")){
				case 1:
					document.getElementById("prioritySelect").value=1;
					break;
				case 2:
					document.getElementById("prioritySelect").value=2;
					break;
				case 3:
					document.getElementById("prioritySelect").value=3;
					break;
			}
			document.getElementById("pokerCardSelect").value = result.get("pokerCard");
		}
	});
}

function updateUserStory(){
	var _story = document.getElementById("Story").value;
	var _priority = document.getElementById("prioritySelect").value;
	var _poker = document.getElementById("pokerCardSelect").value;
	if(inputStory(_story)&&inputPriority(_priority)&&inputPoker(_poker)){
		var UserStory = Parse.Object.extend("UserStory");
		var query = new Parse.Query(UserStory);
		query.get(localStorage.getItem("CurrentUserStoryID"),{
			success: function(result){
				result.set("story",_story);
				result.set("priority",getRelativePriority(_priority));
				result.set("pokerCard",getRelativePokerCard(_poker));
				result.save();
				alert("User story successfully updated");
				document.location.href = "productowner.html";
			},
			error: function(result, error){
				alert("ERROR CODE: "+error.code+": "+getError(error.code));
			}
		});
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