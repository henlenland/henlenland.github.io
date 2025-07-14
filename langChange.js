
const form = document.getElementsByName(`lang`)[0]
form.onchange = function (ev) {

    let x = window.location.href

    if (x.includes('en')){
        x = x.replace('en', this.value);
    } else if (x.includes('ru')){
        x = x.replace('ru', this.value);
    } else if (x.includes('hl')){
        x = x.replace('hl', this.value);
    }
    window.location.href = x
}