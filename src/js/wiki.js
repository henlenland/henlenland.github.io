
function templateAglorithm(match, data){
    const contents = data.split('\n')
    let firstLine = contents[0]
    let tableRows = ''
    let nonTableLines = ''
    const regex = /^\s*\|\s*(.*?)\s*=\s*(.*?)[\s\S]$/g
    contents.forEach(line => {
        const pair = line.match(regex)
        if (pair){
            tableRows += line.replace(
                regex,
                `<tr><th>$1</th><td>$2</td></tr>\n`)
            
        } else {
            nonTableLines += `<p style="text-align: center">${line}</p>`
        }
    });
    return `<info>${nonTableLines}<table>\n${tableRows}</table></info>`
}


function textparse(data){
    data = data.replace(
        /=====\s*(.*?)\s*=====/g, '<h1>$1</h1>'
    ).replace(
        /====\s*(.*?)\s*====/g, '<h2>$1</h2>'
    ).replace(
        /===\s*(.*?)\s*===/g, '<h3>$1</h3>'
    ).replace(
        /\*\*\s*(.*?)\s*\*\*/gs, '<b>$1</b>'
    ).replace(
        /\/\/\s*(.*?)\/\//gs, '<i>$1</i>'
    ).replace(
        /^\-\s*(.*?)\s*$/gm, '<li>$1</li>'
    ).replace(
        /\[\[(.*?)\|\|(.*?)\]\]/g, '<a href="/wiki/view?id=$1">$2</a>'
    ).replace(
        /\[\[(.*?)\|(.*?)\]\]/g, '<a href="/wiki/view?id=$1" class="ne">$2</a>'
    ).replace(
        /\<\<(.*?)\|(.*?)\>\>/g, '<img src="/wiki/images/$1.jpg" height="$2"/>' // <<name|size>>
    ).replace(
        /^(?![{<])(.+)$/, '<p class="nl">$1</p>'
    ).replaceAll(
        '\\\\', '<p></p>'
    ).replace(
        /{{([\s\S]*?)}}/g, (match, contents) => templateAglorithm(match, contents)
    )
    const main = document.getElementsByTagName("main")[0]
    main.innerHTML = data
    console.log(data)
}

let searchparams = new URLSearchParams(window.location.search).get("id")

if (searchparams){
    fetch(`/wiki/states/${
        searchparams
    }.txt`).then(result => (result.status == 404) ? "===== Эта страница была перемещена, удалена, или она ещё не написана. =====" : result.text()).then(data => textparse(data))
} else {
    window.location.href = "/wiki/view?id=main";
}
