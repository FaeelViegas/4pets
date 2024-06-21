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

function verifyFreteSelect() {
    let freteStr = document.getElementById('frete').innerText;
    const button = document.querySelector('#payment-button');
    if (freteStr === "R$ 0.00") {
        button.style.pointerEvents = "none";
        button.style.backgroundColor = "gray"
    } else {
        button.style.pointerEvents = "all";
        button.style.backgroundColor = "rgb(0, 174, 174)"
    }
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

// Carrega os itens no carrinho de compras
function loadCart() {
    fetch('./cart-itens')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos produtos');
            }
            return response.json();
        })
        .then(data => {
            // Verifica se os dados estão vazios
            if (!data || data.length === 0) {
                // Redireciona o usuário para a página inicial
                window.location.href = './home';
            } else {
                // Caso contrário, carrega os produtos no carrinho e atualiza o total
                loadCardProduct(data);
                updateCartTotal(data);
            }
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
        <h4 class="${address.idAddress}" id="street-selected">${address.street}</h4>
        <span>Numero:<span id="number-selected">${address.number}</span> ,<span id="complement-selected">${address.complement}</span></span>
        <span>Bairro: <span id="neighborhood-selected">${address.neighborhood}</span></span>
        <span>CEP <span id="cep-selected">${address.cep}</span> - <span id="city-selected">${address.city}</span>,<span id="state-selected">${address.state}</span></span>
    `;
}

function setupFieldPlaceholders() {
    // Seleciona todos os elementos com a classe 'field-placeholder'
    const placeholders = document.querySelectorAll('.field-wrapper .field-placeholder');

    // Adiciona um event listener para cada elemento 'field-placeholder'
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            // Encontra o input mais próximo dentro do wrapper e foca nele
            const input = placeholder.closest('.field-wrapper').querySelector('input');
            if (input) {
                input.focus();
            }
        });
    });

    // Seleciona todos os inputs dentro de elementos com a classe 'field-wrapper'
    const inputs = document.querySelectorAll('.field-wrapper input');

    // Adiciona um event listener para cada input
    inputs.forEach(input => {
        input.addEventListener('keyup', () => {
            const value = input.value.trim();
            if (value) {
                input.closest('.field-wrapper').classList.add('hasValue');
            } else {
                input.closest('.field-wrapper').classList.remove('hasValue');
            }
        });
    });
}

function sendOrder() {
    //pegando os dados necessarios para a criação do pedido
    let valorProdutosStr = document.getElementById('total-value').innerText;
    let freteStr = document.getElementById('frete').innerText;
    let cep = document.getElementById('cep-selected').innerText;
    let street = document.getElementById('street-selected').innerText;
    let number = document.getElementById('number-selected').innerText;
    let city = document.getElementById('city-selected').innerText;
    let neighborhood = document.getElementById('neighborhood-selected').innerText;
    let state = document.getElementById('state-selected').innerText;
    let complement = document.getElementById('complement-selected').innerText;

    let elemento = document.getElementById('street-selected');
    let idAddressStr = elemento.className;
    let idAddress = parseInt(idAddressStr, 10);
    let valorProdutos = parseFloat(valorProdutosStr.replace('R$ ', ''));
    let frete = parseFloat(freteStr.replace('R$ ', ''));
    let total = valorProdutos + frete;
    
    const orderData = {
        street: street,
        number: number,
        cep: cep,
        city: city,
        neighborhood: neighborhood,
        state: state,
        complement: complement,
        productValue: valorProdutos,
        shippingValue: frete,
        totalValue: total,
        idAddress: idAddress
    };

    fetch('./add-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar o pedido');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

document.addEventListener("DOMContentLoaded", (event) => {
    setupFieldPlaceholders();
    verifyFreteSelect();
    loadCart();
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
                const priceShipping = document.querySelector('#frete');
                priceShipping.textContent = "R$ 0.00";
                verifyFreteSelect();
                $('#address-modal-selection').modal('hide');
            } else {
                console.error('Endereço selecionado não encontrado');
            }
        } else {
            console.error('Nenhum endereço selecionado');
        }
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
                    loadCardShipping(data);
                    // Selecionando todos os elementos de input radio com a classe 'shippingSelected'
                    const shippingInputs = document.querySelectorAll('input[type="radio"].shippingSelected');
                    // Adicionando um event listener para cada input radio
                    shippingInputs.forEach(input => {
                        input.addEventListener('change', function () {
                            // Verifica se o input radio está marcado
                            if (this.checked) {
                                //função que bloquei e permite acessoa a proxima pagina do checkout
                                verifyFreteSelect();
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }, "50");
    });
});