
const header = document.querySelector('header')
const footer = document.querySelector('footer')
const sidebar = document.querySelector('aside')

function headerings(){
    const state = document.querySelector('main')
    console.log(state)
    let el = ''
    
    const parser = new DOMParser()
    const headers = Array.from([...parser.parseFromString(state.innerHTML, 'text/html').querySelectorAll('h2, h3')])

    let temps = []
    let lastH2 = undefined

    let ct = 1
    let ct_ = 0

    headers.forEach(header => {
        if (header.tagName === 'H2'){
            if (lastH2){
                if (temps.length !== 0)
                    el += `<li><a href="#${lastH2.textContent}">${ct}. ${lastH2.textContent}</a><ol>${temps.map(a => {ct_++; return `<li><a href="#${a}">${ct}.${ct_}. ${a}</a></li>`}).join(``)}</ol>`
                else 
                    el += `<li><a href="#${lastH2.textContent}">${ct}. ${lastH2.textContent}</a>`
                ct++
                ct_ = 0
            }
            temps = []
            lastH2 = header
        } else {
            temps.push(`${header.textContent}`)
        }
    })
    
    if (lastH2) {
        el += `<li><a href="#${lastH2.textContent}">${ct}. ${lastH2.textContent}</a><ol>${temps.map(a => {ct_++; return `<li><a href="#${a}">${ct}.${ct_}. ${a}</a></li>`}).join(``)}</ol>`
    }
    return `<div class="toc-box"><h2>Содержание</h2>${(el == '') ? 'его нет' : el}</div>`
}

header.innerHTML = `<a class="el" href="/wiki/"><b>HenleneWiki</b></a><a class="el" href="/law/">Закон</a><span style="float: right;" class="el"><input type="text" placeholder="Поиск в HenleneWiki" id="searchText" onChange="window.location.href = \`/wiki/search?id=\$\{document.getElementById('searchText').value\}\`"></span>`
footer.innerHTML = `<p><b><i>DISCLAIMER: Хенленция является вымышленным и ненастоящим государством.</i></b></p><p>Powered by нихуя © 1000 BC - 2026 AD<br>© 2025-2026 Henlenland. All rights reserved</p>`
sidebar.innerHTML = `<h2>Ссылки</h2><b><a href="https://discord.gg/KVxzqyGzDG">Discord-сервер Хенленции</a><br><a href="https://t.me/henlenland">Telegram-канал Хенленции</a></b><hr>${headerings()}`
