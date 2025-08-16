
async function newsv(path){
    let response = await fetch(`/src/newsvars/${path}.html`)
    let data = await response.text()
    return data
}

const main = document.getElementsByTagName('main')[0]

fetch(`/src/news.json`).then(data => data.json()).then(async (dt) => {

    for (const it of dt){

        const dat = Object.values(dt);

        const newsItems = await Promise.all(
            dat.map(async (it) => {
                const date = 
                    it.substring(0, 2) + '.' + 
                    it.substring(2, 4) + '.' + 
                    it.substring(4, 6);
                const content = await newsv(it);
                return { date, content };
            })
        );

        main.innerHTML = newsItems.map(item => `
            <h2>${item.date}</h2>
            ${item.content}
            <hr />
        `).join('');
    }
})