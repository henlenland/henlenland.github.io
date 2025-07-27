
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/ru" style="font-size:20pt">Хенленция</a></p>

<a href="/ru/laws#const">Конституция</a>
<a href="/ru/laws#lw">Законы</a>
<a href="/ru/newslist">Новости</a>
<a href="/ru/newsview?v=latest">Новейшее</a>
<br />
<select name="lang">
    <option value="en">English</option>
    <option value="ru" selected>Русский</option>
</select>
`