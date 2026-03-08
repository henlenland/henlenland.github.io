
const header = document.getElementsByTagName("header")[0]

header.innerHTML += `
    <a href="/" class="el"><b>ХенленВики</b></a>
    <a class="el">Powered by SourcyWiki (C)</a>
    <span style="float: right;" class="el">
        <label for="searchText">Поиск: </label>
        <input type="text" id="searchText" onChange="window.location.href = \`/search?id=\$\{document.getElementById('searchText').value\}\`">
    </span>
`;