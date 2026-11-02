// =====================================
// NOVA - SYSTEM FUNCTIONS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // RELÓGIO
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


    // PAPEL DE PAREDE
    const botao = document.getElementById("changeWallpaper");
    const seletor = document.getElementById("wallpaperInput");
    const resetar = document.getElementById("resetWallpaper");
    const fundo = document.querySelector(".space-background");

    const STORAGE_KEY = "nova-wallpaper";

    // Recuperar imagem salva
    const imagemSalva = localStorage.getItem(STORAGE_KEY);

    if (imagemSalva && fundo) {
        fundo.style.backgroundImage = `url("${imagemSalva}")`;
        fundo.style.backgroundSize = "cover";
        fundo.style.backgroundPosition = "center";
    }

    // Abrir seletor de imagens
    if (botao && seletor) {
        botao.addEventListener("click", function () {
            seletor.click();
        });
    }

    // Aplicar imagem escolhida
    if (seletor && fundo) {
        seletor.addEventListener("change", function () {

            const arquivo = seletor.files[0];

            if (!arquivo) return;

            if (!arquivo.type.startsWith("image/")) {
                alert("Selecione um arquivo de imagem válido.");
                return;
            }

            // Evitar imagens muito grandes
            if (arquivo.size > 5 * 1024 * 1024) {
                alert("A imagem deve ter no máximo 5 MB.");
                seletor.value = "";
                return;
            }

            const leitor = new FileReader();

            leitor.onload = function (evento) {

                const imagem = evento.target.result;

                try {
                    localStorage.setItem(STORAGE_KEY, imagem);

                    fundo.style.backgroundImage = `url("${imagem}")`;
                    fundo.style.backgroundSize = "cover";
                    fundo.style.backgroundPosition = "center";

                } catch (erro) {
                    alert("Não foi possível salvar a imagem. Tente uma imagem menor.");
                }
            };

            leitor.readAsDataURL(arquivo);
        });
    }

    // Restaurar fundo original
    if (resetar && fundo) {
        resetar.addEventListener("click", function () {

            localStorage.removeItem(STORAGE_KEY);

            fundo.style.backgroundImage = "";

            seletor.value = "";

            alert("Papel de parede restaurado!");
        });
    }


    // APLICATIVOS
    const appCards = document.querySelectorAll(".app-card");

    appCards.forEach((card, index) => {
        card.addEventListener("click", function () {
            console.log("Aplicativo selecionado:", index + 1);
        });
    });

    console.log("NOVA: sistema iniciado com sucesso!");

});
