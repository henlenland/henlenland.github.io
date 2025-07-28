
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/en" style="font-size:20pt">Henlencia</a></p>

<a href="/en/laws#const">Constitution</a>
<a href="/en/laws#lw">Laws</a>
<a href="/en/newslist">News</a>
<a href="/en/newsview?v=latest">Latest</a>

<br />
<select name="lang">
    <option value="en" selected>English</option>
    <option value="ru">Русский</option>
</select>

<br />
<p>
    <a href="https://t.me/henlenland">Telegram-канал</a>
    <a href="https://t.me/henlenland">Telegram-чат</a>
</p>
`