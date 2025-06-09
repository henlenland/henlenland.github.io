const enpage = document.getElementById("en")
const tspage = document.getElementById("trs")
const butt = document.getElementById("langch")
let trs = `trs/TRS`;
let en = `en/US`;

butt.onclick = function (){
    let isEN = (butt.innerText === `en/US`)
    butt.innerText = (isEN) ? `trs/TRS` : `en/US`;
    ((isEN) ? tspage : enpage).className = `hidden`;
    ((isEN) ? enpage : tspage).className = ``;
}