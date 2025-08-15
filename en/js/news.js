
async function newsv(path){
    let response = await fetch(`/en/newsvars/${path}.html`)
    let data = await response.text()
    return data
}

const main = document.getElementsByTagName('main')[0]

fetch(`/news.json`).then(data => data.json()).then(dat => {
    for (const it of dat){
        let date = 
            it.substring(0, 2) + '.' + 
            it.substring(2, 4) + '.' + 
            it.substring(4, 6)

        newsv(it).then(data => {
            main.innerHTML += `
            <h2>${date}</h1>
            ${data}
            <hr />
            `
        })
    }
})