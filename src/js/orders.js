
async function orderv(){
    let response = await fetch(`/src/orders.html`)
    let data = await response.text()
    return data
}


orderv().then(function(value){
    const main = document.getElementsByTagName('main')[0]
    main.innerHTML += `
        ${value}
    `
});