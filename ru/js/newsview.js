
const args = document.location.search.substr(1).split('&')

args[0] = args[0].substr(2)

if (args[0] != 'latest'){
    fetch(`/ru/news/${args[0]}.html`).then(resu => resu.text()).then(text => {
        document.getElementsByTagName('news')[0].innerHTML = text
    })
} else {
    fetch(`/news.json`).then(resu => resu.json()).then(path => {
        fetch(`/ru/news/${path['latest']}.html`).then(resu => resu.text()).then(text => {
            document.getElementsByTagName('news')[0].innerHTML = text
        })
    })
}