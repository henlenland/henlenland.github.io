
const args = document.location.search.substr(1).split('&')

fetch(`/news/${args[0].substr(2)}.html`).then(resu => resu.text()).then(text => {
    document.getElementsByTagName('news')[0].innerHTML = text
})