const fs = require('fs').promises;

const cleanDirectory = async function(directory) {
    try {
        await fs.readdir(directory).then((files) => Promise.all(files.map(file => fs.unlink(`${directory}/${file}`))));
    } catch(err) {
        console.log(err);
    }
}

module.exports = cleanDirectory;

