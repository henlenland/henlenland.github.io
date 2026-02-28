
const header = document.getElementsByTagName("header")[0]

header.innerHTML += `
    ХенленВики
    <a href="/" class="el"><b>Главная</b></a>
    <a href="/view?id=Henlenland" class="el"><b>Хенленция</b></a>
    <a href="/view?id=Sourcy" class="el"><b>Sourcy</b></a>
    <span style="float: right;" class="el">
        <label for="searchText">Поиск: </label>
        <input type="text" id="searchText" onChange="window.location.href = \`/search?id=\$\{document.getElementById('searchText').value\}\`">
    </span>
`;