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
    document.getElementById('full-name').value
    console.log(userData.name)
    document.getElementById('cpf').value
    document.getElementById('birthDate')
    document.getElementById('phone').value
}

fetch('./user-data-logged')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter dados');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        insertDataUser(data);
    })
    .catch(error => {
        console.error(error);
    });

