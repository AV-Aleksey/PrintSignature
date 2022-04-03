const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { successMessage } = require('./message');
const { getConfigValues } = require('../config.methods');

const printPng = async (paramsPrint, pdfDoc) => {
    if (paramsPrint.isFileGetted) {
        const pages = pdfDoc.getPages()
        const firstPage = pages[0];
        const { width } = firstPage.getSize();

        const pngImageBytes = await fetch(paramsPrint.src).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)

        let { width: pngWidth, height: pngHeight } = pngImage;

        if (typeof paramsPrint.percent === 'number' && paramsPrint.percent !== 0) {
            pngWidth = pngWidth - (pngWidth / 100 * paramsPrint.percent);
            pngHeight = pngHeight - (pngHeight / 100 * paramsPrint.percent);
        }

        firstPage.drawImage(
            pngImage,
            {
                width: pngWidth,
                height: pngHeight,
                x: paramsPrint.x,
                y: paramsPrint.y
            }
        )
    }
}

const printForPdf =  async function (
    templateParams,
    signOneParams,
    signTwoParams,
    printForDoc,
) {
    try {
        const { pathUpload } = getConfigValues();
        const existingPdfBytes = await fetch(templateParams.src).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        await printPng(signOneParams, pdfDoc)
        await printPng(signTwoParams, pdfDoc)
        await printPng(printForDoc, pdfDoc)

        const pdfBytes = await pdfDoc.save();
        const newFilePath = `${path.basename(templateParams.src, '.pdf')}-result.pdf`;
        fs.writeFileSync( pathUpload + '/' + newFilePath, pdfBytes);

        successMessage();
    } catch (err) {
        alert('Ошибка наложения (проверьте все ли обязательные поля заполнены)')
        console.log(err);
    }
}

module.exports = {
    printForPdf,
}

