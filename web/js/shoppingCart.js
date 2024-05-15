const cartButtonOpen = document.getElementById('cart-button-open');
const cartButtonClose = document.getElementById('cart-button-close');
const background = document.getElementById('background-cart');
let priceFooter = document.getElementById('total-price-footer');

//adiciona e remove a class 'active' do elemento 'shoppingCart'
function toggleMenu(event) {
    const cart = document.getElementById('shoppingCart');
    const background = document.getElementById('background-cart');
    cart.classList.toggle('active');
    background.classList.toggle('active');
}

cartButtonOpen.addEventListener('click', toggleMenu);
cartButtonClose.addEventListener('click', toggleMenu);
background.addEventListener('click', toggleMenu);

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
            updateCartTotal(data);
            loadCartProduct(data);
        })
        .catch(error => {
            console.error(error);
        });
}
loadCart();