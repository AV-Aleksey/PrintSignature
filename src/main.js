const { printForPdf } = require('./utils/printForPdf')
const { initSignature, initConfig } = require('./init');
const { setConfigValues, getConfigValues } = require('./config.methods')
const { dialog } = require('electron').remote;
const { successMessage } = require('./utils/message')

let { pathImages, pathUpload } = getConfigValues();

const form = document.querySelector('#formPrint');
const imageDirectoryBtn = document.querySelector('#imageDirectory');
const uploadDirectoryBtn = document.querySelector('#uploadDirectory');
const saveBtn = document.querySelector('.saveBtn');

initSignature();
initConfig()

const setDirectory = async (key) => {
    try {
        const { filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        if (filePaths[0] && filePaths[0].length) {
            setConfigValues({ [key]: filePaths[0] });
            initConfig();
            initSignature();

            const { pathImages: pathImages_, pathUpload: pathUpload_ } = getConfigValues();
            debugger
            pathImages = pathImages_
            pathUpload = pathUpload_
        }
    } catch(e) {
        alert('Не удалось считать папку');
    }
}

saveBtn.addEventListener('click', (e) => {
    try {
        e.preventDefault()
        const formData = new FormData(document.forms.formPrint);
        const x = +formData.get('xSignOne');
        const y = +formData.get('ySignOne');
        const percent = +formData.get('signOnePercent');

        setConfigValues({ xPx: x, yPx: y, percentMin: percent });
        successMessage('Параметры наложения успешно сохранены!')
    } catch (e) {
        console.log(e);
        alert('Ошибка сохранения параметров');
    }


})
imageDirectoryBtn.addEventListener('click', () => setDirectory('pathImages'))
uploadDirectoryBtn.addEventListener('click', () => setDirectory('pathUpload'))

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(document.forms.formPrint)

    const templateParams = { src: formData.get('template').path};
    const signOneParams = {
        isFileGetted: Boolean(formData.get('signOne')),
        src: pathImages + '/' + formData.get('signOne'),
        x: +formData.get('xSignOne'),
        y: +formData.get('ySignOne'),
        percent: +formData.get('signOnePercent')
    };

    const signTwoParams = {
        isFileGetted: Boolean(formData.get('signTwo')),
        src:  pathImages + '/' + formData.get('signTwo'),
        x: +formData.get('xSignTwo'),
        y: +formData.get('ySignTwo'),
        percent: +formData.get('signTwoPercent')
    };

    const printForDoc = {
        isFileGetted: Boolean(formData.get('printForDoc')),
        src: pathImages + '/' + formData.get('printForDoc'),
        x: +formData.get('xPrintForDoc'),
        y: +formData.get('yPrintForDoc'),
        percent: +formData.get('printForDocPercent')
    };

    if (pathUpload && pathImages) {
        await printForPdf(
            templateParams,
            signOneParams,
            signTwoParams,
            printForDoc,
        );
    } else {
        alert('Вы не указали папку с изображениями или выгрузки результата (см. Параметры)')
    }

});

