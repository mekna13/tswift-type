//Button event listener to start the game

document.getElementById("start").addEventListener('click',function(){
  document.querySelector('.bg-modal').style.display= "none";
});

//array of song titles 

var folklore = ["The 1",
"Cardigan",
"The Last Great American Dynasty",
"Exile",
"My Tears Ricochet",
"Mirrorball",
"Seven",
"August",
"This is Me Trying",
"Illicit Affairs",
"Invisible String",
"Mad Woman",
"Epiphany",
"Betty",
"Peace",
"Hoax",
"The Lakes"
]


//api registered from musix match 

  var api_key = "&apikey=1b7821de9a65a9d63d54f48adb3bf6e9";
  var tS_url = "&q_artist=Taylor%20Swift&quorum_factor=1&apikey=1b7821de9a65a9d63d54f48adb3bf6e9";
  var tS_url_root = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=";

  function chooseSong(){
    songnumber = Math.floor(Math.random() * 18);     // returns a random integer from 0 to 9
    songtitle = folklore[songnumber].split(' ').join('%20');
    document.getElementById("songname").innerHTML = folklore[songnumber];
    return songtitle;
  }

  // url sent with song title

  function findTrackId(){
    var tS_url = "&q_artist=Taylor%20Swift&quorum_factor=1&apikey=1b7821de9a65a9d63d54f48adb3bf6e9";
    var tS_url_root = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=";
  
    var chosenSong = chooseSong();
    var tS_url_root = tS_url_root.concat(chosenSong,tS_url);
    let myScript = document.createElement("script");
    myScript.setAttribute("src", tS_url_root);
    document.body.appendChild(myScript);

  }

  findTrackId();

  var t_id;
  function callback(myObj) { 
  
  t_id = myObj.message.body.track_list[0].track.track_id.toString();
  

  var url_2_root = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback2&track_id=";

  var url_2_root= url_2_root.concat(t_id,api_key);
  let myScript2 = document.createElement("script");
  myScript2.setAttribute("src",url_2_root);
  document.body.appendChild(myScript2);
  
  }

  var lyrics;

function callback2(myObj){
    
    lyrics = myObj.message.body.lyrics.lyrics_body
    lyrics2 = lyrics.split("\n");
    counter=0;
    countChar=0;
    shiftKey=0;
    callTyping =0;
    for (i = 0; i < (lyrics2.length-3) ; i++) {
      for (j=0;j<(lyrics2[i].length);j++){
        document.getElementById('showlyrics').innerHTML += '<span>' + lyrics2[i][j].toLowerCase() + '<span>';
   
      } 
      document.getElementById('showlyrics').innerHTML += '<br>';

      
    }
    
    var arrOfObjs = document.getElementsByTagName('span');
    function typing(e){
        callTyping++;
        if(callTyping>arrOfObjs.length/2){
          document.querySelector('.bg-modal2').style.display= "flex";
          document.querySelector('#score').innerHTML=((counter/(arrOfObjs.length/2))*100).toFixed(2)+"%";
         
        }
        console.log("call typing: ",callTyping);
        if(e.which==13){
          return;
        }
        else if(e.which==16){
          shiftKey=1;
          return;
        }
        else if(e.which==222){
          typed="'";
        }
        else if(e.which==188){
          typed=",";
        }
        else if(e.which==189){
          typed="-";
        }
        else if(e.which==190){
          typed=".";
        }
        else{
          typed = String.fromCharCode(e.which);
        }
        if(shiftKey==1){
          if(e.which==222){
            typed='"';
          }
          else if(e.which==191){
            typed='?';
          }
          shiftKey=0;
        }
        //console.log("keycode = ",e.which);
        //console.log("typed ="+typed);
        for(i=0;i<arrOfObjs.length;i++){
            if((arrOfObjs[i].style.color == "red")||(arrOfObjs[i].style.color == "green")){
                i++; 
                continue;
            }
            if(shiftKey == 0){
              typed.toLowerCase();
            }
            else{
              shiftKey=0;
            }
            if(typed.toLowerCase()== arrOfObjs[i].textContent){ 
                arrOfObjs[i].style.color = "green";
                i++;
                counter++;
                break;
            }
            else{
                arrOfObjs[i].style.color = "red";
                i++;
                break;
            }
        }
    }       

    document.addEventListener("keydown", typing, false);

    
} 




  
 

