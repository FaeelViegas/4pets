function createProductRow(product) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <th scope="row">${product.idProduct}</th>
        <td>${product.name}</td>
        <td>R$ ${product.price.toFixed(2)}</td>
        <td>${product.description}</td>
        <td>${product.quantity}</td>
    `;

    return row;
}

function loadProductsIntoTable(products) {
    const tableBody = document.querySelector('.container .table tbody');

    products.forEach(product => {
        const row = createProductRow(product);
        tableBody.appendChild(row);
    });
}

fetch('./get-products-seller')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter dados dos produtos');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        loadProductsIntoTable(data);
    })
    .catch(error => {
        console.error(error);
    });
