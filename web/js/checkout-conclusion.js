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

function getOrder() {
    fetch('./get-orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos endereços');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const firstOrder = data[0];
                const methodPayment = firstOrder.methodPayment;

                document.getElementById('pix-container').style.display = 'none';
                document.getElementById('card-container').style.display = 'none';

                if (methodPayment === 'pix') {
                    document.getElementById('pix-container').style.display = 'block';
                } else if (methodPayment === 'credito') {
                    document.getElementById('card-container').style.display = 'block';
                }
            } else {
                console.error('Nenhum pedido encontrado');
            }
        })
        .catch(error => {
            console.error(error);
        });
}
getOrder();
