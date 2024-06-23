let sellers;

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

// Validar o login
function validate() {
    let email = frmLogin.email.value.trim();
    let password = frmLogin.password.value.trim();

    if (email === "") {
        warningToast('Preencha o campo Email!');
        frmLogin.email.focus();
        return false;
    } else if (password === "") {
        warningToast('Preencha o campo Senha!');
        frmLogin.password.focus();
        return false;
    } else {

        let matchedSeller = sellers.find(seller => seller.storeEmail === email && seller.password === password);

        if (!matchedSeller) {
            errorToast('Email ou senha incorretos!');
            frmLogin.email.focus();
            frmLogin.password.focus();
            return false;
        } else {
            document.forms["frmLogin"].submit();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getSellers();
});
