const trig = "trig";
var oni = false;

/*function synch(){
	document.getElementById("")
	document.getElementById("synch").value=state;
}*/

function on(){
	if(oni==true){
        oni=false;
		//document.getElementById(trig).innerHTML="Off";
		document.getElementById("trig").innerHTML='<img src="green.jpg">';
	}
	else{
		oni=true;
		//document.getElementById(trig).innerHTML="On";
		document.getElementById("trig").innerHTML='<img src="red.jpg">';
	}
}