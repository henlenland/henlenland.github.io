const main = document.getElementsByTagName('main')[0]


fetch('/wiki/articles.json').then(response => response.json()).then(json => {
    let s = `<h2>Посмотрите эти статьи:</h2>`;
    let keys = Object.keys(json)
    keys.forEach(key => {
        s += `<h3><li>Статья <a href="/wiki/${key}">&laquo;${json[key]}&raquo;</a></li></h3>`;
    });
    main.innerHTML += s;
}).catch(a => {
    s = `error ${a}`;
    main.innerHTML += s;
});
