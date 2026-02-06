
function templateAglorithm(match, data){
    const contents = data.split('\n')
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

function tableAglorithm(match, data){
    const contents = data.split('\n')
    let firstLine = contents[0]
    let tableRows = ''
    let nonTableLines = ''
    const regex = /^\s*\|\s*(.*?)[\s\S]$/g
    contents.forEach(line => {
        const pair = line.match(regex)
        if (pair){
            console.log(pair[0])
            let x = pair[0].split('=')
            let tds = ''
            x.forEach(td => {
                td = td.replace(/^\s*\|/, '')
                tds += `<td>${td}</td>`
            })
            tableRows += `<tr>${tds}</tr>`
        }
    });
    return `<table>\n${tableRows}</table>`
}


function textparse(data){
    data = data.replace(
        /{(.*?)\|(.*?)}/g, '<a href="https://$1">$2</a>'
    ).replace(
        /{(.*?)}/g, '<a href="https://$1">$1</a>'
    ).replace(
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
        /\[\[(.*?)\|\|(.*?)\]\]/g, '<a href="/view?id=$1">$2</a>'
    ).replace(
        /\[\[(.*?)\|(.*?)\]\]/g, '<a href="/view?id=$1" class="ne">$2</a>'
    ).replace(
        /\<\<(.*?)\|(.*?)\>\>/g, '<img src="/src/images/$1.jpg" height="$2"/>' // <<name|size>>
    ).replace(
        /^(?![{|<])(.+)$/gm, '<p class="nl">$1</p>'
    ).replaceAll(
        '\\\\', '<p></p>'
    ).replace(
        /{{([\s\S]*?)}}/g, (match, contents) => templateAglorithm(match, contents)
    ).replace(
        /\[\[\[([\s\S]*?)\]\]\]/g, (match, contents) => tableAglorithm(match, contents)
    )
    const main = document.getElementsByTagName("main")[0]
    main.innerHTML = data
    console.log(data)
}

let searchparams = new URLSearchParams(window.location.search).get("id")

if (searchparams){
    fetch(`/states/${
        searchparams
    }.txt`).then(result => (result.status == 404) ? "===== Эта страница была перемещена, удалена, или она ещё не написана. =====" : result.text()).then(data => textparse(data))
} else {
    window.location.href = "/view?id=main";
}
