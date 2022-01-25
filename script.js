let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d1-right')
let numeros = document.querySelector('.d1-3')

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

//Inicia a Etapa atual.
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

//Procura pelo candidato através do número digitado, se houver, mostra seus dados na tela.
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d1-imagem pequeno"><img src="imagem/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d1-imagem"><img src="imagem/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
//Anular o voto se não houver candidato com o número digitado.
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

//Verifica se pode usar o teclado.
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        (new Audio('audio/se1.mp3')).play()
    }
}

//Vota em Branco
function branco() {
    numero ='';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'; 
    lateral.innerHTML = ''; 
    
    (new Audio('audio/se1.mp3')).play()
}

//Reinicia a Etapa atual.
function corrige() {
    comecarEtapa();
    (new Audio('audio/se2.mp3')).play()
}

//Confirma o numero selecionado

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if (numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa:etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
    (new Audio('audio/se3.mp3')).play()
};

comecarEtapa() 