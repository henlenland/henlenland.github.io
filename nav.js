function nav(){

    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const sidebar = document.querySelector('aside')

    header.innerHTML = `<a class="el" href="/">Главная</a><a class="el" href="/law/">Конституция</a><a class="el" href="/wiki/">HenleneWiki</a><span style="float: right;" class="el"><label for="searchText">Поиск в HenleneWiki: </label><input type="text" id="searchText" onChange="window.location.href = \`/wiki/search?id=\$\{document.getElementById('searchText').value\}\`"></span>`
    footer.innerHTML = `<p><b><i>DISCLAIMER: Хенленция является вымышленным и ненастоящим государством, но является национальностью.</i></b></p><p>Powered by SourcyWiki © 2025-2026<br>© 2025-2026 Henlenland. All rights reserved</p>`
    sidebar.innerHTML = `<h2>Ссылки</h2><b><a href="https://discord.gg/AnfPFwc6">Discord-сервер Хенленции</a><br><a href="https://t.me/henlenland">Telegram-канал Хенленции</a></b>`
}