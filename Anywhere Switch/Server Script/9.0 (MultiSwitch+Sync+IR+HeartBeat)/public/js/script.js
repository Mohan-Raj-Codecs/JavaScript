//Nippy#2677 START
const url = "http://52.66.239.139:81/api/test";
const data_url = "http://52.66.239.139:81/api/data";
const update_frequency = 0.5;

var loaded_offline=false;
var isOnline=true;
//class="box2d"

function reload(){
    var btns =  document.getElementsByTagName("button");
    for(let i=0;i<btns.length;i++){
        if(btns[i].className.search("anti-gravity")!=-1) continue;
        //btns[i].style.display="block";
        btns[i].className=btns[i].className.replace(" box2d","");
        btns[i].disabled=false;
    }
    document.getElementById("offline-gif").style.display="none";
    init();
    //window.location.reload();
}

function load_offline(){
    var btns =  document.getElementsByTagName("button");
    for(let i=0;i<btns.length;i++){
        if(btns[i].className.search("anti-gravity")!=-1){ continue; }
        //btns[i].style.display="none";
        btns[i].className+=" box2d";
        btns[i].disabled=true;
    } 
    document.getElementById("offline-gif").style.display="inline";
    init();
}

var sync_switch = async () => {
  try{
    var datum = await fetch(data_url);
    var datums = await datum.json();

    console.log(datums);

    let j=0;
    for(let i=0;i<Object.keys(datums).length;i++){
      var ele = document.getElementById(Object.keys(datums)[j]);
      if(ele.id=="on0"){
        ele.innerHTML = datums[Object.keys(datums)[j]] ? '<img src="./images/greenmax.jpg">' : '<img src="./images/redmax.jpg">';
        ele.value = datums[Object.keys(datums)[j]];
      }
      else{
        ele.innerHTML = datums[Object.keys(datums)[j]] ? '<img src="./images/green.jpg">' : '<img src="./images/red.jpg">';
        ele.value = datums[Object.keys(datums)[j]];
      }
      j++;
    }
  }
  catch(err){
   console.log("Errrrrrrr in Fetching On Data(Check API)");
  }
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
    sync_switch();
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
}, update_frequency*1000);
//Nippy#2677 END