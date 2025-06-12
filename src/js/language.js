const en = document.getElementById("en")
const ru = document.getElementById("ru")
const swit = document.getElementById("langch")

function chan(){
    changePage(this.value)
}

function changePage(value){
    en.className = (value === `en`) ? `` : `hidden`
    ru.className = (value === `ru`) ? `` : `hidden`
}

changePage(swit.value)
swit.onchange = chan