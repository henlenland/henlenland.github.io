const en = document.getElementById("en")
const ru = document.getElementById("ru")
const hl = document.getElementById("hl")
const swit = document.getElementById("langch")

function chan(){
    changePage(this.value)
}

function changePage(value){
    en.className = (value === `en`) ? `` : `hidden`
    ru.className = (value === `ru`) ? `` : `hidden`
    hl.className = (value === `hl`) ? `` : `hidden`
}

changePage(swit.value)
swit.onchange = chan