// =======================
// 🎵 MUSICA
// =======================
const music = document.getElementById("music");

// aseguramos que pueda saltar al segundo correcto
music.addEventListener("loadedmetadata", ()=>{
    music.currentTime = 21; // 🔥 empieza en segundo 21
});

// =======================
// 🎁 REGALO
// =======================
document.getElementById("openGift").onclick = ()=>{

    // reproducir música desde el punto correcto
    music.play();

    gsap.to("#gift-screen",{
        opacity:0,
        duration:1,
        onComplete:()=>{
            document.getElementById("gift-screen").style.display="none";

            gsap.to("#story",{opacity:1});

            // ⏱ pequeño delay para que se sienta natural
            setTimeout(()=>{
                startStory();
            }, 1000);
        }
    });
};

// =======================
// 📸 CREAR ESCENAS DINÁMICAS
// =======================
const container = document.getElementById("dynamic-scenes");

let messages = [
    "Momentos que valen todo ✨",
    "Siempre con esa sonrisa",
    "Eres arte sin intentarlo 🎨",
    "Tu risa cambia todo",
    "Eres única 💖"
];

for(let i=1;i<=40;i++){

    let num = i.toString().padStart(2,'0');

    let scene = document.createElement("div");
    scene.classList.add("scene");

    let img = document.createElement("img");

    // soporte JPG y JPEG
    img.src = `assets/images/foto${num}.jpg`;
    img.onerror = ()=>{
        img.src = `assets/images/foto${num}.jpeg`;
    };

    let text = document.createElement("p");
    text.innerText = messages[i % messages.length];

    scene.appendChild(img);
    scene.appendChild(text);

    container.appendChild(scene);
}

// =======================
// 🎬 HISTORIA
// =======================
let scenes;
let current = 0;
let timer;
let duration = 3000;

// iniciar historia
function startStory(){
    scenes = document.querySelectorAll(".scene");
    showScene(0);
}

// mostrar escena
function showScene(index){

    scenes.forEach(s => s.classList.remove("active"));
    scenes[index].classList.add("active");

    animateBar();

    // 💖 escena final
    if(scenes[index].classList.contains("final")){
        drawHeart();
        startTyping();
        confetti({
            particleCount:200,
            spread:120
        });
    }
}

// =======================
// ⏱ BARRA PROGRESO
// =======================
function animateBar(){

    const progress = document.getElementById("progress");

    progress.innerHTML = `<div class="bar"></div>`;
    const bar = document.querySelector(".bar");

    setTimeout(()=>{
        bar.style.width = "100%";
    },50);

    clearTimeout(timer);
    timer = setTimeout(nextScene, duration);
}

// =======================
// ➡️ SIGUIENTE
// =======================
function nextScene(){
    current++;
    if(current >= scenes.length) return;
    showScene(current);
}

// =======================
// 👆 TAP IZQ / DER
// =======================
document.addEventListener("click",(e)=>{

    if(!scenes) return;

    if(e.clientX < window.innerWidth / 2){
        current = Math.max(0, current - 1);
    }else{
        current = Math.min(scenes.length - 1, current + 1);
    }

    showScene(current);
});

// =======================
// 💖 CORAZÓN
// =======================
function drawHeart(){
    gsap.to(".heart",{
        strokeDashoffset:0,
        duration:2
    });
}

// =======================
// ✍️ TEXTO FINAL
// =======================
const text = `Te quiero hermanita 💖
Siempre estaremos juntos.

Eres mi orgullo.

Y aunque crezcas…
no tan rápido por favor 🥺

Te ama tu hermano ❤️`;

let i = 0;

function startTyping(){

    const target = document.getElementById("final-text");

    if(target.innerHTML !== "") return;

    function type(){
        if(i < text.length){
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }

    type();
}