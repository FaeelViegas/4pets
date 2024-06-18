function togglePaymentDetails() {
    const creditCardDetails = document.getElementById('creditCardDetails');
    const isCreditCardSelected = document.getElementById('creditCard').checked;
    creditCardDetails.style.display = isCreditCardSelected ? 'block' : 'none';
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
    const cardName = document.getElementById('cardName').value.trim();
    const cardExpiry = document.getElementById('cardExpiry').value;

    const today = new Date();
    const expiryDate = new Date(cardExpiry + "-01");

    // Validação do nome do titular do cartão
    if (cardName === "") {
        return false;
    }

    // Validação da data de expiração (deve ser uma data futura)
    if (expiryDate < today) {
        return false;
    }
    return true;
}

// Adiciona os event listeners para validar enquanto o usuário digita
document.getElementById('cardNumber').addEventListener('input', function () {
    validateCardNumber(this);
});

document.getElementById('cardName').addEventListener('input', function () {
    validateForm();
});

document.getElementById('cardExpiry').addEventListener('input', function () {
    validateForm();
});

document.getElementById('cardCVV').addEventListener('input', function () {
    validateCvvNumber(this);
});

document.getElementById('cardCPF').addEventListener('input', function () {
    validateCardNumber(this);
});