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

function createAddressCard(address) {
    const card = document.createElement('li');
    card.innerHTML = `
        <div id="${address.idAddress}" class="address d-flex">
            <h4>${address.street}</h4>
            <span>Numero: ${address.number}, ${address.complement}</span>
            <span>Bairro: ${address.neighborhood}</span>
            <span>CEP ${address.cep} - ${address.city},${address.state}</span>
            <div class="buttons-address">
                <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#modal-delete-address">Excluir</button>
            </div>
        </div>
    `;
    return card;
}

function loadAddresses(addresses) {
    const ul = document.querySelector('.address-list');

    addresses.forEach(address => {
        const card = createAddressCard(address);
        ul.appendChild(card);
    });
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


fetch('./addresses')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter dados');
        }
        return response.json();
    })
    .then(data => {
        loadAddresses(data);
    })
    .catch(error => {
        console.error(error);
    });

