function togglePaymentDetails() {
    const creditCardDetails = document.getElementById('creditCardDetails');
    const isCreditCardSelected = document.getElementById('creditCard').checked;
    creditCardDetails.style.display = isCreditCardSelected ? 'block' : 'none';
}

function validateForm() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVV = document.getElementById('cardCVV').value;
    const cardCPF = document.getElementById('cardCPF').value;

    const today = new Date();
    const expiryDate = new Date(cardExpiry + "-01");

    if (!cardNumber.match(/^\d{16}$/)) {
        alert("Número do Cartão inválido. Deve ter 16 dígitos.");
        return false;
    }

    if (cardName.trim() === "") {
        alert("Nome Impresso no Cartão é obrigatório.");
        return false;
    }

    if (expiryDate < today) {
        alert("Data de Validade inválida. Deve ser uma data futura.");
        return false;
    }

    if (!cardCVV.match(/^\d{3}$/)) {
        alert("Código de Verificação inválido. Deve ter 3 dígitos.");
        return false;
    }

    if (!cardCPF.match(/^\d{11}$/)) {
        alert("CPF/CNPJ do titular inválido. Deve ter 11 dígitos.");
        return false;
    }

    // Se todas as validações passarem
    return true;
}