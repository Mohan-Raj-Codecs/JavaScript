const url = "https://jsonplaceholder.typicode.com/todos/1";
var loaded_offline=false;
var isOnline=true;
//class="box2d"

function reload(){
    var btns =  document.getElementsByTagName("button");
    for(let i=0;i<btns.length;i++){
        //btns[i].style.display="block";
        btns[i].className="";
        btns[i].disabled=false;
    }
    document.getElementById("offline-gif").style.display="none";
    init();
    //window.location.reload();
}

function load_offline(){
    var btns =  document.getElementsByTagName("button");
    for(let i=0;i<btns.length;i++){
        //btns[i].style.display="none";
        btns[i].className="box2d";
        btns[i].disabled=true;
    }
    document.getElementById("offline-gif").style.display="inline";
    init();
}

var checkOnlineStatus = async () => {
    try{
        const online = await fetch(url);
        return online.status >= 200 && online.status < 300 ;
    }catch(err){
        return false;       
    }
}

setInterval(async () =>{
    isOnline = await checkOnlineStatus();
    console.log(isOnline);
    if(!isOnline){
        if(!loaded_offline){
          load_offline();
        }
        loaded_offline=true;
    }
    else{
        if(loaded_offline){
            reload();
            loaded_offline=false;
            window.top.location.reload(true);
        }
    }
}, 3000);
