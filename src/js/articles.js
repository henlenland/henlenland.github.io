const main = document.getElementsByTagName('main')[0]


fetch('/wiki/articles.json').then(response => response.json()).then(json => {
    let s = `<h1>Посмотрите эти статьи:</h1>`;
    json.forEach(r => {
        s += `<h3><li><a href="/wiki/${r}">Статья &laquo;${r}&raquo;</a></li></h3>`;
    });
    main.innerHTML = s;
}).catch(a => {
    s = "error";
});
