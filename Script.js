// Lista de diálogos combinados con sus respectivas imágenes
const dialogos = [
    {
        texto: "Hola Marian! Le hice una web y espero no se extrañe demasiado...",
        imagen: "Media/UwU.webp"
    },
    {
        texto: "No me bloquee por favor 😭😭 (Ya me ha pasado)",
        imagen: "Media/Angy.webp"
    },
    {
        texto: "Bueno el punto...",
        imagen: "Media/-..webp"
    },
    {
        texto: "La cosa es que soy un autista bien fracasado que le da penita todo",
        imagen: "Media/A.webp"
    },
    {
        texto: "No sé hablar con la gente y menos con una fémina",
        imagen: "Media/A.webp"
    },
    {
        texto: "El tema es que estos días he estado más antisocial de lo normal y no quisiera que piense mal de mí",
        imagen: "Media/-..webp"
    },
    {
        texto: "Y a ver es obvio que usted me gusta pero de la misma manera es obvio que me cuesta bastante mostrarlo",
        imagen: "Media/GatoUwU.png"
    },
    {
        texto: "Aunque es curioso, soy antisocial dependiendo de la situación, no sé es extraño y tampoco es algo que pueda controlar...",
        imagen: "Media/-..webp"
    },
    {
        texto: "Ah! Y hola Angie y Mario, sé que les van a enviar la web 👋👋",
        imagen: "Media/GatoDedo.png"
    },
    {
        texto: "No sé, deberíamos hablar",
        imagen: "Media/UwU.webp"
    },
    {
        texto: "Bro, realmente me es más fácil hacer una página web que hablarle a una mujer :-(",
        imagen: "Media/Light.jpg"
    },
    {
        texto: "No le meto mucho texto porque ésto es una manera impropia de hacerlo, supongo que me inventaré algo más",
        imagen: "Media/Angy.webp"
    },
    {
        texto: "Si es que no me ha bloqueado...",
        imagen: "Media/-..webp"
    },
    {
        texto: "...",
        imagen: "Media/-..webp"
    },
];

let indiceActual = 0;
let charIndex = 0;
let textoActual = "";
let escribiendo = false;
let timeoutId = null;

const textElement = document.getElementById("ddlc-dialogue-text");
const dialogueBox = document.getElementById("dialogue-box");
const spriteElement = document.getElementById("character-sprite");
const voiceSound = document.getElementById("voice-sound");

// Cargar la imagen y reiniciar el texto para la frase actual
function cargarNuevoDialogo() {
    spriteElement.src = dialogos[indiceActual].imagen;
    charIndex = 0;
    textoActual = "";
    textElement.textContent = "";

    // Truco para reiniciar la animación del rebote cada vez que cambia
    spriteElement.classList.remove("bounce-animation");
    void spriteElement.offsetWidth; // Fuerza al navegador a reiniciar el efecto
    spriteElement.classList.add("bounce-animation");

    escribirTexto();
}

// Efecto de máquina de escribir letra por letra y control de sonido
function escribirTexto() {
    const textoObjetivo = dialogos[indiceActual].texto;
    
    if (charIndex < textoObjetivo.length) {
        escribiendo = true;
        
        // Reproducir sonido de voz si no está sonando ya
        if (voiceSound.paused) {
            voiceSound.currentTime = 0; // Reiniciar audio al principio
            voiceSound.play().catch(e => console.log("Audio bloqueado por navegador:", e));
        }

        textoActual += textoObjetivo.charAt(charIndex);
        textElement.textContent = textoActual;
        charIndex++;
        timeoutId = setTimeout(escribirTexto, 35);
    } else {
        // Al terminar de escribir, pausar el sonido
        escribiendo = false;
        voiceSound.pause();
    }
}

// Manejar el avance al hacer clic
function siguienteFrase() {
    const textoObjetivo = dialogos[indiceActual].texto;
    
    if (escribiendo) {
        // Si hace clic antes de terminar, muestra el texto completo de golpe y detiene el sonido
        clearTimeout(timeoutId);
        textoActual = textoObjetivo;
        textElement.textContent = textoActual;
        escribiendo = false;
        voiceSound.pause();
    } else {
        // Pasa a la siguiente frase o reinicia al final
        indiceActual++;
        if (indiceActual < dialogos.length) {
            cargarNuevoDialogo();
        } else {
            indiceActual = 0;
            cargarNuevoDialogo();
        }
    }
}

// Escuchar clics en la caja de diálogo
dialogueBox.addEventListener("click", siguienteFrase);

// Iniciar el primer diálogo al cargar la página
window.onload = cargarNuevoDialogo;