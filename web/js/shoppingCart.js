//adiciona e remove a class 'active' do elemento
function toggleMenu(event) {
    const cart = document.getElementById('shoppingCart');
    const background = document.getElementById('background-cart');
    cart.classList.toggle('active');
    background.classList.toggle('active');
    body.classList.toggle('no-scroll');
}

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
    const totalPrice = calculateTotalPrice(cartItens);
    priceFooter.textContent = totalPrice.toFixed(2);
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
//verificar se o carrinho de compras tem conteudo
function verifyCartList() {
    const ul = document.querySelector(".list-group-item");
    if (!ul.hasChildNodes()) {
        btnFinalize.style.pointerEvents = "none";
        btnFinalize.style.backgroundColor = "gray";
    } else {
        btnFinalize.style.pointerEvents = "all";
        btnFinalize.style.backgroundColor = "rgb(0, 174, 174)";
    }
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
            let qtd;
            if (data.length == "") { qtd = 1 }
            data.forEach(cartItens => {
                qtd = cartItens.quantity;
            });
            qtd += data.length;
            cartQtd.textContent = qtd - 1;
            updateCartTotal(data);
            loadCartProduct(data);
            verifyCartList();
        })
        .catch(error => {
            console.error(error);
        });
}

const cartButtonOpen = document.getElementById('cart-button-open');
const cartButtonClose = document.getElementById('cart-button-close');
const background = document.getElementById('background-cart');
let priceFooter = document.getElementById('total-price-footer');
let cartQtd = document.querySelector('#cart-itens-qtd');
const btnFinalize = document.getElementById("btn-finalize");
const body = document.body;
const element = document.querySelector('.list-group-item');
cartButtonOpen.addEventListener('click', toggleMenu);
cartButtonClose.addEventListener('click', toggleMenu);
background.addEventListener('click', toggleMenu);

document.addEventListener("DOMContentLoaded", (event) => {
    verifyCartList();
    loadCart();
});