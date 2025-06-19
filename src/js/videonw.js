
const args = document.location.search.substr((document.location.search.includes(`?`)) ? 1 : 0).split('&')
document.getElementsByTagName('video')[0].src = `/src/news/${args[0].substr(2)}.mp4`