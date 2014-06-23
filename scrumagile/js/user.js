var PROJECTS = [];
var SM = false;
var PO = false;
var DEV = false;
var TEST = false;

function userpage(){
	var _name = localStorage.getItem("Name");
	var _lastName = localStorage.getItem("LastName");
	var motherDiv = document.getElementById("UserName");
	var element=document.createElement("span");
	element.innerHTML= "Welcome, " + _name + " " + _lastName;
    motherDiv.appendChild(element);
}

function fillContent(){

}

function getProjects(){
	window.PROJECTS = [];
	var PerID = localStorage.getItem("CurrentID");
	var Project = Parse.Object.extend("Project");
	var query = new Parse.Query(Project);
	query.find({
	  success: function(results) {
	  	for(var i = 0; i < results.length; i++){
	  		if(results[i].get("scrumMaster")==PerID){
	  			addSM();
	  		}
	  		if(results[i].get("productOwner")==PerID){
	  			addPO();
	  		}
	  		if(inArray(PerID, results[i].get("developers"))){
	  			addDEV();
	  		}
	  		if(inArray(PerID, results[i].get("testers"))){
	  			addTEST();
	  		}
	  	} 
	  },
	  error: function(error) {
	    alert("ERROR CODE: "+error.code+": "+getError(error.code));
	  }
	});
}

function inArray(pElement, pArray){
	for(var i = 0; i < pArray.length; i++){
		if(pArray[i]==pElement){
			return true;
		}
	}return false;
}

function addSM(){
	if(!SM){
		var motherDiv = document.getElementById("ContentTable");
		var e = document.createElement("tr");
		e.innerHTML = "<td><a href='scrummaster.html'><button>Scrum Master</button></a></td>";
		motherDiv.appendChild(e);
		SM=true;
	}
}

function addPO(){
	if(!PO){
		var motherDiv = document.getElementById("ContentTable");
		var e = document.createElement("tr");
		e.innerHTML = "<td><a href='productowner.html'><button>Product Owner</button></a></td>";
		motherDiv.appendChild(e);
		PO=true;
	}	
}

function addDEV(){
	if(!DEV){
		var motherDiv = document.getElementById("ContentTable");
		var e = document.createElement("tr");
		e.innerHTML = "<td><a href='developer.html'><button>Developer</button></a></td>";
		motherDiv.appendChild(e);
		DEV=true;
	}	
}

function addTEST(){
	if(!TEST){
		var motherDiv = document.getElementById("ContentTable");
		var e = document.createElement("tr");
		e.innerHTML = "<td><a href='tester.html'><button>Tester</button></a></td>";
		motherDiv.appendChild(e);
		TEST=true;
	}	
}

/*var motherDiv = document.getElementById("productowners");
		var element=document.createElement("option");
		element.setAttribute("value",pPersons[i].id);
		element.innerHTML= pPersons[i].get("name")+" "+pPersons[i].get("lastName");
	    motherDiv.appendChild(element);*/