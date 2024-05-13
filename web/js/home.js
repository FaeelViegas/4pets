//função que cria os cards dos produtos
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
    <div class="card border-0">
        <div class="card-body p-4">
            <a class="product-item" id="${product.idProduct}"
                href="./product?id=${product.idProduct}">
                <img src="https://images.kabum.com.br/produtos/fotos/463171/notebook-apple-macbook-air-m2-da-apple-com-8-gpu-8gb-ram-256gb-ssd-meia-noite-mly33bz-a_1685023535_gg.jpg"
                    alt="" class="img-fluid d-block mx-auto mb-3">
                <h5 class="name-product">${product.name}</h5>
                <div class="price d-flex justify-content-center">
                    <span class="value">R$ ${product.price.toFixed(2)}</span>
                </div>
            </a>
            <div class="btn-container d-flex justify-content-center">
                <button class="btn-card"
                    onclick="addToCart(${product.idProduct}, '${product.name}', ${product.price})">Adicionar
                    ao carrinho</button>
            </div>
        </div>
    </div>
    `;
    return card;
}

//função que carregar os cards no carrosel
function loadProductsIntoCarousel(products) {
    const carousel = document.querySelector('.js-carousel--products');

    products.forEach(product => {
        const card = createProductCard(product);
        carousel.appendChild(card);
    });
}

//Faz solicitação que retorna a lista de produtos 
fetch('./list-products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter dados dos produtos');
        }
        return response.json();
    })
    .then(data => {
        loadProductsIntoCarousel(data);
    })
    .catch(error => {
        console.error(error);
    });