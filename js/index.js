import { eliminarHTML, createBtn, createElementTxt, createInput, createIMG, createArticle, createCloseButton, createDivWithClass, deleteForm, isNull, createAlert,
    createDeleteConfirmationDialog
 } from './utils.js'

const btnAñadirProject = document.querySelector('.projectsSupr__btn');
const ASSETS_PATH = 'assets/icons/';

btnAñadirProject.addEventListener('click', addFormProject );

$(".listaProjectos").sortable({
    placeholder: "ui-state-highlight",
});

function addFormProject(){

    document.querySelector('main').style.filter = 'blur(5px)';

    const fondo = createDivWithClass('createProject');
    fondo.appendChild(createCloseButton());

    createElementTxt( fondo, 'H1', 'Nuevo Proyecto' );
    createElementTxt( fondo, 'P', 'Crea un nuevo proyecto para comenzar.' );

    addFormFields(fondo);

    const btn = createBtn('Crear Proyecto', 'createProject__btn');
    btn.addEventListener('click', addProjectToHTML );
    fondo.appendChild(btn);

    document.body.appendChild(fondo);
}

function addFormFields(referencia){
    createElementTxt( referencia, 'LABEL', 'Título', 'createProject__label' );
    createInput(referencia, 'Text', 'Nombre del proyecto', 'createProject__input');
    createElementTxt( referencia, 'LABEL', 'Descripción', 'createProject__label' );
    createInput(referencia, 'Text', 'Describe tu proyecto', 'createProject__input'); 
}

function addProjectToHTML(){
    const inputs = document.querySelectorAll('.createProject__input');
    const tlt = inputs[0].value;
    const desc = inputs[1].value;

    if( isNull(tlt) || isNull(desc) ){
        createAlert('Todos los campos son obligatorios');
        return;
    }

    if( document.querySelector(`#${tlt}`) ){
        createAlert('No pueden existir dos proyectos con el mismo nombre');
        return;
    }

    createProjectHTML(tlt, desc);
    deleteForm();
}

function createProjectHTML(tlt, desc){
    const article = createArticle('projecto');
    article.id = tlt;

    article.innerHTML = `
        <img src="${ASSETS_PATH}project.svg" alt="Icono projecto" class="projecto__img">
        <div>
            <h3 class="projecto__tlt">${tlt}</h3>
            <p class="projecto__p">${desc}</p>
        </div>
    `
    article.addEventListener( 'click', () => createView(tlt) );

    document.querySelector('.listaProjectos').appendChild(article);
}

function createHTMLView(referencia, tlt){
    const viewProjectSupr = createDivWithClass('viewProjectSupr');

    createElementTxt(viewProjectSupr, 'H1', tlt, 'viewProjectSupr__tlt');
    const iconTrash = createIMG(`${ASSETS_PATH}trash.svg`, 'Icono borrar proyecto', 'viewProjectSupr__img');
    iconTrash.addEventListener('click', () => {
        
        createDeleteConfirmationDialog(  'Esta seguro de que desea eliminar el proyecto?', () => {
            document.querySelector(`#${tlt}`).remove();
            eliminarHTML(document.querySelector('.viewProject'));
        });

    });

    viewProjectSupr.appendChild(iconTrash);

    const divListas = createDivWithClass('divListas');
    const listas = createDivWithClass('listas');
    divListas.appendChild(listas);

    referencia.appendChild(viewProjectSupr);
    referencia.appendChild(divListas);
}

function createView(tlt){
    const viewProject = document.querySelector('.viewProject');
    eliminarHTML(viewProject);

    createHTMLView(viewProject, tlt)

    $(".listas").sortable({ placeholder: "ui-state-highlight" });
    
    addList('Lista de Tareas');
    addCreateListBtn();
}

function addList(titulo){
    const divListas = document.querySelector('.listas');
    const lista = createArticle('lista');

    const listaSupr = createDivWithClass('listaSupr');

    createElementTxt( listaSupr, 'H1', titulo );
    
    const img = createIMG(`${ASSETS_PATH}trash.svg`, 'Icono opciones lista', 'listaSupr__img');
    img.addEventListener('click', e => createDeleteConfirmationDialog(  'Esta seguro de que desea eliminar el proyecto?', () => e.target.parentElement.parentElement.remove()) );

    listaSupr.appendChild(img);

    const listaTarget = createDivWithClass('listaTarget');
    
    lista.appendChild(listaSupr);
    lista.appendChild(listaTarget);
    
    addTargetBtn(lista);
    divListas.appendChild(lista);

    $(".listaTarget").sortable({
        placeholder: "ui-state-highlight",
        connectWith: ".listaTarget"
    });
}

function addTargetBtn(referencia){
    const targetAdd = createDivWithClass('targetAdd');
    targetAdd.addEventListener('click', e => addTargetForm(e) );

    const iconAdd = createIMG(`${ASSETS_PATH}añadir-black.svg`, 'Icono añadir tarjeta', 'targetAdd__img');
    targetAdd.appendChild(iconAdd);

    createElementTxt( targetAdd, 'P', 'Añade una tarjeta', 'targetAdd__p' );

    referencia.appendChild(targetAdd);
}

function addTargetForm(e){
    const targetAdd = e.target.closest('.targetAdd');
    const lista = targetAdd.parentElement;

    targetAdd.remove();
    
    addTargetInputForm(lista);
}

function addTargetInputForm(referencia){
    const divPadre = createDivWithClass('divAddTarget');

    createInput(divPadre, 'Text', 'Titulo de la tarjeta', 'createProject__input');

    const divBtns = createDivWithClass('divAddTarget__divBtns');

    const btn = createBtn('Crear', 'divAddTarget__divBtns__btn');
    btn.addEventListener('click', e => {
        const tlt = divPadre.children[0].value;
        if( isNull(tlt) ){
            createAlert('Es obligatorio un titulo');
            return;
        }
        addTarget(e,tlt);
        divPadre.remove();
        addTargetBtn(referencia);
    } );
    divBtns.appendChild(btn);

    const iconX = createIMG(`${ASSETS_PATH}x.svg`, 'Icono cancelar tarjeta', 'divAddTarget__divBtns__img');
    iconX.addEventListener('click', () => {
        addTargetBtn(referencia);
        divPadre.remove();
    })
    
    divBtns.appendChild(iconX);
    divPadre.appendChild(divBtns);

    referencia.appendChild(divPadre); 
}

function addTarget(e, tlt){
    const listaTargets = e.target.parentElement.parentElement.parentElement.children[1];
    
    const div = createDivWithClass('target');
    div.textContent = tlt;
    const img = createIMG(`${ASSETS_PATH}trash.svg`, 'Borrar tarjeta', 'listaSupr__img');
    img.addEventListener('click', e => createDeleteConfirmationDialog(  'Esta seguro de que desea eliminar la tarjeta?', () => e.target.parentElement.remove()) );
    div.appendChild(img);

    listaTargets.appendChild(div);
}

function addCreateListBtn(){
    const divListas = document.querySelector('.divListas');

    const lista = createArticle('listaAdd');

    const div = createDivWithClass('divListAdd');
    div.addEventListener('click', e => {
        const referencia = e.target.closest('.listaAdd');
        eliminarHTML(referencia);
        addListInputForm(referencia);
    });

    const iconAdd = createIMG(`${ASSETS_PATH}añadir-black.svg`, 'Icono añadir lista', 'targetAdd__img');
    div.appendChild(iconAdd);

    createElementTxt( div, 'P', 'Crea un nuevo proyecto para comenzar.', 'targetAdd__p');

    lista.appendChild(div);
    divListas.appendChild(lista);
}

function addListInputForm(referencia){
    const divPadre = createDivWithClass('divAddTarget');

    createInput(divPadre, 'Text', 'Titulo de la lista', 'createProject__input');

    const divBtns = createDivWithClass('divAddTarget__divBtns');

    const btn = createBtn('Crear', 'divAddTarget__divBtns__btn');
    btn.addEventListener('click', e => {
        const tlt = e.target.parentElement.parentElement.firstChild.value
        if( isNull(tlt) ){
            createAlert('El titulo es obligatorio');
            return;
        }
        addList(tlt);
        e.target.parentElement.parentElement.parentElement.remove();
        addCreateListBtn();
    } );
    divBtns.appendChild(btn);

    const iconX = createIMG(`${ASSETS_PATH}x.svg`, 'Icono cancelar lista', 'divAddTarget__divBtns__img');
    iconX.addEventListener('click', e => {
        e.target.parentElement.parentElement.parentElement.remove();
        addCreateListBtn();
    })

    divBtns.appendChild(iconX);
    divPadre.appendChild(divBtns);

    referencia.appendChild(divPadre);
}