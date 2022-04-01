const fs = require('fs');
const { SIGNATURE_PATH } = require('./consts');


const readAllSignatures = function () {
    try {
        const templates = fs.readdirSync(SIGNATURE_PATH);
        return templates;
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

    inputSignOne.append(...htmlOption);
}

const initSignature = function () {
    const allSignatures = readAllSignatures();

    initOptions('#signOne', allSignatures);
    initOptions('#signTwo', allSignatures);
    initOptions('#printForDoc', allSignatures);
}

module.exports = {
    initSignature
}
