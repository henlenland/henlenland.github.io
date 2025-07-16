
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/hl" style="font-size:25pt">Henlenlánde Republíc</a></p>

<p><a href="/hl/constitution">Constitutßon</a><a href="/hl/newslist">Nyuez</a><a href="/hl/newsview?v=latest">Läitest</a><a href="/hl/language">Spreß</a><a href="/hl/language/keyboard">ßebordenn</a></p>
<select name="lang">
    <option value="en">English</option>
    <option value="ru">Русский</option>
    <option value="hl" selected>Henlene</option>
</select>
`