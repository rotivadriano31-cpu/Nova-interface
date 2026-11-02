
/* =====================================
   NOVA - SYSTEM FUNCTIONS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // RELÓGIO
    // =====================================

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


    // =====================================
    // PAPEL DE PAREDE
    // =====================================

    const botao = document.getElementById("changeWallpaper");
    const seletor = document.getElementById("wallpaperInput");
    const resetar = document.getElementById("resetWallpaper");
    const fundo = document.querySelector(".space-background");

    const STORAGE_KEY = "nova-wallpaper";

    function aplicarImagem(imagem) {
        if (!fundo) return;

        fundo.style.backgroundImage = `url("${imagem}")`;
        fundo.style.backgroundSize = "cover";
        fundo.style.backgroundPosition = "center";
        fundo.style.backgroundRepeat = "no-repeat";
    }

    // Recuperar imagem salva
    try {
        const imagemSalva = localStorage.getItem(STORAGE_KEY);

        if (imagemSalva) {
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

            try {
                localStorage.removeItem(STORAGE_KEY);

                if (fundo) {
                    fundo.style.backgroundImage = "";
                }

                if (seletor) {
                    seletor.value = "";
                }

                console.log("NOVA: fundo original restaurado!");

            } catch (erro) {
                console.error("Erro ao restaurar fundo:", erro);
            }
        });
    }


    // =====================================
    // APLICATIVOS FAVORITOS
    // =====================================

    const appCards = Array.from(
        document.querySelectorAll(".app-card")
    );

    let aplicativoSelecionado = 0;

    function destacarAplicativo(indice) {

        if (appCards.length === 0) return;

        aplicativoSelecionado =
            (indice + appCards.length) % appCards.length;

        appCards.forEach(function (card, index) {

            card.classList.toggle(
                "selected",
                index === aplicativoSelecionado
            );
        });

        appCards[aplicativoSelecionado].focus();
    }

    // Seleção por foco e clique
    appCards.forEach(function (card, index) {

        card.addEventListener("focus", function () {

            aplicativoSelecionado = index;

            appCards.forEach(function (item, itemIndex) {
                item.classList.toggle(
                    "selected",
                    itemIndex === index
                );
            });
        });

        card.addEventListener("click", function () {
            destacarAplicativo(index);

            console.log(
                "NOVA: aplicativo selecionado:",
                card.textContent.trim()
            );
        });
    });


    // =====================================
    // NAVEGAÇÃO POR TECLADO / CONTROLE
    // =====================================

    document.addEventListener("keydown", function (evento) {

        if (appCards.length === 0) return;

        const ativo = document.activeElement;
        const indiceAtual = appCards.indexOf(ativo);

        if (evento.key === "ArrowRight") {
            evento.preventDefault();

            destacarAplicativo(
                indiceAtual >= 0
                    ? indiceAtual + 1
                    : aplicativoSelecionado + 1
            );
        }

        else if (evento.key === "ArrowLeft") {
            evento.preventDefault();

            destacarAplicativo(
                indiceAtual >= 0
                    ? indiceAtual - 1
                    : aplicativoSelecionado - 1
            );
        }

        else if (evento.key === "ArrowDown") {
            evento.preventDefault();

            destacarAplicativo(
                indiceAtual >= 0
                    ? indiceAtual + 2
                    : aplicativoSelecionado + 2
            );
        }

        else if (evento.key === "ArrowUp") {
            evento.preventDefault();

            destacarAplicativo(
                indiceAtual >= 0
                    ? indiceAtual - 2
                    : aplicativoSelecionado - 2
            );
        }

        else if (
            evento.key === "Enter" ||
            evento.key === " "
        ) {

            if (indiceAtual >= 0) {
                evento.preventDefault();
                appCards[indiceAtual].click();
            }
        }
    });


    // =====================================
    // INICIALIZAÇÃO
    // =====================================

    console.log("NOVA: sistema iniciado com sucesso!");

});
