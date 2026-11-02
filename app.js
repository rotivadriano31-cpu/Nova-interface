
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // NOVA - SYSTEM FUNCTIONS
    // =====================================

    // RELÓGIO
    const clock = document.getElementById("clock");

    function updateClock() {
        if (!clock) return;

        clock.textContent = new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    updateClock();
    setInterval(updateClock, 1000);


    // =====================================
    // PAPEL DE PAREDE
    // =====================================

    const changeWallpaper = document.getElementById("changeWallpaper");
    const resetWallpaper = document.getElementById("resetWallpaper");
    const wallpaperInput = document.getElementById("wallpaperInput");
    const spaceBackground = document.querySelector(".space-background");

    // Verificar se os elementos existem
    if (changeWallpaper && wallpaperInput && spaceBackground) {

        // Aplicar imagem
        function applyWallpaper(image) {
            spaceBackground.style.backgroundImage = `
                linear-gradient(rgba(8,7,17,0.30), rgba(8,7,17,0.55)),
                url("${image}")
            `;

            spaceBackground.style.backgroundSize = "cover";
            spaceBackground.style.backgroundPosition = "center";
            spaceBackground.style.backgroundRepeat = "no-repeat";
        }

        // Recuperar imagem salva
        const savedWallpaper = localStorage.getItem("novaWallpaper");

        if (savedWallpaper) {
            applyWallpaper(savedWallpaper);
        }

        // Abrir seletor de arquivos
        changeWallpaper.addEventListener("click", () => {
            wallpaperInput.click();
        });

        // Carregar imagem selecionada
        wallpaperInput.addEventListener("change", (event) => {

            const file = event.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("Selecione uma imagem válida.");
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                try {
                    localStorage.setItem("novaWallpaper", reader.result);
                    applyWallpaper(reader.result);

                } catch (error) {
                    alert("Não foi possível salvar a imagem. Tente uma foto menor.");
                    console.error(error);
                }
            };

            reader.readAsDataURL(file);
        });

        // Restaurar fundo original
        if (resetWallpaper) {
            resetWallpaper.addEventListener("click", () => {

                localStorage.removeItem("novaWallpaper");

                spaceBackground.style.backgroundImage = "";
                spaceBackground.style.backgroundSize = "";
                spaceBackground.style.backgroundPosition = "";
                spaceBackground.style.backgroundRepeat = "";

                wallpaperInput.value = "";
            });
        }

    } else {
        console.error("NOVA: elementos do papel de parede não encontrados.");
    }


    // =====================================
    // NAVEGAÇÃO DOS APLICATIVOS
    // =====================================

    const appCards = document.querySelectorAll(".app-card");

    appCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            console.log("Aplicativo selecionado:", index + 1);
        });
    });

    console.log("NOVA carregado com sucesso!");

});
