const chsidebar = document.getElementById(`chsidebar`)
chsidebar.onclick = onchangeSidebar

function onchangeSidebar(){
    ch(this || chsidebar)
}

function ch(zis){
    
    sidebar.className = (sidebar.className === ``) ? `hidden` : ``
    zis.className = (zis.className === ``) ? `sidebarsh` : ``
}