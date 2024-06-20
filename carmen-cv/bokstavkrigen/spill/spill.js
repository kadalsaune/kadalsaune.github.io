const bokstaver = ["H", "A", "E", "I", "U","Y", "G", "S", "K", "B", "L","R" ]
//["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P","R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "Æ", "Ø", "AA"];
const ord = [
   ["H", "E", "I"],
   ["S", "K", "Y"],
   ["B", "R", "A"],
   ["G", "U", "L"]
];
const tellere = [0, 0, 0, 0];

const lyder = [];
for(let i = 0; i<bokstaver.length; i++){
    lyder[i] = new Audio("audio/"+bokstaver[i]+".mp3")
    lyder[i].volume=0.5;
}
const shot = new Audio("audio/Game-Shot.mp3");
shot.volume=0.5;
const jubel = new Audio("audio/jubel.mp3");
jubel.volume=0.5;

let alleLyder = lyder.concat(shot, jubel);
console.log(alleLyder);  

let volume = document.querySelector("#volume-control");
let lydIcon = document.querySelector("#lydIcon");
volume.addEventListener("change", function(e) {
   for(let i=0; i < alleLyder.length; i++)
   {alleLyder[i].volume = e.currentTarget.value;
} 

 if(e.currentTarget.value === "0"){
    lydIcon.className="fas fa-volume-mute";

   } else{
      lydIcon.className="fas fa-volume-up";
    
   }
})

window.onload=oppstart;

function oppstart() {
   
 
  let tl = new TimelineLite();  
  let fart = 20;
  let tid = 2;  
  let poeng = 0;
  let poengfaktor = 1;  
  let k=0;  
 
   
   let txtOrd = document.querySelector("#ord");
   txtOrd.innerHTML = "Ordliste:<br>";
       for(let i = 0; i<ord.length; i++){
                for(let j = 0; j<ord[i].length; j++){
                   txtOrd.innerHTML += ord[i][j];

                }
                txtOrd.innerHTML += "<br>";
                
             }

   let ctx = document.getElementById("kule").getContext("2d");

  ctx.beginPath(); 
  ctx.arc(10, 10, 10, 0, 2 * Math.PI);  
  

  let gradient = ctx.createRadialGradient(10, 10, 0, 10, 10, 16);
   gradient.addColorStop(0, 'yellow');
   gradient.addColorStop(1, 'red');

   ctx.fillStyle = gradient;
   ctx.fill();  
   ctx.closePath();  
  
  

  for (let j = 0; j < 3; j++) { 
     for (let i= 0; i < 8; i++) { 
        let bokstav = bokstaver[Math.floor(Math.random()*bokstaver.length)]; 
        let ny_invader = document.createElement("img");
        ny_invader.src = "img/bokstaver/"+bokstav+ "-01.png"; 
        ny_invader.style.height = "60px";
        ny_invader.style.width = "60px";
        ny_invader.style.top = String(100 + 80 * j) + "px";
        ny_invader.style.left = String(400 + 80 * i) + "px";
        ny_invader.style.position = "absolute";
        ny_invader.className="bevegelse";
        ny_invader.value=bokstav;
        console.log(ny_invader.value);  
        ny_invader.id="invader"+k; 
        k++; 
        document.body.appendChild(ny_invader);  
      }
   }
  
   for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
      tl.to(".bevegelse",tid, {left: "+=" + fart});
   }
   tl.to(".bevegelse", tid, {top: "+=30"});
    for (let j = 0; j < 12; j++) {
       
       tl.to(".bevegelse", tid, {left: "-=" + fart});
    }
   
     tl.to(".bevegelse", tid, {top: "+=30"});
  }
  document.onkeydown=flyttkanon;
   function flyttkanon(evt) {

      let tast = evt.code;
       if (tast === "ArrowLeft") {
          TweenMax.set(["#kule", "#spaceship"], {left: "-=40"});
          
       }
       else if (tast === "ArrowRight") {
          TweenMax.set(["#kule", "#spaceship"], {left: "+=40"});
          
       }
       else if (tast === "Space") {
          shot.play();
        
          TweenMax.to("#kule", 1, {top: -20});
          
          TweenMax.set("#kule", {top: "74vh"});
          
       }
    }
    let l = 0;
   
    requestAnimationFrame(kollisjon);
   
    function kollisjon() {
 
       let invaderInfo = document.getElementsByClassName("bevegelse");
      
       let antall = invaderInfo.length;
       
       let txtPoeng = document.getElementById("poeng");


       if (antall === 0) {
          window.location.reload();
          alert("Game over!! du fikk " + poeng + " poeng");  
       }
       
       if (antall < 20 && antall > 17) {
          tl.timeScale(4);
          poengfaktor = 2;
       }
       
       else if (antall < 17 && antall > 10) {
          tl.timeScale(8); 
          poengfaktor = 3; 
       }
    
       else if (antall < 9) {
          tl.timeScale(12); 
          poengfaktor = 6; 
       }
      
       for (let i = 0; i <= antall - 1; i++) {
          
          if (Draggable.hitTest("#kule","#"+invaderInfo[i].id,"95%")) {
            lyder[bokstaver.indexOf(invaderInfo[i].value)].play();
            console.log(lyder[i]);
            for(let j = 0; j<ord.length; j++){

            
               if(invaderInfo[i].value === ord[j][tellere[j]]){
                  console.log(invaderInfo[i].value + " ble truffet");
                  poeng += 10 * poengfaktor;
                  ord[j][tellere[j]] = "<s>"+ord[j][tellere[j]]+"</s>";

                  tellere[j]++;
                  if (tellere[j] === ord[j].length) {
                     tl.pause();
                     jubel.play();

                     
                   
            
          
         let winScreen = document.createElement("div");
            winScreen.innerHTML = "<br> <br>  <br> <span style='font-size: 60px;'> Gratulerer!</span> <br> <br>Du klarte det! <br> Du fikk " + poeng + " poeng! ";
            winScreen.style.color = "White";
            winScreen.style.fontFamily = "Monospace";
            winScreen.style.fontSize = "40px"; 
            winScreen.style.textAlign = "center";
            winScreen.style.height = "100vh"; 
            winScreen.style.width = "100%";
            winScreen.style.position = "absolute"; 
            winScreen.style.top="0px ";
            winScreen.style.backgroundImage ="radial-gradient(farthest-side at 50% 50%,white,rgb(199, 115, 185),rgb(98, 122, 189),rgb(65, 47, 97),black, black)";
            document.body.appendChild(winScreen); 
            let winBtn = document.createElement("button");
            winBtn.style.backgroundImage ="linear-gradient(white, rgba(191, 132, 242, 0.838))"
            winBtn.style.height = "100px"; 
            winBtn.style.width = "200px";
            winBtn.style.position = "absolute";  
            winBtn.style.top = "60vh"; 
            winBtn.style.left = "45%";
            winBtn.style.fontSize = "30px"
            winBtn.style.borderRadius = "30px";
            winBtn.innerHTML = "Start på nytt";
            winBtn.onclick = () => {
            window.location.reload();
            }
            document.body.appendChild(winBtn); 
                    }
                }else{
                    poeng -= 1;
                }
                }
           
            txtOrd.innerHTML = "Ordliste: <br>";
       for(let i = 0; i<ord.length; i++){
                for(let j = 0; j<ord[i].length; j++){
                   txtOrd.innerHTML += ord[i][j];

                }
                txtOrd.innerHTML += "<br>";
                
             }
            
             
            
             document.body.removeChild(invaderInfo[i]);
             TweenMax.set("#kule", {top: "74vh"});
             txtPoeng.innerHTML = poeng;

             
             


           
             break;
          }
       }
       requestAnimationFrame(kollisjon);
    }
} 



reStart.onclick = () => {
   window.location.reload();
};


  
