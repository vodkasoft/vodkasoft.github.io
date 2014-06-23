var SPRINTS;
var TASKS;

function chartspage(){
	getSprints();
}

function getSprints(){
	var Sprint = Parse.Object.extend("Sprint");
	var query = new Parse.Query(Sprint);
	query.equalTo("projectID",localStorage.getItem("CurrentProjectID"));
	query.find({
		success: function(result){
			window.SPRINTS = result;
			for(var i = 0; i < result.length; i++){
				addSprint(result[i]);
			}
		},
		error: function(error){
			alert("ERROR CODE: "+error.code+": "+getError(error.code));
		}
	});		
}

function getTasks(){
	window.TASKS = [];
	var _SprintID = document.getElementById("SprintSelect").value;
	var Task = Parse.Object.extend("Task");
	var query = new Parse.Query(Task);
	query.equalTo("sprintID",_SprintID);
	query.find({
		success: function(result){
			window.TASKS = result;
		}
	});
}

function addSprint(pSprint){
	var _mother = document.getElementById("SprintSelect");
	var _element = document.createElement("option");
	_element.setAttribute("value",pSprint.id);
	_element.innerHTML = pSprint.get("name");
	_mother.appendChild(_element);
}

function getXAxis(pSize){
	var Axis = [];
	for(var i = pSize; i >= 0; i--){
		Axis.push(i);
	}return Axis;
}

function getEstimated(pSize){
	var _EstimatedData = [];
	var LAST = getEstimatedTop();
	_EstimatedData.push(LAST);
	var COEF = getEstimatedTop()/pSize;
	var CURRENT = LAST;
	for(var i = pSize; i > 1; i--){
		_EstimatedData.push(CURRENT-COEF);
		CURRENT = CURRENT-COEF;
	}
	_EstimatedData.push(0);
	return _EstimatedData;
}

function getEstimatedTop(){
	var TOTAL = 0;
	for(var i = 0; i < window.TASKS.length; i++){
		TOTAL+=window.TASKS[i].get("estimatedDuration");
	}
	return TOTAL;
}

function getInvested(pSize){
	var _Invested = [];
	var CURRENT = getEstimatedTop();
	_Invested.push(CURRENT);
	for(var i = 0; i < (pSize-1); i++){
		CURRENT = CURRENT - window.TASKS[i].get("investedDuration");
		_Invested.push(CURRENT);
	}
	_Invested.push(0);
	return _Invested;
}

function generateChart(){
	var _SprintID = document.getElementById("SprintSelect").value;
	var _Mode = document.getElementById("ModeSelect").value;
	if(isSprintSelected(_SprintID) && isModeSelected(_Mode)){
		var _SprintDuration = getSprintDuration(_SprintID);
		var _QuantityOfData = _SprintDuration;
		var _XAxis = getXAxis(_QuantityOfData);
		var _Estimated = getEstimated(_QuantityOfData);
		var _Invested = getInvested(_QuantityOfData);
		var data = {
			labels : _XAxis,
			datasets : [
				{
					fillColor : "rgba(255,0,0,0)",
					strokeColor : "rgba(0,0,0,1)",
					pointColor : "rgba(0,0,0,1)",
					pointStrokeColor : "#fff",
					data : _Estimated
				},
				{
					fillColor : "rgba(151,187,205,0)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : _Invested
				}
			]
		}
		var Options = {
				
			//Boolean - If we show the scale above the chart data			
			scaleOverlay : false,
			
			//Boolean - If we want to override with a hard coded scale
			scaleOverride : false,
			
			//** Required if scaleOverride is true **
			//Number - The number of steps in a hard coded scale
			scaleSteps : null,
			//Number - The value jump in the hard coded scale
			scaleStepWidth : null,
			//Number - The scale starting value
			scaleStartValue : null,

			//String - Colour of the scale line	
			scaleLineColor : "rgba(0,0,0,.1)",
			
			//Number - Pixel width of the scale line	
			scaleLineWidth : 1,

			//Boolean - Whether to show labels on the scale	
			scaleShowLabels : true,
			
			//Interpolated JS string - can access value
			scaleLabel : "<%=value%>",
			
			//String - Scale label font declaration for the scale label
			scaleFontFamily : "'Arial'",
			
			//Number - Scale label font size in pixels	
			scaleFontSize : 12,
			
			//String - Scale label font weight style	
			scaleFontStyle : "normal",
			
			//String - Scale label font colour	
			scaleFontColor : "#666",	
			
			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines : true,
			
			//String - Colour of the grid lines
			scaleGridLineColor : "rgba(0,0,0,.05)",
			
			//Number - Width of the grid lines
			scaleGridLineWidth : 1,	
			
			//Boolean - Whether the line is curved between points
			bezierCurve : false,
			
			//Boolean - Whether to show a dot for each point
			pointDot : true,
			
			//Number - Radius of each point dot in pixels
			pointDotRadius : 3,
			
			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth : 1,
			
			//Boolean - Whether to show a stroke for datasets
			datasetStroke : true,
			
			//Number - Pixel width of dataset stroke
			datasetStrokeWidth : 2,
			
			//Boolean - Whether to fill the dataset with a colour
			datasetFill : true,
			
			//Boolean - Whether to animate the chart
			animation : true,

			//Number - Number of animation steps
			animationSteps : 60,
			
			//String - Animation easing effect
			animationEasing : "easeOutQuart",

			//Function - Fires when the animation is complete
			onAnimationComplete : null
			
		}
		var BDChart = new Chart(document.getElementById("BurnDownChart").getContext("2d")).Line(data,Options);
	}
}

function getMax(pY){
	var _MAX = 0;
	for(var i = 0; i < pY.length; i++){
		if(pY[i]>=_MAX){
			_MAX = pY[i];
		}
	}
	return _MAX;
}

function isSprintSelected(pPAR){
	if(pPAR == "-"){
		alert("You haven't choosed a Sprint");
		return false;
	}return true;
}

function isModeSelected(pPAR){
	if(pPAR == "-"){
		alert("You haven't choosed a mode");
		return false;
	}return true;
}

function getSprintDuration(pID){
	for(var i = 0; i < window.SPRINTS.length; i++){
		if(window.SPRINTS[i].id == pID){
			return window.SPRINTS[i].get("duration");
		}
	}return null;
}