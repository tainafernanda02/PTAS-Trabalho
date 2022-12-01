//banco de dados
let url ="https://amused-vestments-calf.cyclic.app";
const main = document.querySelector('main');

window.addEventListener('load', e => {
    postNews();
    "use strict";//restrito a funcionar em navegadores comES6 >
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
}); 

async function postNews() {
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = data.map(createArticle).join('\n');
}

function createArticle(article){
    return `
           <article class="article">
                    <img src="" class="image" />
                    <h2>${article.nome}</h2>
                    <p>${article.descricao}</p>
                    <p>${article.preco}</p>
                </a>
           </article>
    `
}