const fs = require('fs');
const path = require('path');
const cleanDir = require('./utils/cleanDirectory');
const { state: statePdf, cleanState, printForPdf } = require('./utils/printForPdf')

const TEMPLATES_PATH = __dirname + '/Assets/templates/';
const SIGNATURE_PATH = __dirname + '/Assets/signatures/';

const state = {
    template: null,
    signOne: null,
}

const uploadTemplateBtn = document.querySelector('#template');
const printBtn = document.querySelector('#print');
const form = document.querySelector('#formPrint');


//const downloadPdfBtn = document.querySelector('#downloadPdf')

// uploadTemplateBtn.addEventListener('change', async (e) => {
//     try {
//         await cleanDir('src/' + TEMPLATES_PATH);
//         const FILE_PATH = e.target.files[0].path;
//         const name = path.basename(FILE_PATH)
//
//
//         await fs.copyFile(FILE_PATH, path.join(TEMPLATES_PATH + name),  (err) => {
//             if (err) throw err;
//         });
//
//         state.template = FILE_PATH;
//         alert('Файл загружен!');
//     } catch (e) {
//         alert('error!')
//         console.log(e)
//     }
// })


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(document.forms.formPrint)

    const templateParams = { src: formData.get('template').path};
    const signOneParams = { src: formData.get('signOne').path, x: +formData.get('xSignOne'), y: +formData.get('ySignOne') };
    const signTwoParams = { src: formData.get('signTwo').path, x: +formData.get('xSignTwo'), y: +formData.get('ySignTwo') };


    // await fs.copyFile(templateParams.src, path.join(TEMPLATES_PATH + 'current_template.pdf'),  (err) => {
    //     if (err) throw err;
    // });

    await printForPdf(templateParams, signOneParams, signTwoParams);
});


// downloadPdfBtn.addEventListener('click', (e) => {
//     if (Boolean(statePdf.changedPdfSrc)) {
//         cleanState();
//         alert('Скачан!')
//     } else {
//         alert('Ошибка файл не сформирован')
//     }
// })
