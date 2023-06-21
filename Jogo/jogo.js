const numeroDeMoedas = 30
let pontos = 0
const tempoInicial = 10
let tempo = 10
let timer = null

let nome = prompt("Qual seu nome?")

// Função para criar um elemento HTML e adicionar ao container
function criarElemento(name, pontucao) {
    const container = document.getElementById('container');
    const nome = document.createElement('h4');
    const pontuacao = document.createElement('h4');

    nome.textContent = name;
    pontuacao.textContent = pontucao;

    container.appendChild(nome);
    container.appendChild(pontuacao);
}


fetch('http://localhost:8080/score')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        // Processar os dados e exibir a lista no HTML
        console.log(data);

        const jogadores = data;

        jogadores.forEach(jogador => {
            criarElemento(jogador.nome, jogador.pontuacao);
        });
    })
    .catch(error => {
        console.error(error);
    });

function iniciaJogo() {
    pontos = 0
    tempo = tempoInicial
    let tela = document.getElementById("tela")
    tela.innerHTML = ""

    fetch('http://localhost:8080/score')

        .then(response => {

            if (!response.ok) {

                throw new Error('Erro na requisição');

            }

            return response.json();

        })

        .then(data => {

            console.log(data);

            const jogadores = data;

            jogadores.forEach(jogador => {

                criarElemento(jogador.name, jogador.pontucao);

            });

        })

        .catch(error => {

            console.error(error);

        });

    for (let i = 0; i < numeroDeMoedas; ++i) {
        let moeda = document.createElement("img")
        moeda.src = "bitcoin.jpg"
        moeda.id = "m" + i
        moeda.onclick = function () {
            pegaMoeda(this)
        }
        tela.appendChild(moeda)
    }

    timer = setInterval(contaTempo, 1000)
}

function mostraNomes() {
    let mostraNomes = document.getElementById("nomes")
    nome.innerText = mostraNomes
}

function pegaMoeda(moeda) {
    if (tempo <= 0) return

    moeda.onclick = null
    moeda.src = "cash.jpg"
    ++pontos

    let contadorPontos = document.getElementById("pontos")
    contadorPontos.innerText = pontos
}

function contaTempo() {
    --tempo
    let contadorPontos = document.getElementById("tempo")
    contadorPontos.innerText = tempo + "s"

    if (tempo <= 0) {
        clearInterval(timer)
        alert("Parabéns, você obteve uma pontuação de " + pontos + " pontos!")

        // Dados a serem enviados pela solicitação POST
        let pontuacao = {
            pontuacao: pontos,
            nome: nome
        }

        fetch('http://localhost:8080/score', {
            method: "POST",
            body: JSON.stringify(pontuacao),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }
}