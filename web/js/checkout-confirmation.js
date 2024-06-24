document.addEventListener("DOMContentLoaded", (event) => {
    loadCart();
    getOrder();
    getUserData();
});

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
                // Caso contrário, carrega os produtos no carrinho
                loadCardProduct(data);
            }
        })
        .catch(error => {
            console.error(error);
        });
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
            <div class="container-value-cart">
                <span>R$${cartItens.priceUnitary.toFixed(2)}</span>
                <input id="qtd-input-${cartItens.idProduct}" value="${cartItens.quantity}" disabled />
                <span>R$ ${totalPrice.toFixed(2)}</span>
            </div>
        </section>
    `;
    return cardItem;
}

function getOrder() {
    fetch('./get-orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos endereços');
            }
            return response.json();
        })
        .then(data => {
            totalOrder(data);
            addressOrder(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function getUserData() {
    fetch('./user-data-logged')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            return response.json();
        })
        .then(data => {
            const user = data[0];
            dataUser(user);
        })
        .catch(error => {
            console.error(error);
        });
}

function totalOrder(order) {
    order.forEach(order => {
        document.getElementById('total-value').textContent = order.productValue;
        document.getElementById('frete').textContent = order.shippingValue;
        document.getElementById('total-order').textContent = order.totalValue.toFixed(2);
        document.getElementById('method-order').textContent = order.methodPayment;
    });
}

function addressOrder(order) {
    order.forEach(order => {
        document.getElementById('street-selected').textContent = order.street;
        document.getElementById('number-selected').textContent = order.number;
        document.getElementById('complement-selected').textContent = order.complement;
        document.getElementById('neighborhood-selected').textContent = order.neighborhood;
        document.getElementById('cep-selected').textContent = order.cep;
        document.getElementById('city-selected').textContent = order.city;
        document.getElementById('state-selected').textContent = order.state;
    });
}

function dataUser(userData) {
    document.getElementById('name').textContent = userData.name;
    document.getElementById('cpf').textContent = userData.cpf;
    document.getElementById('phone').textContent = userData.phone;
}