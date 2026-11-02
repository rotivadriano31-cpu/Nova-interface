
// =====================================
// NOVA - SYSTEM FUNCTIONS
// =====================================


// =====================================
// RELÓGIO
// =====================================

function updateClock() {
    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

updateClock();
setInterval(updateClock, 1000);


// =====================================
// PAPEL DE PAREDE PERSONALIZADO
// =====================================

const wallpaperInput = document.getElementById("wallpaperInput");
const changeWallpaper = document.getElementById("changeWallpaper");
const resetWallpaper = document.getElementById("resetWallpaper");
const spaceBackground = document.querySelector(".space-background");

// Recuperar papel de parede salvo
const savedWallpaper = localStorage.getItem("novaWallpaper");

function applyWallpaper(image) {
    if (!spaceBackground) return;

    spaceBackground.style.backgroundImage = `
        linear-gradient(rgba(8, 7, 17, 0.30), rgba(8, 7, 17, 0.55)),
        url("${image}")
    `;

    spaceBackground.style.backgroundSize = "cover";
    spaceBackground.style.backgroundPosition = "center";
    spaceBackground.style.backgroundRepeat = "no-repeat";
}

// Aplicar imagem salva ao abrir o NOVA
if (savedWallpaper) {
    applyWallpaper(savedWallpaper);
}

// Abrir seletor de imagens
if (changeWallpaper && wallpaperInput) {
    changeWallpaper.addEventListener("click", () => {
        wallpaperInput.click();
    });
}

// Selecionar nova imagem
if (wallpaperInput) {
    wallpaperInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Selecione um arquivo de imagem válido.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            try {
                localStorage.setItem("novaWallpaper", reader.result);
                applyWallpaper(reader.result);

            } catch (error) {
                alert(
                    "Não foi possível salvar a imagem. " +
                    "Tente utilizar uma foto menor."
                );
            }
        };

        reader.readAsDataURL(file);
    });
}

// Restaurar fundo espacial original
if (resetWallpaper) {
    resetWallpaper.addEventListener("click", () => {

        localStorage.removeItem("novaWallpaper");

        if (spaceBackground) {
            spaceBackground.style.backgroundImage = "";
            spaceBackground.style.backgroundSize = "";
            spaceBackground.style.backgroundPosition = "";
            spaceBackground.style.backgroundRepeat = "";
        }

        if (wallpaperInput) {
            wallpaperInput.value = "";
        }
    });
}


// =====================================
// NAVEGAÇÃO POR TECLADO / CONTROLE
// =====================================

const appCards = document.querySelectorAll(".app-card");

appCards.forEach((card, index) => {

    card.addEventListener("click", () => {
        console.log("Aplicativo selecionado:", index + 1);
    });

});
