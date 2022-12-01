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
     <img src="${article.imagem}" class="card-img-top" alt="..." />
           <div class="card-body">
             <h5 class="card-title">${article.nome}</h5>
             <p class="card-text"> R$ ${article.preco}</p>
             <p class="card-text">  ${article.descricao}</p>
             <a href="#" class="btn btn-primary">Comprar</a>
           </div>
         </div>    
           </article>
    `
}