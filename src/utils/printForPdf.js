const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const printPng = async (paramsPrint, pdfDoc) => {
    if (paramsPrint.isFileGetted) {
        const pages = pdfDoc.getPages()
        const firstPage = pages[0];

        const pngImageBytes1 = await fetch(paramsPrint.src).then((res) => res.arrayBuffer())
        const pngImage1 = await pdfDoc.embedPng(pngImageBytes1)

        firstPage.drawImage(pngImage1, { width: 50, height: 50, x: paramsPrint.x, y: paramsPrint.y })
    }
}

const printForPdf =  async function (
    templateParams,
    signOneParams,
    signTwoParams,
    printForDoc,
) {
    console.log(printForDoc)
    try {
        const existingPdfBytes = await fetch(templateParams.src).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        await printPng(signOneParams, pdfDoc)
        await printPng(signTwoParams, pdfDoc)
        await printPng(printForDoc, pdfDoc)

        const pdfBytes = await pdfDoc.save();
        const newFilePath = `${path.basename(templateParams.src, '.pdf')}-result.pdf`;
        fs.writeFileSync( 'src/result/' + newFilePath, pdfBytes);
    } catch (err) {
        alert('Ошибка наложения (проверьте все ли данные корректны)')
        console.log(err);
    }
}

module.exports = {
    printForPdf,
}

