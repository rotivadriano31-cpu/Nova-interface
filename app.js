
// =====================================
// NOVA - SYSTEM FUNCTIONS
// =====================================

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

// NAVEGAÇÃO POR TECLADO / CONTROLE
const appCards = document.querySelectorAll(".app-card");

appCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        console.log("Aplicativo selecionado:", index + 1);
    });
});
