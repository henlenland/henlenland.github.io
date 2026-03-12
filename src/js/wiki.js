
function templateAglorithm(match, data){
    const contents = data.split('\n')
    let tableRows = ''
    let nonTableLines = ''
    const regex = /^\s*\|\s*(.*?)\s*=\s*(.*?)\s*$/g
    contents.forEach(line => {
        const pair = line.match(regex)
        if (pair){
            tableRows += line.replace(
                regex,
                `<tr><th>$1</th><td>$2</td></tr>\n`)
            
        } else {
            if (line)
                nonTableLines += `${line}<br>`
        }
    });
    return `<table class="infobox"><tr><td colspan="2" style="text-align: center;" class="above">${nonTableLines}</td></tr>${tableRows}</table>`
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

async function textparse(data){
    
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
        /\<\<img\|(.*?)\|(.*?)\>\>/g, '\\n<img src="/assets/$1.jpg" class="$2"/>\\n' // <<name|size>>
    ).replace(
        /\<\<mus\|(.*?)\>\>/g, '\\n<audio controls src="/assets/$1.mp3">Your browser does not support the audio element.</audio>\\n' // <<name|size>>
    ).replace(
        /\<\<more\|(.*?)\>\>/g, '\\n<p><i>Подробнее: <b>[[$1]]</b></i></p>\\n' // <<name|size>>
    ).replace(
        /\<\<head_state\|(.*?)\>\>/g, '\\n<p><i>Основная статья: <b>[[$1]]</b></i></p>\\n' // <<name|size>>
    ).replaceAll(
        /^\s*$/g, '<p></p>'
    ).replaceAll(
        '\\n', '<p></p>'
    ).replace(
        /{{([\s\S]*?)}}/g, (match, contents) => templateAglorithm(match, contents)
    ).replace(
        /\[\[\[([\s\S]*?)\]\]\]/g, (match, contents) => tableAglorithm(match, contents)
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
        const exists = await fetch(`/states/${(resolvedId.indexOf('#') === -1) ? resolvedId : resolvedId.substring(0, resolvedId.indexOf('#'))}.md`).then(sta => (sta.status !== 404))
        data = data.replace(fullMatch, `<a href="/view?id=${resolvedId}" class="${(exists) ? '' : 'ne'}">${text}</a>`)
    }
    
    let headses = headerings(data)
    const main = document.querySelector("main")
    main.innerHTML += data
    const firstH2 = main.querySelector('h2')
    firstH2.insertAdjacentHTML('beforebegin', headses)
    
}

async function replaceState(state){
    
    const resp = await fetch('/src/adress.txt')
    const text = await resp.text()
    
    const getGrams = (word) => {
        let grams = []
        for (let i = 0; i <= word.length - 3; i++) {
            grams.push(word.substring(i, i + 3))
        }
        return grams
    }

    let tag = ''
    let state_trimmed = state.trim()

    if (state_trimmed.indexOf('#') !== -1){
        tag = state.substring(state_trimmed.indexOf('#'))
        state_trimmed.substring(0, state_trimmed.indexOf('#'))
    }

    state_trimmed = state_trimmed.replace(/\s+/g, '_').toLowerCase()
    
    for (let st of text.split('\n')){

        if (!st.includes('=')) continue

        let p = st.split('=')
        let stateold_file_name = p[0].trim().replace(/\s+/g, '_').toLowerCase()
        let statenew_file_name = p[1].trim().replace(/\s+/g, '_')


        if (state_trimmed === stateold_file_name)
            return `${statenew_file_name}${tag}`


        let matches = 0

        getGrams(state_trimmed).forEach(gram => {

            if (getGrams(stateold_file_name).includes(gram))
                matches++
            
        })
        
        if (matches / Math.max(getGrams(state_trimmed).length, getGrams(stateold_file_name).length) > 0.8){
            return `${statenew_file_name}${tag}`
        }
        
    }
    
    return `${state}`
}

function start_wiki(){
    let searchparams = new URLSearchParams(window.location.search).get("id")
    // alert(12 / 65834 * ((318 + 8/15) * (318 + 8/15) * 2.25))

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
        title.innerHTML = `${searchparams.replaceAll('_', ' ')} &mdash; ХенленВики`

        searchparams = searchparams.replace(' ', '_')
        fetch(`/states/${
            searchparams
        }.md`).then(result => (result.status == 404) ? `` : result.text()).then(data => textparse(data))

    } else {
        window.location.href = "/view?id=main";
    }
}

async function search_wiki(){
    let searchparams = new URLSearchParams(window.location.search).get("id")

    if (searchparams){

        const resp = await fetch('/src/adress.txt')
        const text = await resp.text()

        let founds = []
        
        const getGrams = (word) => {
            let grams = []
            for (let i = 0; i <= word.length - 3; i++) {
                grams.push(word.substring(i, i + 3))
            }
            return grams
        }

        const state_trimmed = searchparams.trim().replace(/\s+/g, '_').toLowerCase()

        for (let st of text.split('\n')){

            if (!st.includes('=')) continue;

            let p = st.split('=')
            let stateold_file_name = p[0].trim().replace(/\s+/g, '_').toLowerCase()
            let statenew_file_name = p[1].trim()

            if (founds.indexOf(statenew_file_name) !== -1) continue

            let matches = 0

            if (state_trimmed === stateold_file_name)
                founds.push(`${statenew_file_name}`)

            getGrams(state_trimmed).forEach(gram =>{

                if (getGrams(stateold_file_name).includes(gram))
                    matches++
                
            })
            
            if (matches / Math.max(getGrams(state_trimmed).length, getGrams(stateold_file_name).length) > 0.1){
                founds.push(`${statenew_file_name}`)
            }

        }

        let st1 = ''
        founds.forEach(st =>{
            st1 += `\n- [[${st}]]`
        })

        st1 = `По запросу "${searchparams}" найденo:\\\\\n${st1}`

        textparse(`===== Поиск... =====\n${st1}`)

    }
}