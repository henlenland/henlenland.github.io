
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/en" style="font-size:25pt">Henlenland</a></p>

<p><a href="/en/constitution">Constitution</a></p>
<p><a href="/en/newslist">News</a><a href="/en/newsview?v=latest">Latest</a></p>
<select name="lang">
    <option value="en" selected>English</option>
    <option value="ru">Русский</option>
</select>
`