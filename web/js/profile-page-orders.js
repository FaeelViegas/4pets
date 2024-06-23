document.addEventListener("DOMContentLoaded", (event) => {
    fetchAndLoadOrders();
});
//cria os cards dos pedidos do usuario
function loadOrders(orders, items) {
    const ordersList = document.getElementById('order-list');
    orders.forEach(order => {
        // cria o card do pedido
        const orderItem = document.createElement('li');
        orderItem.innerHTML = `
            <div class="order-card" onclick="toggleItems('order${order.idOrder}-items')">
                <div class="order-header">
                    <div class="order-id">Pedido #${order.idOrder}</div>
                    <div class="order-status">Status de Pagamento: ${order.statusPayment}</div>
                    <div class="order-date">Data e Hora: ${order.dateTime}</div>
                </div>
                <div class="order-body">
                    <div class="order-payment-method">Metodo de pagamento: ${order.methodPayment}</div>
                    <div class="order-total">Total: $${order.totalValue.toFixed(2)}</div>
                </div>
                <ul class="list-items-order" id="order${order.idOrder}-items" style="height: 0; overflow: hidden;">
                </ul>
            </div>
        `;
        // adiciona o card do pedido à lista de pedidos
        ordersList.appendChild(orderItem);
        // filtra os itens pelo id do pedido
        const orderItems = items.filter(item => item.orderId === order.idOrder);
        // cria os itens do pedido
        const itemsList = orderItem.querySelector(`#order${order.idOrder}-items`);

        orderItems.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.classList
            const imagem = arrayBufferToBase64(item.image);
            itemElement.innerHTML = `
                <section class="item-cart" id="${item.idProduct}">
                    <div class="image-cart">
                        <img src="data:image/png;base64,${imagem}" alt="${item.name}">
                    </div>
                    <div class="container-name-cart">
                        <span>${item.name}</span>
                    </div>
                    <div class="container-value-cart">
                        <div>
                            <span>Quantity:</span>
                            <span>${item.quantity}</span>
                        </div>
                        <div>
                            <span>Value:</span>
                            <span>$${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                </section>
            `;
            itemsList.appendChild(itemElement);
        });
    });
}

//realiza as requisições que retornam os dados dos pedidos
function fetchAndLoadOrders() {
    // Busca os dados dos pedidos
    fetch('./get-orders-user')
        .then(response => response.json())
        .then(ordersData => {
            // Busca os produtos para os pedidos
            fetch('./get-products-orders')
                .then(response => response.json())
                .then(productsData => {
                    // Chama a função para carregar os pedidos com os dados buscados
                    loadOrders(ordersData, productsData);
                })
                .catch(error => console.error('Erro ao buscar produtos:', error));
        })
        .catch(error => console.error('Erro ao buscar pedidos:', error));
}

function toggleItems(id) {
    const itemsList = document.getElementById(id);
    if (itemsList.style.height === '0px') {
        itemsList.style.height = 'auto';
        itemsList.style.overflow = 'visible';
    } else {
        itemsList.style.height = '0px';
        itemsList.style.overflow = 'hidden';
    }
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}