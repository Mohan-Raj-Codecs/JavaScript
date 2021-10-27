const trig = "trig";
var oni = false;

function on(){
	if(oni==true){
        oni=false;
		document.getElementById(trig).innerHTML="Off";
		document.getElementById(trig).innerHTML='<img src="green.jpg">';
	}
	else{
		oni=true;
		document.getElementById(trig).innerHTML="On";
		document.getElementById(trig).innerHTML='<img src="red.jpg">';
	}
}