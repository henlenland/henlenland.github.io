
function newsv(path){
    fetch(`/ru/news/${path}.html`)
    .then(result => result.text())
    .then(data => {
        return data
    }).catch(err => {return `error ${err}`})
}

const main = document.getElementsByTagName('main')[0]

fetch(`/news.json`).then(data => data.json()).then(ls => {
    for (let i = 0; i < ls.length; i++){

        let it = ls[i]
        let date = 
            it.substring(0, 2) + '.' + 
            it.substring(2, 4) + '.' + 
            it.substring(4, 6)

        main.innerHTML += `
        <h2>${date}</h1>
        ${newsv(it)}
        <hr />
        `
    }
})