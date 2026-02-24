
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
    let tableRows = ''
    const regex = /^\s*\|\s*(.*?)\s*=\s*(.*?)[\s\S]$/g
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


async function textparse(data){
    data = data.replace(
        /{(.*?)\|(.*?)}/g, '<a href="https://$1">$2</a>'
    ).replace(
        /{(.*?)}/g, '<a href="https://$1">$1</a>'
    ).replace(
        /=====\s*(.*?)\s*=====/g, '<h1>$1</h1><hr>'
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

    const complexLinkRegex = /\[\[([^|\]\n]+)\|\|([^\]\n]+)\]\]/g
    const simpleLinkRegex = /\[\[([^\]\n|]+)\]\]/g

    const complexMatches = [...data.matchAll(complexLinkRegex)]
    const simpleMatches = [...data.matchAll(simpleLinkRegex)]

    for (const match of complexMatches) {
        
        const fullMatch = match[0]
        const id = match[1].trim().replace(/\s+/g, '_')
        const text = match[2]
        
        const resolvedId = await replaceState(id)
        data = data.replace(fullMatch, `<a href="/view?id=${resolvedId}">${text}</a>`)
    }

    for (const match of simpleMatches) {
        const fullMatch = match[0];
        const id = match[1].trim().replace(/\s+/g, '_');
        
        const resolvedId = await replaceState(id);
        data = data.replace(fullMatch, `<a href="/view?id=${resolvedId}">${match[1].trim()}</a>`);
    }


    const main = document.getElementsByTagName("main")[0]
    main.innerHTML = data
    console.log(data)
}

async function replaceState(state){

    const resp = await fetch('/src/readress.txt')
    const text = await resp.text()
    
    for (let st of text.split('\n')){

        if (!st.includes('=')) continue

        let matches = 0

        let p = st.split('=')
        let stateold_file_name = p[0].trim().replace(/\s+/g, '_').toLowerCase()
        let statenew_file_name = p[1].trim().replace(/\s+/g, '_')

        let state_trimmed = state.trim().replace(/\s+/g, '_').toLowerCase()

        let limit = Math.min(state_trimmed.length, stateold_file_name.length) - 3

        for (let g = 0; g<limit; g++){

            if (state_trimmed.substring(g, g+4) === stateold_file_name.substring(g, g+4)){
                matches++
            }
            
        }

        console.log(`${state}: ${matches / limit}`)
        
        if (matches / limit > 0.4){
            return statenew_file_name
        }
        
    }
    
    return state
}

let searchparams = new URLSearchParams(window.location.search).get("id")

if (searchparams){

    (async () => {
        const newState = await replaceState(searchparams)
        let newLocation = `/view?id=${newState}`
        
        if (newState !== searchparams){
            window.location.href = newLocation
            return
        }

    })()

    const title = document.getElementsByTagName('title')[0]
    title.innerHTML = `${searchparams} &mdash; ХенленВики`

    searchparams = searchparams.replace(' ', '_')
    fetch(`/states/${
        searchparams
    }.txt`).then(result => (result.status == 404) ? "===== Эта страница была перемещена, удалена, или она ещё не написана. =====" : result.text()).then(data => textparse(data))

} else {
    window.location.href = "/view?id=main";
}