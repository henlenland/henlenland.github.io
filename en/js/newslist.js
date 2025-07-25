
const lstnw = document.getElementById(`newslist`)

fetch(`/news.json`).then(data => data.json()).then(ls => {

    let subdate
    subdate = ls['latest']
    let date = subdate.substring(0, 2) + '.' + subdate.substring(2, 4) + '.' + subdate.substring(4, 6)
    lstnw.innerHTML += `<li><a href="/en/newsview?v=latest">News for ${date}</a></li>`

    for (let i=0;i<ls['other'].length;i++){
        subdate = ls['other'][i]
        date = subdate.substring(0, 2) + '.' + subdate.substring(2, 4) + '.' + subdate.substring(4, 6)
        lstnw.innerHTML += `<li><a href="/en/newsview?v=${ls['other'][i]}">News for ${date}</a></li>`
    }
})