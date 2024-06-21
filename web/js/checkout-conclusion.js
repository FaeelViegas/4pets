document.querySelector('.copy-button').addEventListener('click', function () {
    var pixCode = document.getElementById('pix-code');
    if (pixCode) {
        pixCode.select();
        pixCode.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(pixCode.value).then(function () {
        }, function (err) {
            console.error('Erro ao copiar código: ', err);
        });
    } else {
        console.error('Element with ID "pix-code" not found.');
    }
});
