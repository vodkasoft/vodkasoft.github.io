var SHADOW = false;

function choosetasktoedit(){
	var Task = Parse.Object.extend("Task");
	var query = new Parse.Query(Task);
	query.equalTo("projectID",localStorage.getItem("CurrentProjectID"));
	query.find({
	  success: function(result) {
	    for(var i = 0; i < result.length; i++){
	    	addTask(result[i]);
	    }
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}	

function addTask(pTask){
	var _task = pTask.get("description");
	var _durationEst = pTask.get("estimatedDuration");
	var _durationInv = pTask.get("investedDuration");
	var mother = document.getElementById("FormTable");
	var e = document.createElement("tr");
	if(SHADOW){
		e.setAttribute("style","background-color: #eeeeee;");
	}
	e.setAttribute("onclick","goToEditTask('"+pTask.id+"');");
	e.innerHTML = "<td>"+_task+"</td><td>"+_durationEst+"</td><td>"+_durationInv+"</td>";
	mother.appendChild(e);
	if(SHADOW){
		SHADOW = false;
	}else{
		SHADOW = true;
	}
}

function goToEditTask(pID){
	localStorage.setItem("CurrentTaskID",pID);
	document.location.href = "tester_edittask.html";
}