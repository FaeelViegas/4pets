document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    getProductData(productId);
    setTimeout(() => {
        var headers = document.querySelectorAll('.section-header');
        headers.forEach(function (header) {
            header.addEventListener('click', function () {
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }, "50");
});

function createProduct(product) {
    const card = document.createElement('div');
    card.classList.add('container');

    // Converter os bytes da imagem para uma string Base64
    const base64Image = arrayBufferToBase64(product.image);
    card.innerHTML = `
            <div class="container-left">
            <div class="container-product">
                <div class="image-container">
                    <img src="data:image/png;base64,${base64Image}"
                        alt="${product.name}">
                </div>
                <div class="name-container">
                    <span class="name-product">
                        ${product.name}
                    </span>
                </div>
                <div class="store-container">
                    <div class="store-box">
                        <div class="image-store">
                            <img src="https://th.bing.com/th/id/OIG1.11Gugw8LYngGg_x0Uasp?w=1024&h=1024&rs=1&pid=ImgDetMain"
                                alt="imagem">
                        </div>
                        <span>${product.store} </span>
                    </div>
                </div>
            </div>
            <div class="product-details">
                <button class="section-header"><i class="fa-solid fa-list"></i>Informações</button>
                <div class="section-content">
                    <pre>
                        ${product.description} 
                    </pre>
                </div>
            </div>
        </div>
        <div class="container-right">
            <div class="product-value">
                <div>
                    <span class="d-flex value-product pt-3 pb-3">
                        R$ ${product.price.toFixed(2)}
                    </span>
                </div>
                <div class="d-flex justify-content-around">
                    <span>Quantas unidades?</span>
                    <input id="qtd-input" type="number" value="1" min="1" max="${product.quantity}" step="1" />
                </div>
                <div class="d-flex justify-content-center pt-3 pb-3">
                    <button class="btn-add" onclick="addToCart(${product.idProduct}, '${product.name}', ${product.price},'${base64Image}','${product.quantity}')">Adicionar ao carrinho</button>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Envia uma solicitação para o backend com os dados do produto
function addToCart(productId, productName, productPrice, productImage, stock) {
    let qtd = document.getElementById('qtd-input').value;
    let qtdInt = parseInt(qtd, 10);


    const data = {
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        stock: stock,
        productQtd: qtdInt
    };
    console.log(data)
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
            let qtd = document.getElementById('qtd-input').value = 1;
            loadCartProduct(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
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

//função que carregar o produto
function loadProduct(product) {
    const container = document.querySelector('main');
    product.forEach(product => {
        const card = createProduct(product);
        container.appendChild(card);
    });
}

function getProductData(productId) {
    fetch('./product-item?id=' + productId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do produto');
            }
            return response.json();
        })
        .then(data => {
            loadProduct(data);
            console.log(data)
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
