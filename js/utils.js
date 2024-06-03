export function createBtn(txt, clase){
    const btn  = document.createElement('BUTTON');
    btn.textContent = txt;
    btn.classList.add(`${clase}`);
    return btn;
}


export function eliminarHTML(referencia){
    while(referencia.firstChild){
        referencia.removeChild(referencia.firstChild);
    }
}

export function createElementTxt( referencia, type, txt, clase = null ){
    const element  = document.createElement(type);
    element.textContent = txt;
    if( clase ) element.classList.add(`${clase}`)
    referencia.appendChild(element);
}

export function createInput(referencia, type, ph, clase = null){
    const input  = document.createElement('INPUT');
    input.type = type;
    input.placeholder = ph;
    if( clase ) input.classList.add(`${clase}`)
    referencia.appendChild(input);
}

export function createIMG(src, alt, clase = null){
    const img = document.createElement('IMG');
    img.src = src;
    img.alt= alt;
    if( clase ) img.classList.add(`${clase}`)
    return img;
}

export function createArticle(className) {
    const article = document.createElement('ARTICLE');
    article.classList.add(className);
    return article;
}

export function createCloseButton() {
    const btnX = createIMG(`assets/icons/x.svg`, 'Icono cerrar formulario', 'createProject__btnX');
    btnX.addEventListener('click', deleteForm);
    return btnX;
}

export function createDivWithClass(className) {
    const div = document.createElement('DIV');
    div.classList.add(className);
    return div;
}

export function deleteForm(){
    document.querySelector('.createProject').remove();
    document.querySelector('main').style.filter = 'none';
}

export function isNull(txt){
    return txt.trim().length === 0 ? true : false;
}

export function createAlert(txt){
    if( !document.querySelector('.alert') ){
        const div = createDivWithClass('alert');
        div.textContent = txt;
        document.body.appendChild(div);
        setTimeout( () => div.remove(), 3000)
    }
}

export function createDeleteConfirmationDialog( mensaje, callback = null ){
    const fondo = createDivWithClass('deleteConfirmation');

    createElementTxt( fondo, 'P', mensaje );

    const divBtns = createDivWithClass('deleteConfirmation__divBtns');

    const btnNo = createBtn('No', 'btn');
    btnNo.classList.add('btnNo');
    btnNo.addEventListener('click', () => fondo.remove() );

    const btnYes = createBtn('Si', 'btn');
    btnYes.classList.add('btnYes');
    btnYes.addEventListener('click', () => {

        if( callback != null ) callback();

        fondo.remove();
        
    })

    divBtns.appendChild(btnNo);
    divBtns.appendChild(btnYes);
    fondo.appendChild(divBtns);

    document.body.appendChild(fondo);

}