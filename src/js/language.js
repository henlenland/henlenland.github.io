const en = document.getElementById("en")
const ru = document.getElementById("ru")
const swit = document.getElementById("langch")

function chan(){
    changePage(this.value)
}

function changePage(value){
    en.className = (value === `en`) ? ((sidebar.className === ``) ? `sidebarsh` : ``): `hidden`
    ru.className = (value === `ru`) ? ((sidebar.className === ``) ? `sidebarsh` : ``): `hidden`
}

changePage(swit.value)
swit.onchange = chan