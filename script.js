// Cadastro e exibição dos chamados do HelpDesk
const formulario = document.getElementById("form-chamado");
const campoFuncionario = document.getElementById("funcionario");
const campoDescricao = document.getElementById("descricao");
const campoPrioridade = document.getElementById("prioridade");
const listaChamados = document.getElementById("lista-chamados");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");

let chamados = [];

function atualizarLista() {
  listaChamados.innerHTML = "";

  if (chamados.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "vazio";
    vazio.textContent = "Nenhum chamado cadastrado ainda.";
    listaChamados.appendChild(vazio);
  } else {
    chamados.forEach((chamado) => {
      const cartao = document.createElement("article");
      cartao.className = "chamado";

      const topo = document.createElement("div");
      topo.className = "chamado-topo";

      const nome = document.createElement("h3");
      nome.textContent = chamado.funcionario;

      const prioridade = document.createElement("span");
      prioridade.className = "prioridade " + classePrioridade(chamado.prioridade);
      prioridade.textContent = "Prioridade: " + chamado.prioridade;

      const descricao = document.createElement("p");
      descricao.textContent = "Problema: " + chamado.descricao;

      const data = document.createElement("p");
      data.className = "data";
      data.textContent = "Cadastrado em: " + chamado.data;

      topo.append(nome, prioridade);
      cartao.append(topo, descricao, data);
      listaChamados.appendChild(cartao);
    });
  }

  contador.textContent = chamados.length + (chamados.length === 1 ? " chamado" : " chamados");
}

function classePrioridade(prioridade) {
  if (prioridade === "Alta") return "alta";
  if (prioridade === "Média") return "media";
  return "baixa";
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const funcionario = campoFuncionario.value.trim();
  const descricao = campoDescricao.value.trim();
  const prioridade = campoPrioridade.value;

  if (!funcionario || !descricao) {
    mensagem.textContent = "Preencha todos os campos antes de cadastrar.";
    return;
  }

  const novoChamado = {
    funcionario,
    descricao,
    prioridade,
    data: new Date().toLocaleString("pt-BR")
  };

  chamados.unshift(novoChamado);
  atualizarLista();
  formulario.reset();
  campoPrioridade.value = "Média";
  mensagem.textContent = "Chamado cadastrado com sucesso!";
  campoFuncionario.focus();
});

atualizarLista();
