
const lstnw = document.getElementById(`newslist`)

fetch(`/news/app.json`).then(data => data.json()).then(ls => {
    lstnw.innerHTML += `<li><a href="/newsview?v=latest">Новости за ${ls['newest']}</a></li>`
    for (let i=0;i<ls['other'].length;i++){
        lstnw.innerHTML += `<li><a href="/newsview?v=${ls['other'][i]}">Новости за ${ls['other'][i]}</a></li>`
    }
})