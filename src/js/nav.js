
const header = document.getElementsByTagName("header")[0]
const footer = document.getElementsByTagName("footer")[0]

footer.innerHTML += `
    <br>
    <p class="italic">*Данная организация является сугубо шуточной и не несёт за собой умысла нарушить суверенитет Российской Федерации. В ней действуют все законы Российской Федерации.</p>
    <br>
    <p style="font-weight: 600"><a href="https://t.me/henlenland">Telegram-канал</a></p>
    <p style="font-weight: 600"><a href="https://t.me/henlenland_chat">Telegram-чат</a></p>
    <br>
    <p>&copy; Henlenland, 2025 &mdash; 2026</p>
    <br>
`;


header.innerHTML += `
    <a href="/"><img src="/src/symbols/civil_flag.svg" height="12"> Хенленция</a>
    <a href="/info">Информация</a>
    <a href="/law">Закон</a>
    <a href="/story">История</a>
    <a href="/wiki">Вики</a>
`;