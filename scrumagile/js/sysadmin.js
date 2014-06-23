function sysadminpage(){
	document.getElementById("UserNameSpan").innerHTML = localStorage.getItem("Name")+" "+localStorage.getItem("LastName");
	document.getElementById("UserRoleSpan").innerHTML = "<b><i>Sysadmin</i></b>";
}

function crearSession(){
	localStorage.clear();
}