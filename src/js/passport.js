
function relo(){
    
    const canvas = document.getElementById(`cnv`)
    const ctx = canvas.getContext(`2d`)

    let form = document.inputs
    let name = form.elements['name'].value
    let lastname = form.elements['lastname'].value
    let birthdate = form.elements['birthdate'].value
    let gender = form.elements['gender'].value

    const commt = new Image();
    commt.src = '/src/passport.png';

    commt.onload = () => {
        ctx.drawImage(commt, 0, 0, canvas.width, canvas.height)
        ctx.font = '48px Font'
        ctx.fillStyle = 'black'
        ctx.fillText(name, 375, 170)
        ctx.fillText(lastname, 375, 365)
        ctx.fillText(birthdate, 375, 550)
        ctx.fillText(gender, 375, 645)
    };

}

function save() {

    const canvas = document.getElementById(`cnv`)
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.download = 'passport.jpeg';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}