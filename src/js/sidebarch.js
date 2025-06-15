

const chsidebar = document.getElementById(`chsidebar`)
chsidebar.onclick = onchangeSidebar

function onchangeSidebar(){
    ch(this)
}

function ch(zis){
    sidebar.className = (sidebar.className === ``) ? `hidden` : ``
    const en = document.getElementById("en")
    const ru = document.getElementById("ru")
    const banner = document.getElementById("banner")
    const footer = document.getElementsByTagName("footer")[0]
    en.className = (en.className === ``) ? `brightless` : ((en.className === `hidden`) ? `hidden` : ``)
    ru.className = (ru.className === ``) ? `brightless` : ((ru.className === `hidden`) ? `hidden` : ``)
    banner.className = (banner.className === ``) ? `brightless` : ``
    zis.className = (zis.className === ``) ? `sidebarsh` : ``
    footer.className = (footer.className === ``) ? `brightless` : ``
}