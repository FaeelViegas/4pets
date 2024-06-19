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
                <input id="qtd-input-${cartItens.idProduct}" type="number" value="${cartItens.quantity}" min="0" max="${cartItens.stock}" step="1"
               oninput="handleQuantityChange(${cartItens.idProduct}, this.value)" />
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

function createShippingCard(shippingItens) {
    const cardItem = document.createElement('div');
    cardItem.classList.add('shipping-option');
    cardItem.innerHTML = `
            <input type="radio" class="shippingSelected" id="shipping_${shippingItens.id}" name="shipping" data-price="${shippingItens.custom_price}">
            <label for="shipping_${shippingItens.id}">
            <span class="radio-custom"></span>
             <div class="shipping-details">
                <div class="shipping-info">
                   <p class="shipping-method">${shippingItens.name}</p>
                   <p class="shipping-time">Chega em ${shippingItens.delivery_time} dias</p>
                 </div>
                 <div class="shipping-price-logo">
                       <p class="shipping-price">R$ ${shippingItens.custom_price}</p>
                       <img src="${shippingItens.company.picture}"
                        alt="${shippingItens.company.name} logo" class="logo">
                    </div>
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
function loadCardProduct(cartItens) {
    const element = document.querySelector('.list-group-item');

    element.innerHTML = '';

    cartItens.forEach(cartItens => {
        const card = createCartCard(cartItens);
        element.appendChild(card);
    });
}

function loadCardAddress(addressItens) {
    const element = document.querySelector('.address-selection');

    element.innerHTML = '';

    addressItens.forEach(addressItens => {
        const card = createAddressCard(addressItens);
        element.appendChild(card);
    });
}

function loadCardShipping(shippingItems) {
    const element = document.querySelector('.shipping-selection');

    element.innerHTML = '';

    shippingItems.forEach(shippingItem => {
        // Verifica se o nome do frete contém "Mini" e verifica se vem o atributo error
        if (!shippingItem.name.includes('Mini') && (!shippingItem.error || shippingItem.error.trim() === '')) {
            const card = createShippingCard(shippingItem);
            element.appendChild(card);
        }
    });

    // Adiciona um evento de escuta para capturar a seleção do usuário
    const shippingInputs = document.querySelectorAll('.shippingSelected');
    shippingInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (this.checked) {
                const selectedPrice = this.getAttribute('data-price');
                const priceShipping = document.querySelector('#frete');
                priceShipping.textContent = "R$ " + selectedPrice;
                totalOrder();
            }
        });
    });
}

//calcula o valor total dos itens do carrinho
function calculateTotalPrice(cartItens) {
    let totalPrice = 0;
    cartItens.forEach(cartItens => {
        totalPrice += cartItens.priceUnitary * cartItens.quantity;
    });
    return totalPrice;
}

//atualiza o valor total do footer do carrinho
function updateCartTotal(cartItens) {
    const priceProducts = document.querySelector('#total-value');
    const totalPrice = calculateTotalPrice(cartItens);
    priceProducts.textContent = "R$ " + totalPrice.toFixed(2);
    totalOrder();
}

function totalOrder() {
    let valorProdutosStr = document.getElementById('total-value').innerText;
    let freteStr = document.getElementById('frete').innerText;

    let valorProdutos = parseFloat(valorProdutosStr.replace('R$ ', ''));
    let frete = parseFloat(freteStr.replace('R$ ', ''));
    let totalPedido = valorProdutos + frete;

    document.getElementById('total-order').innerText = 'R$ ' + totalPedido.toFixed(2);
}

// Função para lidar com a mudança na quantidade
function handleQuantityChange(productId, quantity) {
    const inputElement = document.getElementById(`qtd-input-${productId}`);

    // Envia a solicitação para atualizar a quantidade
    clearTimeout(inputElement.dataset.timeout);
    inputElement.dataset.timeout = setTimeout(function () {
        sendUpdateRequest(productId, quantity);
    }, 100);
}

// Função para enviar a solicitação de atualização de quantidade para o servidor
function sendUpdateRequest(productId, quantity) {
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
        .then(data => {
            console.log('Quantidade atualizada com sucesso:', data.message);
            loadCart(); // Recarrega o carrinho após a atualização
        })
        .catch(error => {
            console.error('Erro:', error);
        });
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
            loadCardProduct(data);
            updateCartTotal(data);
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
            loadCardAddress(data);
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
        <span>CEP <span id="cep-selected">${address.cep}</span> - ${address.city},${address.state}</span>
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

document.getElementById("confirmAddressBtn").addEventListener("click", function () {
    setTimeout(() => {
        const spanElement = document.querySelector('#cep-selected');
        const spanValue = spanElement.innerText;
        fetch('./calculate-shipping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'toPostalCode': spanValue
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter dados de frete');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                loadCardShipping(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, "50");
});

loadCart();