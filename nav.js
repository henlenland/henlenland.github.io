function nav(){

    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const sidebar = document.querySelector('aside')

    header.innerHTML = `<a class="el" href="/">Главная</a><a class="el" href="/law/">Конституция</a><a class="el" href="/wiki/">HenleneWiki</a><span style="float: right;" class="el"><label for="searchText">Поиск в HenleneWiki: </label><input type="text" id="searchText" onChange="window.location.href = \`/search?id=\$\{document.getElementById('searchText').value\}\`"></span>`
    footer.innerHTML = `<p><b><i>DISCLAIMER: Хенленция является вымышленным и ненастоящим государством, но является национальностью.</i></b></p><p>Powered by SourcyWiki © 2025-2026<br>© 2025-2026 Henlenland. All rights reserved</p>`
    sidebar.innerHTML = `<h3>Дискорд-сервер Хенленции</h3><iframe src="https://discord.com/widget?id=1484468959305793595&theme=dark" width="300" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>`
}