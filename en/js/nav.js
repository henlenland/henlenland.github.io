
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/en" style="font-size:20pt">Henlencia</a></p>

<a href="/en/laws">Constitution</a>
<a href="/en/news">News</a>

<br />
<select name="lang">
    <option value="en" selected>English</option>
    <option value="ru">Русский</option>
</select>

<br />
<p>
    <a href="https://t.me/henlenland">Telegram-channel</a>
    <a href="https://t.me/henlenland">Telegram-chat</a>
</p>
`