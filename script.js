// --- 1. CLASSES (DEFINIÇÃO) ---

// CLASSE PAI: Entidade (HERANÇA)
class Entidade {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    pararAnimacao() {
        if (this.elemento) {
            this.elemento.style.animation = "none";
        }
    }
}

// CLASSE FILHA: Sonic (HERANÇA E ENCAPSULAMENTO)
class Sonic extends Entidade {
    pular() {
        // Verifica se o elemento existe e se não está no meio de um pulo
        if (this.elemento && !this.elemento.classList.contains("jump")) {
            this.elemento.classList.add("jump");
            this.elemento.src = "./Arquivos/Sonic-Jump.gif";

            setTimeout(() => {
                this.elemento.classList.remove("jump");
                this.elemento.src = "./Arquivos/Sonic.gif";
            }, 900);
        }
    }

    // SOBRESCRITA (POLIMORFISMO)
    morrer() {
        this.pararAnimacao();
        this.elemento.src = "./Arquivos/Sonic-Loss.gif";
        this.elemento.style.width = "220px";
    }
}

// CLASSE FILHA: Eggman (HERANÇA)
class Eggman extends Entidade {
    // SOBRESCRITA (POLIMORFISMO)
    parar(posicao) {
        this.pararAnimacao();
        this.elemento.style.left = `${posicao}px`;
    }
}

// --- 2. NAMESPACE (ORGANIZAÇÃO) ---
// Agora guardamos as instâncias dentro do objeto Jogo
const Jogo = {
    player: new Sonic(".sonic"),
    inimigo: new Eggman(".eggman"),
    cenario: document.querySelector(".fundo"),
    musica: document.getElementById("musicaFundo")
};

// --- 3. LOGICA E CONTROLES ---

const loop = setInterval(() => {
    const eggmanPosition = Jogo.inimigo.elemento.offsetLeft;
    const sonicPosition = +window.getComputedStyle(Jogo.player.elemento).bottom.replace("px", "");

    if (eggmanPosition < 110 && eggmanPosition > 0 && sonicPosition < 220) {
        Jogo.inimigo.parar(eggmanPosition);
        Jogo.player.morrer();

        Jogo.cenario.src = "./Arquivos/GameoverSMB-1.png";
        Jogo.cenario.style.width = "100%";
        
        clearInterval(loop);
    }
}, 10);

// CONTROLES
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
        Jogo.player.pular();
    }
});

document.addEventListener("click", () => {
    Jogo.player.pular();
});