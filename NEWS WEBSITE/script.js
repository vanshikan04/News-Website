const API_KEY = "ac687981aca348f8a5c3aecac11b5769";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchnews("India"));

function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const response=await fetch(`${url}${query}&from=2023-07-01&apiKey=${API_KEY}`);
    const data=await response.json();
    console.log(data);
    binddata(data.articles);
}

function binddata(articles){
    const cardscontainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");
    cardscontainer.innerHTML="";
    articles.forEach(article =>{
        if(!article.urlToImage)
        return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        filldata(cardClone,article);
        cardscontainer.appendChild(cardClone);
        });
}
function filldata(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    }
    );
}
let currselectnav=null;
function onNavItemClick(id){
    fetchnews(id);
    const navitem=document.getElementById(id);
    currselectnav?.classList.remove("active");
    currselectnav=navitem;
    currselectnav.classList.add("active");
}

const searchbutton=document.getElementById("search-button");
const searchtext=document.getElementById("search-text");

searchbutton.addEventListener("click",()=>{
    const query=searchtext.value;
    if(!query)
    return;
    fetchnews(query);
    currselectnav?.classList.remove("active");
    currselectnav=null;
})
