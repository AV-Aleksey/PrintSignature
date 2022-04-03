const fs = require('fs');
// const { SIGNATURE_PATH } = require('./consts');
const { setConfigValues, getConfigValues } = require('./config.methods')


const readAllSignatures = function () {
    try {
        const { pathImages } = getConfigValues();

        if (pathImages) {
            const templates = fs.readdirSync(pathImages);
            return templates;
        }

    } catch {
        return []
    }
}

const initOptions = function (inputId, optionList = []) {
    const inputSignOne = document.querySelector(inputId);

    const htmlOption = optionList.map((value) => {
        const optionHtml = document.createElement('option');
        optionHtml.value = value;

        return optionHtml;
    });
    inputSignOne.innerHTML = ''
    inputSignOne.append(...htmlOption);
}

const initSignature = function () {
    const allSignatures = readAllSignatures();

    initOptions('#signOne', allSignatures);
    initOptions('#signTwo', allSignatures);
    initOptions('#printForDoc', allSignatures);
}

const initConfig = function () {
    try {
        const { pathUpload, pathImages, xPx, yPx, percentMin } = getConfigValues();

        if (pathImages) {
            const text = document.querySelector('.textPathImage');
            text.textContent = `${pathImages}`
        }

        if (pathUpload) {
            const text = document.querySelector('.textPathUpload');
            text.textContent = `${pathUpload}`
        }

        if (typeof xPx === 'number') {
            const input = document.querySelector('.xSignOne');
            input.setAttribute('value', xPx);
        }

        if (typeof yPx === 'number') {
            const input = document.querySelector('.ySignOne');
            input.setAttribute('value', yPx);
        }

        if (typeof percentMin === 'number') {
            const input = document.querySelector('.signOnePercent');
            input.setAttribute('value', percentMin);
        }
    } catch {
        alert('Не удалось загрузить дериктории');
    }
}

module.exports = {
    initSignature,
    initConfig
}
