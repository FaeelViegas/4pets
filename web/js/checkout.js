//cria os card com base nos dados do carrinho de compra
function createCartCard(cartItens) {
    const cardItem = document.createElement('li');
    const totalPrice = cartItens.priceUnitary * cartItens.quantity;
    cardItem.innerHTML = `
        <section class="item-cart" id="${cartItens.idProduct}">
            <div class="image-cart">
                <img src="data:image/png;base64,${cartItens.image.value}"
                    alt="${cartItens.name}">
            </div>
            <div class="container-name-cart-item">
                <span>${cartItens.name}</span>
            </div>
            <div class="container-cart-trash">
                <i class="fa-solid fa-trash-can fa-xs btn btn-outline-danger" onclick="deleteItem(${cartItens.idProduct})"></i>
            </div>
            <div class="container-value-cart">
                <span>R$${cartItens.priceUnitary.toFixed(2)}</span>
                <input id="qtd-input" onclick="sendQtd(${cartItens.idProduct}, this.value)" type="number" value="${cartItens.quantity}" min="0" max="10" step="1" />
                <span>R$ ${totalPrice.toFixed(2)}</span>
            </div>
        </section>
    `;
    return cardItem;
}

function createAddressCard(addressItens) {
    const cardItem = document.createElement('div');
    cardItem.classList.add('form-check');
    cardItem.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${addressItens.idAddress}" data-id="${addressItens.idAddress}">
                <label class="form-check-label" for="flexRadioDefault${addressItens.idAddress}">
                 <div id="${addressItens.idAddress}" class="address-selected d-flex flex-column">
                    <h4>${addressItens.street}</h4>
                    <span>Numero: ${addressItens.number}, ${addressItens.complement}</span>
                    <span>Bairro: ${addressItens.neighborhood}</span>
                    <span>CEP ${addressItens.cep} - ${addressItens.city},${addressItens.state}</span>
                </div>
            </label>
    `;
    return cardItem;
}

//calcula o valor total dos itens do carrinho
function calculateTotalPrice(cartItens) {
    let totalPrice = 0;
    cartItens.forEach(cartItens => {
        totalPrice += cartItens.priceUnitary * cartItens.quantity;
    });
    return totalPrice;
}

//carrega os card dos itens do carrinho de compra
function loadCartProduct(cartItens) {
    const element = document.querySelector('.list-group-item');

    element.innerHTML = '';

    cartItens.forEach(cartItens => {
        const card = createCartCard(cartItens);
        element.appendChild(card);
    });
}

function loadCartAddress(addressItens) {
    const element = document.querySelector('.address-selection');

    element.innerHTML = '';

    addressItens.forEach(addressItens => {
        const card = createAddressCard(addressItens);
        element.appendChild(card);
    });
}
//envia solicitação com a nova quantidade do item do carrinho de compra
function sendQtd(productId, quantity) {
    if (quantity <= 0) {
        deleteItem(productId);
        return false;
    }
    const data = {
        productId: productId,
        productQtd: quantity
    };
    fetch('./update-quantity', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    loadCart();
}

//envia soicitação para a remoção do item do carrinho de compras
function deleteItem(productId) {
    fetch('./delete-item-cart?productId=' + productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.status);
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                return null;
            }

            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    loadCart();
}

//carrega os itens no carrinho de compras
function loadCart() {
    fetch('./cart-itens')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos produtos');
            }
            return response.json();
        })
        .then(data => {
            loadCartProduct(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function loadAddress() {
    fetch('./addresses')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos endereços');
            }
            return response.json();
        })
        .then(data => {
            loadCartAddress(data);
            localStorage.setItem('addresses', JSON.stringify(data)); // Armazenar endereços no localStorage
        })
        .catch(error => {
            console.error(error);
        });
}

function updateSelectedAddress(address) {
    const selectedAddressDiv = document.getElementById('selectedAddress');
    selectedAddressDiv.innerHTML = `
        <h4>${address.street}</h4>
        <span>Numero: ${address.number}, ${address.complement}</span>
        <span>Bairro: ${address.neighborhood}</span>
        <span>CEP ${address.cep} - ${address.city},${address.state}</span>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const confirmAddressBtn = document.getElementById('confirmAddressBtn');

    // Carrega endereços quando o modal é aberto
    $('#address-modal-selection').on('show.bs.modal', loadAddress);

    // Confirma o endereço selecionado
    confirmAddressBtn.addEventListener('click', () => {
        const selectedRadio = document.querySelector('.address-selection input[name="flexRadioDefault"]:checked');
        if (selectedRadio) {
            const selectedId = selectedRadio.getAttribute('data-id');
            const addresses = JSON.parse(localStorage.getItem('addresses')); // Recuperar endereços do localStorage
            const selectedAddress = addresses.find(addr => addr.idAddress == selectedId);
            if (selectedAddress) {
                updateSelectedAddress(selectedAddress);
                $('#address-modal-selection').modal('hide');
            } else {
                console.error('Endereço selecionado não encontrado');
            }
        } else {
            console.error('Nenhum endereço selecionado');
        }
    });
});

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

loadCart();