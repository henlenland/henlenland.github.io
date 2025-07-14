
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/en" style="font-size:25pt">Henlencia</a></p>

<p><a href="/en/constitution">Constitution</a></p>
<p><a href="/en/newslist">News</a><a href="/en/newsview?v=latest">Latest</a></p>
<p><a href="/en/language">Language</a><a href="/en/language/dictionary">Dictionary</a><a href="/en/language/keyboard">Keyboard</a></p>
<select name="lang">
    <option value="en" selected>English</option>
    <option value="ru">Русский</option>
    <option value="hl">Χενλενε</option>
</select>
`