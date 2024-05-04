function validate() {
    let name = frmRegister.name.value;
    let cpf = frmRegister.cpf.value;
    let phone = frmRegister.phone.value;
    let date = frmRegister.date.value;
    let user = frmRegister.user.value;
    let password = frmRegister.password.value;

    if (name.trim() === "") {
        warningToast(text = 'Preencha o campo Nome Completo!');
        frmRegister.name.focus();
        return false;
    } else if (cpf.trim() === "") {
        warningToast(text = 'Preencha o campo CPF!');
        frmRegister.cpf.focus();
        return false;
    } else if (cpf.length < 14 || cpf.length >= 15) {
        warningToast(text = 'Preencha o campo CPF corretamente!');
        frmRegister.cpf.focus();
        return false;
    } else if (users && users.some(item => item.cpf === cpf)) {
        errorToast(text = 'CPF de usuário já possui um cadastro!');
        frmRegister.cpf.focus();
        return false;
    } else if (phone.trim() === "") {
        warningToast(text = 'Preencha o campo Telefone!');
        frmRegister.phone.focus();
        return false;
    } else if (phone.length < 15 || phone.length >= 16) {
        warningToast(text = 'Preencha o campo Telefone corretamente!');
        frmRegister.phone.focus();
        return false;
    } else if (users && users.some(item => item.phone === phone)) {
        errorToast(text = 'Esse numero de telefone ja possui um cadastro!');
        frmRegister.phone.focus();
        return false;
    } else if (date.trim() === "") {
        warningToast(text = 'Selecione uma data de nascimento!');
        frmRegister.date.focus();
        return false;
    } else if (date > dataFormatada) {
        warningToast(text = 'Selecione uma data valida!');
        frmRegister.date.focus();
        return false;
    } else if (user.trim() === "") {
        warningToast(text = 'Preencha o campo Nome de Usuario!');
        frmRegister.user.focus();
        return false;
    } else if (users && users.some(item => item.userName === user)) {
        errorToast(text = 'Esse nome de usuario ja possui um cadastro!');
        frmRegister.user.focus();
        return false;
    } else if (password.trim() === "") {
        warningToast(text = 'Preencha o campo Senha!');
        frmRegister.password.focus();
        return false;
    } else if (password.length < 8) {
        warningToast(text = 'Senha deve conter pelo menos 8 caracteres!');
        frmRegister.password.focus();
        return false;
    }
    document.forms["frmRegister"].submit();
}

let users;
fetch('./users-data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter dados dos usuários');
        }
        return response.json();
    })
    .then(data => {
        users = data;
    })
    .catch(error => {
        console.error(error);
    });

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

const handleCpf = (event) => {
    let input = event.target;
    input.value = cpfMask(input.value);
}

const cpfMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
}

let dataAtual = new Date();
let dataFormatada = dataAtual.getFullYear() + '-' +
    ('0' + (dataAtual.getMonth() + 1)).slice(-2) + '-' +
    ('0' + dataAtual.getDate()).slice(-2);

let elementoData = document.getElementById("inputDate");
elementoData.setAttribute("max", dataFormatada);