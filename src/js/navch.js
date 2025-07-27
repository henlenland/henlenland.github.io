const chsidebar = document.getElementById(`chsidebar`)
chsidebar.onclick = onchangeSidebar

function onchangeSidebar(){
    ch(this || chsidebar)
}

function ch(zis){
    
    sidebar.className = (sidebar.className === ``) ? `hidden` : ``

    const main = document.getElementsByTagName("main")[0]
    const banner = document.getElementById("banner")
    const footer = document.getElementsByTagName("footer")[0]

    zis.className = (zis.className === ``) ? `sidebarsh` : ``
}