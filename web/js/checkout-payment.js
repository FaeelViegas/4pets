function togglePaymentDetails() {
    const creditCardDetails = document.getElementById('creditCardDetails');
    const creditCardInput = document.getElementById('creditCard');

    if (creditCardInput.checked) {
        creditCardDetails.style.display = 'block';
        methodPayment = "credito";
    } else {
        creditCardDetails.style.display = 'none';
        methodPayment = "pix";
    }
    validateForm();
    // Atualiza o estado do botão de pagamento com base no método selecionado e na validação do formulário
    updatePaymentButtonState(button);
}

function updatePaymentButtonState(button) {
    if (methodPayment === "pix") {
        if (formValidated) {
            button.style.pointerEvents = "all";
            button.style.backgroundColor = "rgb(0, 174, 174)";
        } else {
            button.style.pointerEvents = "none";
            button.style.backgroundColor = "gray";
        }
    } else if (methodPayment === "credito") {
        if (formValidated) {
            button.style.pointerEvents = "all";
            button.style.backgroundColor = "rgb(0, 174, 174)";
        } else {
            button.style.pointerEvents = "none";
            button.style.backgroundColor = "gray";
        }
    }
}

function validateCardNumber(input) {
    // Remove não-dígitos do número do cartão
    input.value = input.value.replace(/\D/g, '');
}

function validateCpfNumber(input) {
    // Remove não-dígitos do número do cpf
    input.value = input.value.replace(/\D/g, '');
}

function validateCvvNumber(input) {
    // Remove não-dígitos do número do cvv
    input.value = input.value.replace(/\D/g, '');
}

function validateForm() {
    console.log("digitou")
    if (methodPayment === "pix") {
        formValidated = true; // Se for pix, marca o formulário como validado
        return true;
    }
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardName = document.getElementById('cardName').value.trim();
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVV = document.getElementById('cardCVV').value;
    const cardCPF = document.getElementById('cardCPF').value.trim();

    // Validação do número do cartão
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        formValidated = false;
        updatePaymentButtonState(button);
        return false;
    }

    // Validação do nome impresso no cartão
    if (cardName === "") {
        formValidated = false;
        updatePaymentButtonState(button);
        return false;
    }

    // Validação da data de expiração (deve ser uma data futura)
    const today = new Date();
    const expiryDate = new Date(cardExpiry + "-01");
    if (expiryDate < today) {
        formValidated = false;
        updatePaymentButtonState(button);
        return false;
    }

    // Validação do CVV (código de verificação)
    if (cardCVV.length !== 3 || !/^\d+$/.test(cardCVV)) {
        formValidated = false;
        updatePaymentButtonState(button);
        return false;
    }

    // Validação do CPF do titular do cartão
    if (cardCPF.length !== 11 || !/^\d+$/.test(cardCPF)) {
        formValidated = false;
        updatePaymentButtonState(button);
        return false;
    }
    formValidated = true;
    updatePaymentButtonState(button);
    return true;
}

function totalOrder(order) {
    order.forEach(order => {
        console.log(order.productValue)
        document.getElementById('total-value').textContent = order.productValue;
        document.getElementById('frete').textContent = order.shippingValue;
        document.getElementById('total-order').textContent = order.totalValue.toFixed(2);
    });
}

function getOrder() {
    fetch('./get-orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos endereços');
            }
            return response.json();
        })
        .then(data => {
            totalOrder(data);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function sendOrder() {
    const orderData = {
        methodPayment: methodPayment
    };

    fetch('./update-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar o pedido');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
const button = document.querySelector('#payment-button');
let formValidated = false;
let methodPayment = "";
document.addEventListener("DOMContentLoaded", (event) => {
    // Adiciona os event listeners para validar enquanto o usuário digita
    document.getElementById('cardNumber').addEventListener('input', function () {
        validateCardNumber(this);
    });

    document.getElementById('cardCVV').addEventListener('input', function () {
        validateCvvNumber(this);
    });

    document.getElementById('cardCPF').addEventListener('input', function () {
        validateCardNumber(this);
    });
    getOrder();
});