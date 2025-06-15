

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
    en.className = (en.className === ``) ? `sidebarsh` : ((en.className === `hidden`) ? `hidden` : ``)
    ru.className = (ru.className === ``) ? `sidebarsh` : ((ru.className === `hidden`) ? `hidden` : ``)
    banner.className = (banner.className === ``) ? `sidebarsh` : ``
    zis.className = (zis.className === ``) ? `sidebarsh` : ``
    footer.className = (footer.className === ``) ? `sidebarsh` : ``
}