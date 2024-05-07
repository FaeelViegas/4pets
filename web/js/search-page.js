const urlParams = new URLSearchParams(window.location.search);
const productSearch = urlParams.get('search');
const productCategory = urlParams.get('category');
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Converter os bytes da imagem para uma string Base64
    //const base64Image = arrayBufferToBase64(product.image);
    card.innerHTML = `
            <div class="card border-0">
            <a class="product-item" id="${product.idProduct}" href="./product?id=${product.idProduct}">
                <div class="card-body p-4">
                    <img src="https://images.kabum.com.br/produtos/fotos/463171/notebook-apple-macbook-air-m2-da-apple-com-8-gpu-8gb-ram-256gb-ssd-meia-noite-mly33bz-a_1685023535_gg.jpg"
                        alt="" class="img-fluid d-block mx-auto mb-3">
                    <h5 class="name-product">${product.name}</h5>
                    <div class="price d-flex justify-content-center">
                        <span class="value">R$ ${product.price}</span>
                    </div>
                    <div class="btn-container d-flex justify-content-center m-3">
                        <button class="btn btn-info">Adicionar ao carrinho</button>
                    </div>
                </div>
            </a>
        </div>
    `;
    return card;
}

//função que carregar os produtos 
function loadProducts(products) {
    const div = document.querySelector('.container-products');

    div.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product);
        div.appendChild(card);
    });
}

//Acesso aos dados da api que retorna a lista com base no input
function getProductDataByName(productSearch) {
    fetch('./search?search=' + productSearch)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do produto');
            }
            return response.json();
        })
        .then(data => {
            loadProducts(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
function getProductDataByCategory(productCategory) {
    fetch('./search?category=' + productCategory)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do produto');
            }
            return response.json();
        })
        .then(data => {
            loadProducts(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
if (productSearch !== "") {
    getProductDataByName(productSearch);
} else {
    getProductDataByCategory(productCategory);
}
