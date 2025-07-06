
const banner = document.getElementById("banner-style");
const foldername = document.URL.split('/')
const filename = foldername[foldername.length-2].split('#')[0]

banner.innerHTML = `
#banner {
    background: url("/src/banners/${(filename != "en") ? filename : 'index'}.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
}
`