function submit(){
    var t = document.getElementById("t1").value;
    alert("Submitted Value : "+t);
}
function submitr(){
    var r1 = document.getElementById("r1");
    var r2 = document.getElementById("r2");
    if(r1.checked==true)
        alert("Radio Button Pressed : "+r1.value);
    else if(r2.checked==true)
        alert("Radio Button Pressed : "+r2.value);
    else
        alert("Radio Button Not Pressed!");

}
function rese(){
    var r1 = document.getElementById("r1");
    var r2 = document.getElementById("r2");
    r1.checked=false;
    r2.checked=false;
}

function slider(){
    var m1 = document.getElementById("m1");
    var out = document.getElementById("bl");
    out.innerHTML=m1.value;

    m1.oninput = function(){
    out.innerHTML=m1.value;
    }
}

slider();