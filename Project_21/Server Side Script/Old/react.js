const Inp = "jaja";
const trig = "trig";
var oni = false;

function on(){
	if(oni==true){
        oni=false;
		document.getElementById(trig).innerHTML="Off";
		document.getElementById(Inp).value = '{"on":false}';
	}
	else{
		oni=true;
		document.getElementById(trig).innerHTML="On";
		document.getElementById(Inp).value = '{"on":true}';
	}
	console.log("On react");
}