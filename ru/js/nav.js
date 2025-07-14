
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/ru" style="font-size:25pt">Хенленция</a></p>

<p><a href="/ru/constitution">Конституция</a></p>
<p><a href="/ru/newslist">Новости</a><a href="/ru/newsview?v=latest">Новейшее</a></p>
<p><a href="/ru/language">Язык</a><a href="/ru/language/dictionary">Словарь языка</a><a href="/ru/language/keyboard">Клавиатура</a></p>
<p><a href="/">Выбор языка</a></p>
<select name="lang">
    <option value="en">English</option>
    <option value="ru" selected>Русский</option>
    <option value="hl">Χενλενε</option>
</select>
`