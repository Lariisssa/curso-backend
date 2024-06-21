console.log('teste 321 to de olho nesses console log perdido')

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.getElementById('nav-list');

    menuIcon.addEventListener('click', function () {
        console.log('click')
        var element = document.getElementById('nav-list')
        element.classList.toggle('show');
    });
});

var palavras_tentadas = [];
// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne a submissão padrão do formulário
        const formData = new FormData(form);

        // Log para verificar o conteúdo do FormData
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await fetch('/processar-tentativa', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        const palavra_tentada = result.palavra_tentada;
        const porcentagem_de_similaridade = result.porcentagem_de_similaridade;
        let classe_palavra_tentada = "";

        if (porcentagem_de_similaridade >= 75) {
            classe_palavra_tentada = "container_palavra_tentada_75";
        } else if (porcentagem_de_similaridade > 50 && porcentagem_de_similaridade < 75) {
            classe_palavra_tentada = "container_palavra_tentada_50";
        } else {
            classe_palavra_tentada = "container_palavra_tentada_0";
        }
        palavras_tentadas.push([palavra_tentada, result.porcentagem_de_similaridade]);
        // -------------------- escreva o codigo daqui pra baixo para ordenar as palavras que vao aparecer na tela da mais similar para menos similar ----------------------


        const html = `
            <div class="${classe_palavra_tentada}">
                <div class="palavra_tentada">${palavra_tentada}</div>
                <div class="similaridade">${porcentagem_de_similaridade}%</div>
            </div>
        `;
        document.getElementById('listaPalavras').innerHTML += html;
        console.log(palavras_tentadas)
    });
});

