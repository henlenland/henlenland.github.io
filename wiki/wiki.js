
let adressFILE

function templateAglorithm(match, data){
    const contents = data.split('\n')
    let tableRows = ''
    let above = ''
    let decorative = ''
    const regex = /^\s*\|\s*(.*?)\s*=\s*(.*?)\s*$/
    contents.forEach(line => {
        const pair = line.match(regex)
        if (pair){
            console.log(pair[1])
            if (pair[1] == "name"){
                above += line.replace(
                    regex,
                    `<b>$2</b><br>`)
            } else if (pair[1] == "altname"){
                above += line.replace(
                    regex,
                    `$2<br>`)
            } else if (pair[1] == "flag"){
                decorative += line.replace(
                    regex,
                    `<<img|$2|M|Флаг>>`)
            } else if (pair[1] == "logo"){
                decorative += line.replace(
                    regex,
                    `<<img|$2|M|Лого>>`)
            } else if (pair[1] == "coa"){
                decorative += line.replace(
                    regex,
                    `<<img|$2|M|Герб>>`)
            } else if (pair[1].startsWith('h-')){
                tableRows += `<tr><th style="background-color: var(--lighter-background); text-align:center;" colspan="2">${pair[1].slice(2)}</th></tr>`
            } else if (pair[1] == 'nicknames'){
                tableRows += `<tr><th style="background-color: var(--lighter-background); text-align:center;" colspan="2">Называют также</th></tr>`
            } else if (pair[1] == 'birthdate') {
                tableRows += line.replace(
                    regex,
                    `<tr><th>Дата рождения</th><td>$2</td></tr>\n`)
            } else if (pair[1] == 'date') {
                tableRows += line.replace(
                    regex,
                    `<tr><th>Дата</th><td>$2</td></tr>\n`)
            } else if (pair[1] == 'madedate') {
                tableRows += line.replace(
                    regex,
                    `<tr><th>Дата основания</th><td>$2</td></tr>\n`)
            } else if (pair[1] == 'location') {
                tableRows += line.replace(
                    regex,
                    `<tr><th>Местонахождение</th><td>$2</td></tr>\n`)
            } else {
                tableRows += line.replace(
                    regex,
                    `<tr><th>$1</th><td>$2</td></tr>\n`)
            }
        }
    });
    return `<table class="infobox"><tr><td colspan="2" style="text-align: center;" class="above">${above}</td></tr>${(decorative != '') ? `<tr><td colspan="2" style="text-align:center;">${decorative}<hr></td></tr>` : ''}${tableRows}</table>`
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
    return `<div class="toc-box"><h2>Содержание</h2>${(el == '') ? 'его нет' : el}</div>`
}

function tableAglorithm(match, data){
    const regex = /^\|\s*(.*?)\s*\|$/gm
    let green = true
    const table = data.replace(regex, (match, d) => {
        console.log(d)
        let tdr = d.split('|').map(td => `<td style="${(green) ? 'background-color: var(--lighter-background);' : ''}">${td.trim()}</td>`).join('')
        green = false
        return `<tr>${tdr}</tr>`
    })
    return `<table>\n${table}</table>`
}

async function textparse(data, stateparams){
    data = `# ${stateparams}\n${data}`
    data = data.trim().replace(
        /{(.*?)\|(.*?)}/g, '<a href="https://$1">$2 ➤</a>'
    ).replace(
        /{(.*?)}/g, '<a href="https://$1">$1 ➤</a>'
    ).replace(
        /^###\s(.*?)\s*$/gm, `<h3 id='$1'>$1</h3>`
    ).replace(
        /^##\s(.*?)\s*$/gm, `<h2 id='$1'>$1</h2>`
    ).replace(
        /^#\s(.*?)\s*$/gm, '<h1>$1</h1>'
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
        /\<\<img\|(.*?)\|(.*?)\|(.*?)\>\>/g, '<figure><img src="/wiki/assets/$1.jpg" class="$2"/><figcaption>$3</figcaption></figure>'
    ).replace(
        /\<\<img\|(.*?)\|(.*?)\>\>/g, '<img src="/wiki/assets/$1.jpg" alt="$1" class="$2"/>'
    ).replace(
        /\<\<box\|(.*?)\|(.*?)\|(.*?)\>\>/g, '<div class="box"><figure><img src="/wiki/assets/$1.jpg" class="$2"/><figcaption>$3</figcaption></figure></div>'
    ).replace(
        /\<\<mus\|(.*?)\>\>/g, '<audio controls src="/wiki/assets/$1.mp3">Your browser does not support the audio element.</audio>' // <<name|size>>
    ).replace(
        /\<\<expl\|(.*?)\|(.*?)\>\>/g, '<abbr title="$2">$1</abbr>' // <<name|size>>
    ).replace(
        /\<\<more\|(.*?)\>\>/g, '<i>Подробнее: <b>[[$1]]</b></i>' // <<name|size>>
    ).split(
        /\n\s*\n/
    ).map(
        p => `<p>${p.replace(/  $/gm, '<br>')}</p>`
    ).join('\n')
    
    const complexLinkRegex = /\[\[([^\]\n]+)\|\|([^\]\n]+)\]\]/g
    const simpleLinkRegex = /\[\[([^\]\n]+)\]\]/g
    
    const complexMatches = [...data.matchAll(complexLinkRegex)]
    const simpleMatches = [...data.matchAll(simpleLinkRegex)]
    
    for (const match of [...complexMatches, ...simpleMatches]){
        
        const fullMatch = match[0]
        const id = match[1].trim()
        const text = (match.length === 3) ? match[2] : id
        
        const resolvedId = await replaceState(id.replace(/\s+/g, '_'))
        const exists = await fetch(`/wiki/states/${resolvedId}.txt`).then(sta => (sta.status !== 404))
        data = data.replace(fullMatch, `<a href="/wiki/${resolvedId}" class="${(exists) ? '' : 'ne'}">${text}</a>`)
    }
    
    let headses = headerings(data)
    const body = document.querySelector("body")
    body.innerHTML += `<header></header><div class="wrapper"><main>
    ${data}</main><aside></aside></div><footer></footer>`
    nav()
    try {
        const aside = body.querySelector('aside')
        aside.insertAdjacentHTML('afterbegin', headses)
    } catch {
        // ...
        console.log('нахуй нада')
    }
    const abbrs = body.querySelectorAll('abbr')
    abbrs.forEach(ab => {ab.innerHTML = `${ab.innerHTML}<sup>?</sup>`})
    console.log(body.innerHTML)
    
}

const getGrams = (word) => {
    const grams = new Set()
    for (let i = 0; i <= word.length - 3; i++) {
        grams.add(word.substring(i, i + 3))
    }
    return grams
}

async function replaceState(state){
    
    const resp = await adressFILE
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

async function start_wiki(searchparams){

    if (searchparams){

        const newState = await replaceState(searchparams)
        let newLocation = `/wiki/${newState}`
        
        if (newState !== searchparams){
            window.location.href = newLocation
            return
        }

        const title = document.getElementsByTagName('title')[0]
        title.innerHTML = `${searchparams.replaceAll('_', ' ')} &mdash; ХенленВики`

        let result = await fetch(`/wiki/states/${
            searchparams.replace(/\s/g, '_')
        }.txt`)

        if (result.status == 404){
            textparse('# 404\nДанной статьи не существет, ебать.', searchparams.replaceAll('_', ' '))
        } else {
            textparse(await result.text(), searchparams.replaceAll('_', ' '))
        }

    } else {
        window.location.href = "/wiki/main";
    }
}

async function search_wiki(){
    let searchparams = new URLSearchParams(window.location.search).get("id")

    if (searchparams){

        let founds = []

        const resp = await adressFILE
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
                founds.push([`${statenew_file_name}`, matches / Math.max(state_grams.size, getGrams(stateold_file_name).size) * 100])
            }
            
        }

        let st1 = ''
        let i = 0
        founds.sort((b, a) => a[1] - b[1]).forEach(st =>{
            if (!st1.includes(st[0])){
                st1 += `\n- [[${st[0]}]] (на ${st[1].toString().slice(0, 5)}% схоже)`
                i++
            }
        })

        st1 = `По запросу "${searchparams}" найденo (${i}):\n\n${st1}`

        textparse(st1, 'Поиск...')

    }
}

function init_wiki(args){
    (async () => {
        await fetch('/wiki/states/adress.json').then(k => {
            adressFILE = k
            if (args[1] == 0){
                start_wiki(args[0])
            } else search_wiki()
        })
    })
}