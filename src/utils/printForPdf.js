const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

let state = {
    changedPdfSrc: null
}

function cleanState () {
    this.changedPdfSrc = null
}

const printForPdf =  async function (
    templateParams,
    signOneParams,
    signTwoParams,
) {
    try {
        const existingPdfBytes = await fetch(templateParams.src).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pngImageBytes1 = await fetch(signOneParams.src).then((res) => res.arrayBuffer())
        const pngImage1 = await pdfDoc.embedPng(pngImageBytes1)

        const pngImageBytes2 = await fetch(signTwoParams.src).then((res) => res.arrayBuffer())
        const pngImage2 = await pdfDoc.embedPng(pngImageBytes2)

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        //const { width, height } = firstPage.getSize()

        firstPage.drawImage(pngImage1, { width: 50, height: 50, x: signOneParams.x, y: signOneParams.y })
        firstPage.drawImage(pngImage2, { width: 50, height: 50, x: signTwoParams.x, y: signTwoParams.y })

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
    cleanState: cleanState.bind(state),
    state,
}

