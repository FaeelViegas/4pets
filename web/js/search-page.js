const urlParams = new URLSearchParams(window.location.search);
const productSearch = urlParams.get('search');
const productCategory = urlParams.get('category');
const searchText = document.querySelector('#search-text');

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Converter os bytes da imagem para uma string Base64
    const base64Image = arrayBufferToBase64(product.image);

    card.innerHTML = `
            <div class="card border-0">
                <div class="card-body p-4">
                <a class="product-item" id="${product.idProduct}" href="./product?id=${product.idProduct}">
                    <img src="data:image/png;base64,${base64Image}"
                        alt="${product.name}" class="img-fluid d-block mx-auto mb-3">
                    <h5 class="name-product">${product.name}</h5>
                    <div class="price d-flex justify-content-center">
                        <span class="value">R$ ${product.price.toFixed(2)}</span>
                    </div>
                   </a> 
                    <div class="btn-container d-flex justify-content-center">
                        <button class="btn-card" onclick="addToCart(${product.idProduct}, '${product.name}', ${product.price},'${base64Image}')">Adicionar ao carrinho</button>
                    </div>
                </div>
        </div>
    `;
    return card;
}
// Função para converter um array de bytes em uma string Base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function addToCart(productId, productName, productPrice, productImage) {
    const data = {
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        productQtd: 1
    };
    fetch('./add-product-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.status);
            }
            loadCart();
            return response.json();
        })
        .then(data => {
            return fetch('./cart-itens');
        })
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
            console.error('Erro:', error);
        });
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
    searchText.textContent = productSearch;
} else {
    getProductDataByCategory(productCategory);
}
