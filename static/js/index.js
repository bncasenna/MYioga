const modalOverlay = document.getElementById("modalOverlay");
const fecharModal = document.getElementById("fecharModal");
const tituloModal = document.getElementById("tituloModal");

const abrirLoginAluno = document.getElementById("abrirLoginAluno");
const abrirLoginProf = document.getElementById("abrirLoginProf");
const btnAluno = document.getElementById("btnAluno");
const btnProf = document.getElementById("btnProf");

function abrirModal(tipo) {
    modalOverlay.classList.add("ativo");

    if (tipo === "aluno") {
        tituloModal.textContent = "Login do Aluno";
    } else if (tipo === "professor") {
        tituloModal.textContent = "Login do Professor";
    }
}

function fecharModalFuncao() {
    modalOverlay.classList.remove("ativo");
}

abrirLoginAluno.addEventListener("click", () => abrirModal("aluno"));
abrirLoginProf.addEventListener("click", () => abrirModal("professor"));
btnAluno.addEventListener("click", () => abrirModal("aluno"));
btnProf.addEventListener("click", () => abrirModal("professor"));

fecharModal.addEventListener("click", fecharModalFuncao);

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        fecharModalFuncao();
    }
});