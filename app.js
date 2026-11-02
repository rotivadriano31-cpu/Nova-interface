
// =====================================
// NOVA - SYSTEM FUNCTIONS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // RELÓGIO
    function updateClock() {
        const clock = document.getElementById("clock");
        if (!clock) return;

        clock.textContent = new Date().toLocaleTimeString("pt-BR", {
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

    // Aplicar imagem
    function aplicarImagem(imagem) {
        fundo.style.backgroundImage = `url("${imagem}")`;
        fundo.style.backgroundSize = "cover";
        fundo.style.backgroundPosition = "center";
        fundo.style.backgroundRepeat = "no-repeat";
    }

    // Recuperar imagem salva
    try {
        const imagemSalva = localStorage.getItem(STORAGE_KEY);

        if (imagemSalva && fundo) {
            aplicarImagem(imagemSalva);
        }
    } catch (erro) {
        console.error("Erro ao recuperar papel de parede:", erro);
    }

    // Abrir seletor
    if (botao && seletor) {
        botao.addEventListener("click", function () {
            seletor.click();
        });
    }

    // Receber e salvar imagem
    if (seletor && fundo) {
        seletor.addEventListener("change", function () {

            const arquivo = seletor.files[0];
            if (!arquivo) return;

            if (!arquivo.type.startsWith("image/")) {
                alert("Selecione uma imagem válida.");
                return;
            }

            if (arquivo.size > 5 * 1024 * 1024) {
                alert("Escolha uma imagem de até 5 MB.");
                seletor.value = "";
                return;
            }

            const leitor = new FileReader();

            leitor.onload = function (evento) {
                const imagem = evento.target.result;

                try {
                    aplicarImagem(imagem);
                    localStorage.setItem(STORAGE_KEY, imagem);
                    console.log("NOVA: papel de parede atualizado!");
                } catch (erro) {
                    console.error("Erro ao salvar imagem:", erro);
                    alert("Não foi possível salvar a imagem.");
                }
            };

            leitor.onerror = function () {
                alert("Não foi possível ler a imagem.");
            };

            leitor.readAsDataURL(arquivo);
        });
    }

    // Restaurar fundo original
    if (resetar) {
        resetar.addEventListener("click", function () {
            localStorage.removeItem(STORAGE_KEY);

            if (fundo) {
                fundo.style.backgroundImage = "";
            }

            if (seletor) {
                seletor.value = "";
            }

            alert("Papel de parede restaurado!");
        });
    }

    // APLICATIVOS
    document.querySelectorAll(".app-card").forEach(function (card, index) {
        card.addEventListener("click", function () {
            console.log("Aplicativo selecionado:", index + 1);
        });
    });

    console.log("NOVA: sistema iniciado com sucesso!");
});
