const fs = require('fs');

const getConfigValues = function () {
    try {
        const json = fs.readFileSync(__dirname + '/app_config.json', 'utf8');

        const config = JSON.parse(json)
        return config;
    } catch(e) {
        console.log(e)
        alert('Не удалось получить файл конфигурации');
        return {
            pathImages: null,
            pathUpload: null,
            xPx: 0,
            yPx: 0,
            percentMin: 0
        }
    }
}

const setConfigValues = function (params) {
    try {
        const json = fs.readFileSync(__dirname + '/app_config.json', 'utf8');
        const config = JSON.parse(json);

        const newConfig = {...config, ...params};
        const object = JSON.stringify(newConfig);

        fs.writeFileSync(__dirname + '/app_config.json', object);
    } catch {
        alert('Не удалось изменить файл конфигурации');
    }
}

module.exports = {
    getConfigValues,
    setConfigValues
}
