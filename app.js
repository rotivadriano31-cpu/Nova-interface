
document.addEventListener("DOMContentLoaded", function () {

    console.log("NOVA: JavaScript carregado!");

    const botao = document.getElementById("changeWallpaper");
    const seletor = document.getElementById("wallpaperInput");

    if (!botao) {
        alert("ERRO: botão Alterar fundo não encontrado!");
        return;
    }

    if (!seletor) {
        alert("ERRO: seletor de imagens não encontrado!");
        return;
    }

    botao.addEventListener("click", function () {

        alert("O botão do NOVA está funcionando!");

        seletor.click();

    });

});
