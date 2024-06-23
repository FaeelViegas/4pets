let sellers;

document.addEventListener("DOMContentLoaded", function () {
    getSellers();
    toggleIdentificationFields();
});

function getSellers() {
    fetch('./sellers-data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos vendedores');
            }
            return response.json();
        })
        .then(data => {
            sellers = data;
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function toggleIdentificationFields() {
    let typeIdentification = document.getElementById("inputTypeIdentification").value;
    let businessNameDiv = document.getElementById("businessNameDiv");
    let numberIdentification = document.getElementById("inputNumberIdentification");

    numberIdentification.value = '';

    if (typeIdentification === "CNPJ") {
        businessNameDiv.style.display = "block";
        numberIdentification.setAttribute("maxlength", "18");
        numberIdentification.setAttribute("placeholder", "00.000.000/0000-00");
    } else {
        businessNameDiv.style.display = "none";
        numberIdentification.setAttribute("maxlength", "14");
        numberIdentification.setAttribute("placeholder", "000.000.000-00");
    }
}

function validateSeller() {
    let sellerName = frmSellerRegister.sellerName.value;
    let storeName = frmSellerRegister.storeName.value;
    let typeIdentification = frmSellerRegister.typeIdentification.value;
    let numberIdentification = frmSellerRegister.numberIdentification.value;
    let businessName = frmSellerRegister.businessName.value;
    let storeEmail = frmSellerRegister.storeEmail.value;
    let storePhone = frmSellerRegister.storePhone.value;
    let password = frmSellerRegister.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifica se os campos são únicos
    if (!isUniqueField('email', storeEmail)) {
        warningToast('O Email da Loja já está em uso!');
        frmSellerRegister.storeEmail.focus();
        return false;
    } else if (!isUniqueField('numberIdentification', numberIdentification)) {
        warningToast('O Número de Identificação (CPF/CNPJ) já está em uso!');
        frmSellerRegister.numberIdentification.focus();
        return false;
    } else if (!isUniqueField('storeName', storeName)) {
        warningToast('O Nome da Loja já está em uso!');
        frmSellerRegister.storeName.focus();
        return false;
    } else if (!isUniqueField('storePhone', storePhone)) {
        warningToast('O Telefone da Loja já está em uso!');
        frmSellerRegister.storePhone.focus();
        return false;
    } else if (sellerName.trim() === "") {
        warningToast('Preencha o campo Nome do Vendedor!');
        frmSellerRegister.sellerName.focus();
        return false;
    } else if (typeIdentification === "CPF" && (numberIdentification.trim() === "" || numberIdentification.length !== 14)) {
        warningToast('Preencha o campo CPF corretamente!');
        frmSellerRegister.numberIdentification.focus();
        return false;
    } else if (typeIdentification === "CNPJ" && (numberIdentification.trim() === "" || numberIdentification.length !== 18)) {
        warningToast('Preencha o campo CNPJ corretamente!');
        frmSellerRegister.numberIdentification.focus();
        return false;
    } else if (typeIdentification === "CNPJ" && businessName.trim() === "") {
        warningToast('Preencha o campo Nome Empresarial!');
        frmSellerRegister.businessName.focus();
        return false;
    } else if (storeEmail.trim() === "" || !emailRegex.test(storeEmail)) {
        warningToast('Preencha o campo Email da Loja corretamente!');
        frmSellerRegister.storeEmail.focus();
        return false;
    } else if (storePhone.trim() === "" || storePhone.length < 15 || storePhone.length >= 16) {
        warningToast('Preencha o campo Telefone da Loja corretamente!');
        frmSellerRegister.storePhone.focus();
        return false;
    } else if (password.trim() === "" || password.length < 8) {
        warningToast('A senha deve ter pelo menos 8 caracteres!');
        frmSellerRegister.password.focus();
        return false;
    }

    document.forms["frmSellerRegister"].submit();
}

function isUniqueField(field, value) {
    if (!sellers) return true; // Se não houver dados de vendedores carregados, considera como único

    switch (field) {
        case 'email':
            return !sellers.some(seller => seller.storeEmail === value);
        case 'numberIdentification':
            return !sellers.some(seller => seller.numberIdentification === value);
        case 'storeName':
            return !sellers.some(seller => seller.storeName === value);
        case 'storePhone':
            return !sellers.some(seller => seller.storePhone === value);
        default:
            return true;
    }
}

const handlePhone = (event) => {
    let input = event.target;
    input.value = phoneMask(input.value);
}

const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}

const handleIdentification = (event) => {
    let input = event.target;
    let typeIdentification = document.getElementById("inputTypeIdentification").value;
    if (typeIdentification === "CPF") {
        input.value = cpfMask(input.value);
    } else {
        input.value = cnpjMask(input.value);
    }
}

const cpfMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
}

const cnpjMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1/$2");
    value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    return value;
}
