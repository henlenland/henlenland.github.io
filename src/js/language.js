const en = document.getElementById("en")
const ru = document.getElementById("ru")
const hl = document.getElementById("hl")
const swit = document.getElementById("langch")

swit.onchange = function (){
    en.className = (this.value === `en`) ? `` : `hidden`
    ru.className = (this.value === `ru`) ? `` : `hidden`
    hl.className = (this.value === `hl`) ? `` : `hidden`
}