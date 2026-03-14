
function templateAglorithm(match, data){
    const contents = data.split('\n')
    let tableRows = ''
    let nonTableLines = ''
    let nonTableTableLines = ''
    const regex = /^\s*\|\s*(.*?)\s*=\s*(.*?)\s*$/g
    const regexnt = /^\s*\|\s*(.*?)\s*$/g
    contents.forEach(line => {
        const pair = line.match(regex)
        if (pair){
            tableRows += line.replace(
                regex,
                `<tr><th>$1</th><td>$2</td></tr>\n`)
        } else if (line.match(regexnt)){
            if (line)
                tableRows += line.replace(
                    regexnt,
                    `<tr><td colspan="2">$1</td></tr>\n`)
        } else {
            if (line)
                nonTableLines += `${line}<br>`
        }
    });
    return `<table class="infobox"><tr><td colspan="2" style="text-align: center;" class="above">${nonTableLines}</td></tr>${nonTableTableLines}${tableRows}</table>`
}

function headerings(state){
    
    let el = ''
    
    const parser = new DOMParser()
    const headers = Array.from([...parser.parseFromString(state, 'text/html').querySelectorAll('h2, h3')])

    let temps = []
    let lastH2 = undefined

    let ct = 1
    let ct_ = 0

    headers.forEach(header => {
        if (header.tagName === 'H2'){
            if (lastH2){
                if (temps.length !== 0)
                    el += `<li><a href="#${lastH2.textContent}">${ct}. ${lastH2.textContent}</a><ol>${temps.map(a => {ct_++; return `<li><a href="#${a}">${ct}.${ct_}. ${a}</a></li>`}).join(``)}</ol>`
                else 
                    el += `<li><a href="#${lastH2.textContent}">${ct}. ${lastH2.textContent}</a>`
                ct++
                ct_ = 0
            }
            temps = []
            lastH2 = header
        } else {
            temps.push(`${header.textContent}`)
        }
    })
    
    if (lastH2) {
        el += `<li><a href="#${lastH2.textContent}">${ct}. ${lastH2.textContent}</a><ol>${temps.map(a => {ct_++; return `<li><a href="#${a}">${ct}.${ct_}. ${a}</a></li>`}).join(``)}</ol>`
    }
    return `<box class="toc"><h2>Содержание</h2><hr><br>${el}</box>`
}

function tableAglorithm(match, data){
    const contents = data.split('\n')
    let tableRows = ''
    const regex = /^\s*\|\s*(.*?)\s*=\s*(.*?)\s*$/g
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

async function textparse(data, stateparams){
    data = `===== ${stateparams} =====\n${data}`
    data = data.replace(
        /{(.*?)\|(.*?)}/g, '<a href="https://$1">$2</a>'
    ).replace(
        /{(.*?)}/g, '<a href="https://$1">$1</a>'
    ).replace(
        /=====\s*(.*?)\s*=====/g, '<h1 class="titles">$1</h1>'
    ).replace(
        /====\s*(.*?)\s*====/g, `<h2 class='titles' id='$1'>$1</h2>`
    ).replace(
        /===\s*(.*?)\s*===/g, `<h3 id='$1'>$1</h3>`
    ).replace(
        /\*\*\s*(.*?)\s*\*\*/g, '<b>$1</b>'
    ).replace(
        /\*\s*(.*?)\s*\*/g, '<i>$1</i>'
    ).replace(
        /\~\~\s*(.*?)\s*\~\~/g, '<s>$1</s>'
    ).replace(
        /^\-\s*(.*?)\s*$/gm, '<li>$1</li>'
    ).replace(
        /{{([\s\S]*?)}}/g, (match, contents) => templateAglorithm(match, contents)
    ).replace(
        /\[\[\[([\s\S]*?)\]\]\]/g, (match, contents) => tableAglorithm(match, contents)
    ).replace(
        /\<\<img\|(.*?)\|(.*?)\|(.*?)\>\>/g, '<figure><img src="/assets/$1.jpg" class="$2"/><figcaption>$3</figcaption></figure>'
    ).replace(
        /\<\<img\|(.*?)\|(.*?)\>\>/g, '<img src="/assets/$1.jpg" alt="$1" class="$2"/>'
    ).replace(
        /\<\<box\|(.*?)\|(.*?)\|(.*?)\>\>/g, '<box><figure><img src="/assets/$1.jpg" class="$2"/><figcaption>$3</figcaption></figure></box>'
    ).replace(
        /\<\<mus\|(.*?)\>\>/g, '<audio controls src="/assets/$1.mp3">Your browser does not support the audio element.</audio>\\n' // <<name|size>>
    ).replace(
        /\<\<more\|(.*?)\>\>/g, '*Подробнее: **[[$1]]***' // <<name|size>>
    ).replace(
        /\<\<head_state\|(.*?)\>\>/g, '*Основная статья: **[[$1]]***' // <<name|size>>
    ).replaceAll(
        /^\s*$/g, '<p></p>'
    ).replaceAll(
        '\\n', '<br>'
    ).replace(
        /^(?![{|<])(.+)$/gm, '<p>$1</p>'
    )
    
    const complexLinkRegex = /\[\[([^|\]\n]+)\|\|([^\]\n]+)\]\]/g
    const simpleLinkRegex = /\[\[([^\]\n|]+)\]\]/g
    
    const complexMatches = [...data.matchAll(complexLinkRegex)]
    const simpleMatches = [...data.matchAll(simpleLinkRegex)]
    
    for (const match of [...complexMatches, ...simpleMatches]){
        
        const fullMatch = match[0]
        const id = match[1].trim()
        const text = (match.length === 3) ? match[2] : id
        
        const resolvedId = await replaceState(id.replace(/\s+/g, '_'))
        const exists = await fetch(`/states/${(resolvedId.indexOf('#') === -1) ? resolvedId : resolvedId.substring(0, resolvedId.indexOf('#'))}.txt`).then(sta => (sta.status !== 404))
        data = data.replace(fullMatch, `<a href="/view?id=${resolvedId}" class="${(exists) ? '' : 'ne'}">${text}</a>`)
    }
    
    let headses = headerings(data)
    const main = document.querySelector("main")
    main.innerHTML += data
    try {
        const firstH2 = main.querySelector('h2')
        firstH2.insertAdjacentHTML('beforebegin', headses)
    } catch {
        // ...
        console.log('нахуй нада')
    }
    console.log(main.innerHTML)
    
}

const getGrams = (word) => {
    const grams = new Set()
    for (let i = 0; i <= word.length - 3; i++) {
        grams.add(word.substring(i, i + 3))
    }
    return grams
}

async function replaceState(state){
    
    const resp = await fetch('/src/adress.json')
    const json = await resp.json()

    let state_trimmed = state.trim()

    state_trimmed = state_trimmed.replace(/\s+/g, '_').toLowerCase()

    const keys = Object.keys(json)
    
    for (let key of keys){
        
        let matches = 0
        let stateold_file_name = key.trim().replace(/\s+/g, '_').toLowerCase()
        let statenew_file_name = json[key].trim().replace(/\s+/g, '_')
        
        
        if (state_trimmed === stateold_file_name)
            return `${statenew_file_name}`
        
        for (let gram of getGrams(state_trimmed)){
            
            if (getGrams(stateold_file_name).has(gram))
                matches++

        }
        
        if (matches / Math.max(getGrams(state_trimmed).size, getGrams(stateold_file_name).size) > 0.9){
            return `${statenew_file_name}`
        }
        
    }
    
    return `${state}`
}

function start_wiki(){
    let searchparams = new URLSearchParams(window.location.search).get("id")

    if (searchparams){

        (async () => {
            const newState = await replaceState(searchparams)
            let newLocation = `/view?id=${newState}`
            
            if (newState !== searchparams){
                window.location.href = newLocation
                return
            }

            const title = document.getElementsByTagName('title')[0]
            title.innerHTML = `${searchparams.replaceAll('_', ' ')} &mdash; ХенленВики`

            let result = await fetch(`/states/${
                searchparams.replace(/\s/g, '_')
            }.txt`)

            if (result.status == 404){
                textparse('===== 404 =====\nДанной статьи не существет, ебать.', searchparams.replaceAll('_', ' '))
            } else {
                textparse(await result.text(), searchparams.replaceAll('_', ' '))
            }

        })()

    } else {
        window.location.href = "/view?id=main";
    }
}

async function search_wiki(){
    let searchparams = new URLSearchParams(window.location.search).get("id")

    if (searchparams){

        let founds = []

        const resp = await fetch('/src/adress.json')
        const json = await resp.json()

        let state_trimmed = searchparams.trim()

        state_trimmed = state_trimmed.replace(/\s+/g, '_').toLowerCase()
        let state_grams = getGrams(state_trimmed)

        const keys = Object.keys(json)
        
        for (let key of keys){
            
            let matches = 0
            let stateold_file_name = key.trim().replace(/\s+/g, '_').toLowerCase()
            let statenew_file_name = json[key].trim()            
            
            if (state_trimmed === stateold_file_name)
                founds.push([`${statenew_file_name}`, 1])
            
            for (let gram of state_grams){
                
                if (getGrams(stateold_file_name).has(gram))
                    matches++

            }
            
            if (matches / Math.max(state_grams.size, getGrams(stateold_file_name).size) > 0.1){
                founds.push([`${statenew_file_name}`, matches / Math.max(state_grams.size, getGrams(stateold_file_name).size)])
            }
            
        }

        let st1 = ''
        let i = 0
        founds.sort((b, a) => a[1] - b[1]).forEach(st =>{
            if (!st1.includes(st[0])){
                st1 += `\n- [[${st[0]}]]`
                i++
            }
        })

        st1 = `По запросу "${searchparams}" найденo (${i}):\n\n${st1}`

        textparse(st1, 'Поиск...')

    }
}