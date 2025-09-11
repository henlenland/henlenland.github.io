
async function newsv(path){
    let response = await fetch(`/src/orders/${path}.html`)
    let data = await response.text()
    return data
}

const main = document.getElementsByTagName('main')[0]

fetch(`/src/orders/orders.json`).then(data => data.json()).then(async (dt) => {

    for (const it of dt){

        const dat = Object.values(dt);

        const newsItems = await Promise.all(
            dat.map(async (it) => {
                const numer = 
                    `Указ Хенленции №${it}`;
                const content = await newsv(it);
                return { numer, content };
            })
        );

        main.innerHTML = newsItems.map(item => `
            <h2>${item.numer}</h2>
            ${item.content}
            <hr />
        `).join('');
    }
})