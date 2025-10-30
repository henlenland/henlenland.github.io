const main = document.getElementsByTagName('main')[0]
let s = `<h1>Посмотрите эти статьи:</h1>`
fetch('/wiki/articles.json').then(data => data.json()).then(text => {
    text.forEach(r => {
        s += `<a href="/wiki/${r}.html">Статья о ${r}`;
    });
});
main.innerHTML = s;