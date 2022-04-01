
// const getDir = () => {
//     const templates = fs.readdirSync('src/' + TEMPLATES_PATH);
//     const signature = fs.readdirSync('src/' + SIGNATURE_PATH);
//     console.log(templates, signature);
// }
// getDir();


// fs.readFile('src/Assets/file.txt', (err, data) => {
//     if(err) throw err;
//     console.log(data.toString())
// });


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


// downloadPdfBtn.addEventListener('click', (e) => {
//     if (Boolean(statePdf.changedPdfSrc)) {
//         cleanState();
//         alert('Скачан!')
//     } else {
//         alert('Ошибка файл не сформирован')
//     }
// })
