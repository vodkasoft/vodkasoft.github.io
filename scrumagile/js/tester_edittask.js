function edittaskpage(){
	var Task = Parse.Object.extend("Task");
	var query = new Parse.Query(Task);
	query.get(localStorage.getItem("CurrentTaskID"),{
		success: function(result){
			document.getElementById("TaskInput").value = result.get("description");
		},
		error: function(result, error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});

	var UserStory = Parse.Object.extend("UserStory");
	var query2 = new Parse.Query(UserStory);
	query2.containsAll("tasks",[localStorage.getItem("CurrentTaskID")]);
	query2.find({
		success: function(result2){
			document.getElementById("UserStorySpan").innerHTML = result2[0].get("story");
		},
		error: function(error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});
}

function updateTask(){
	if(document.getElementById("TaskDuration").value=="-"){
		alert("You haven't selected a duration");
	}else{
		var Task = Parse.Object.extend("Task");
		var query = new Parse.Query(Task);
		query.get(localStorage.getItem("CurrentTaskID"),{
			success: function(result){
				var _description = document.getElementById("TaskInput").value;
				var _duration = parseInt(document.getElementById("TaskDuration").value);
				result.set("description",_description);
				result.set("investedDuration",_duration);
				result.save();
				alert("Task updated successfully");
				document.location.href = "tester_choosetasktoedit.html";
			},
			error: function(result, error){
				alert("ERROR CODE: "+error.code+": "+getError(error.code));
			}
		});
	}
}