
document.getElementsByTagName("sidebar")[0].innerHTML = `

<a class="sec" href="/">Home</a>
<a class="sec" href="/lengua">Language</a>
<a class="sec" href="/konstitucyja">Constitution</a>

<div id="lang">
    <label>Language: </label>
    <select id="langch">
        <option value="en">en/US</option>
        <option value="hl" selected>hl/HL</option>
        <option value="ru">ru/RU</option>
    </select>
</div>
`
