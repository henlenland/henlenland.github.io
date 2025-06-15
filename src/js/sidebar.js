
document.getElementsByTagName("sidebar")[0].innerHTML = `

<a class="sec" href="/">Home</a>
<a class="sec" href="/constitution">Constitution</a>
<a class="sec inner" href="/constitution/parlament">Parlament</a>
<a class="sec inner" href="/constitution/symbols">Symbols</a>

<div id="lang">
    <label>Language: </label>
    <select id="langch">
        <option value="en" selected>en/US</option>
        <option value="ru">ru/RU</option>
    </select>
</div>
`
