const showMessage = function (text) {
    const message = document.querySelector('.message');
    message.style.display = 'block';

    if (text) {
        message.textContent = text;
    }

    setTimeout(() => {
        message.style.display = 'none'
    }, 2000);
}


module.exports = {
    successMessage: (text) => showMessage(text),
}
