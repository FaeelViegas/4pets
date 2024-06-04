//fonte do codigo abaixo https://www.freakyjolly.com/gmail-login-input-field-style/
$(function () {

    $(".field-wrapper .field-placeholder").on("click", function () {
        $(this).closest(".field-wrapper").find("input").focus();
    });
    $(".field-wrapper input").on("keyup", function () {
        var value = $.trim($(this).val());
        if (value) {
            $(this).closest(".field-wrapper").addClass("hasValue");
        } else {
            $(this).closest(".field-wrapper").removeClass("hasValue");
        }
    });
});

function insertDataUser(userData) {
    document.getElementById('full-name').value = userData.name;
    document.getElementById('cpf').value = userData.cpf;
    document.getElementById('birthDate').value = userData.birthDate;
    document.getElementById('phone').value = userData.phone;
}

fetch('./user-data-logged')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter dados');
        }
        return response.json();
    })
    .then(data => {
        const user = data[0];
        insertDataUser(user);
    })
    .catch(error => {
        console.error(error);
    });

