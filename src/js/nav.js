
const nav = document.getElementsByTagName("nav")[0]
const footer = document.getElementsByTagName("footer")[0]

if (!window.matchMedia('(max-width: 756px)').matches){

    footer.innerHTML = `
    
    <table>
    
        <tr>
    
            <td>
                <p><a href="https://t.me/henlenland">Telegram-канал</a></p>
                <p><a href="https://t.me/henlenlande_chat">Telegram-чат</a></p>
            </td>
    
            <td>
                <p>Контактная информация:</p>
                <p>@Sourcy1000 в Telegram</p>
                <p>@sourcy100 в Discord</p>
            </td>
    
        </tr>
    
        <tr>
    
            <td colspan="2">
                <hr>
                <p>© 06.2025 - 09.2025 Хенленция</p>
            </td>
    
        </tr>
    
    </table>
    `;


    nav.innerHTML = `

    <table>
        <tr>
            <td colspan="5">
                <a href="/" style="font-size: 20pt">Хенленция</a>
                <hr>
            </td>
        </tr>
        <tr>
            <td>
                <a href="/executive_orders">Указы</a>
            </td>
            <td>
                <a href="/constitution">Конституция</a>
            </td>
            <td>
                <a href="/fun">Развлечения</a>
            </td>
            <td>
                <a href="/news">Новости</a>
            </td>
            <td>
                <a href="/language">Язык</a>
            </td>
        </tr>
    </table>
    `;
} else {
    footer.innerHTML = `
    
    <table>
    
        <tr>
            <td>
                <p><a href="https://t.me/henlenland">Telegram-канал</a></p>
                <p><a href="https://t.me/henlenlande_chat">Telegram-чат</a></p>
                
                <p>Контактная информация:</p>
                <p>@Sourcy1000 в Telegram</p>
                <p>@sourcy100 в Discord</p>
            </td>
        </tr>
        <tr>
    
            <td>
                <hr>
                <p>© 06.2025 - 09.2025 Хенленция</p>
            </td>
    
        </tr>
    
    </table>
    `;

    nav.innerHTML = `

    <table>
        <tr>
            <td colspan="5">
                <a href="/" style="font-size: 20pt">Хенленция</a>
                <hr>
            </td>
        </tr>
        <tr>
            <td><a href="/executive_orders">Указы</a></td>
        </tr>
        <tr>
            <td><a href="/constitution">Конституция</a></td>
        </tr>
        <tr>
            <td><a href="/fun">Развлечения</a></td>
        </tr>
        <tr>
            <td><a href="/news">Новости</a></td>
        </tr>
        <tr>
            <td><a href="/language">Язык</a></td>
        </tr>
    </table>
    `;
}
