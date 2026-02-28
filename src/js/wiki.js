
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
        /====\s*(.*?)\s*====/g, '<h2 class="titles" id="$1">$1</h2>'
    ).replace(
        /===\s*(.*?)\s*===/g, '<h3>$1</h3>'
    ).replace(
        /\*\*\s*(.*?)\s*\*\*/g, '<b>$1</b>'
    ).replace(
        /\/\/\s*(.*?)\s*\/\//g, '<i>$1</i>'
    ).replace(
        /^\-\s*(.*?)\s*$/gm, '<li>$1</li>'
    ).replace(
        /\<\<img\|(.*?)\|(.*?)\>\>/g, '<img src="/assets/$1.jpg" height="$2"/>\\\\' // <<name|size>>
    ).replace(
        /\<\<mus\|(.*?)\>\>/g, '<audio controls src="/assets/$1.mp3">Your browser does not support the audio element.</audio>\\\\' // <<name|size>>
    ).replace(
        /\<\<more\|(.*?)\>\>/g, '<p><i>Подробнее: <b>[[$1]]</b></i></p>\\\\' // <<name|size>>
    ).replace(
        /\<\<head_state\|(.*?)\>\>/g, '<p><i>Основная статья: <b>[[$1]]</b></i></p>\\\\' // <<name|size>>
    ).replaceAll(
        '\\\\', '<p></p>'
    ).replace(
        /{{([\s\S]*?)}}/g, (match, contents) => templateAglorithm(match, contents)
    ).replace(
        /\[\[\[([\s\S]*?)\]\]\]/g, (match, contents) => tableAglorithm(match, contents)
    ).replace(
        /^(?![{|<])(.+)$/gm, '<p class="nl">$1</p>'
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
        const exists = await fetch(`/states/${(resolvedId.indexOf('#') === -1) ? resolvedId : resolvedId.substring(0, resolvedId.indexOf('#'))}.txt`).then(sta => (sta.status !== 404))
        data = data.replace(fullMatch, `<a href="/view?id=${resolvedId}" class="${(exists) ? '' : 'ne'}">${text}</a>`)
    }

    for (const match of simpleMatches) {
        const fullMatch = match[0];
        const id = match[1].trim().replace(/\s+/g, '_');
        
        const resolvedId = await replaceState(id);
        const exists = await fetch(`/states/${(resolvedId.indexOf('#') === -1) ? resolvedId : resolvedId.substring(0, resolvedId.indexOf('#'))}.txt`).then(sta => (sta.status !== 404))
        data = data.replace(fullMatch, `<a href="/view?id=${resolvedId}" class="${(exists) ? '' : 'ne'}">${match[1].trim()}</a>`);
    }


    const main = document.getElementsByTagName("main")[0]
    main.innerHTML = data
    console.log(data)
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

        getGrams(state_trimmed).forEach(gram =>{

            if (getGrams(stateold_file_name).includes(gram))
                matches++
            
        })
        
        if (matches / Math.max(getGrams(state_trimmed).length, getGrams(stateold_file_name).length) > 0.7){
            return `${statenew_file_name}${tag}`
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

        })()

        const title = document.getElementsByTagName('title')[0]
        title.innerHTML = `${searchparams} &mdash; ХенленВики`

        searchparams = searchparams.replace(' ', '_')
        fetch(`/states/${
            searchparams
        }.txt`).then(result => (result.status == 404) ? `===== 404 =====\nТакой страницы не существует. {/search?state=${searchparams}|Попробуйте поискать.}` : result.text()).then(data => textparse(data))

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

        const count = text.split('\n').filter(line => !line.includes('=')).length;
        
        const getGrams = (word) => {
            let grams = []
            for (let i = 0; i <= word.length - 3; i++) {
                grams.push(word.substring(i, i + 3))
            }
            return grams
        }

        const state_trimmed = searchparams.trim().replace(/\s+/g, '_').toLowerCase()
        const state_grams = getGrams(state_trimmed)

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

        let russian_ending = ((founds.length % 10 === 0) || (founds.length % 10 >= 5) || (10 < founds.length && founds.length < 20)) ? 'ов' : (2 >= founds.length % 10 >= 4) ? 'а' : ''
        st1 = `По запросу "${searchparams}" найден${(russian_ending !== '') ? 'o' : ''} ${founds.length} результат${russian_ending}${(founds.length !== 0) ? ':' : '.'}\\\\\n${st1}`

        textparse(`===== Поиск... =====\n${st1}`)

    } else {
        textparse('What.')
    }
}