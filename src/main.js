const cleanDir = require('./utils/cleanDirectory');
const { printForPdf } = require('./utils/printForPdf')
const { SIGNATURE_PATH } = require('./consts');
const { initSignature } = require('./init');

const form = document.querySelector('#formPrint');

initSignature();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(document.forms.formPrint)

    const templateParams = { src: formData.get('template').path};
    const signOneParams = {
        isFileGetted: Boolean(formData.get('signOne')),
        src: '../' + SIGNATURE_PATH + '/' + formData.get('signOne'),
        x: +formData.get('xSignOne'),
        y: +formData.get('ySignOne')
    };

    const signTwoParams = {
        isFileGetted: Boolean(formData.get('signTwo')),
        src: '../' + SIGNATURE_PATH + '/' + formData.get('signTwo'),
        x: +formData.get('xSignTwo'),
        y: +formData.get('ySignTwo')
    };

    const printForDoc = {
        isFileGetted: Boolean(formData.get('printForDoc')),
        src: '../' + SIGNATURE_PATH + '/' + formData.get('printForDoc'),
        x: +formData.get('xPrintForDoc'),
        y: +formData.get('yPrintForDoc')
    };

    await printForPdf(
        templateParams,
        signOneParams,
        signTwoParams,
        printForDoc,
    );
});

