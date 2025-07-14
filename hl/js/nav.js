
const sidebar = document.getElementsByTagName("nav")[0]
sidebar.innerHTML = `

<p><a href="/hl" style="font-size:25pt">Χενλενλανδε Ρεπυβλίκ</a></p>

<p><a href="/hl/constitution">Κονστιτυτσηον</a><a href="/hl/newslist">Νηυζ</a><a href="/hl/newsview?v=latest">Λα̈ιτεστ</a><a href="/hl/language">Σπρεχ</a><a href="/hl/language/keyboard">Κεηβοαρδενν</a></p>
<select name="lang">
    <option value="en">English</option>
    <option value="ru">Русский</option>
    <option value="hl" selected>Χενλενε</option>
</select>
`