function validateNumber(input) {
    input.value = input.value.replace(/[^0-9.]/g, '');
}

function validateForm() {
    const image = document.getElementById('image').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const quantity = document.getElementById('quantity').value;
    const description = document.getElementById('description').value;

    if (!image || !name || !price || !category || !quantity || !description) {
        errorToast('Todos os campos são obrigatórios.');
        return false;
    }

    const pricePattern = /^\d+(\.\d{1,2})?$/;
    if (!price.match(pricePattern)) {
        errorToast('Por favor, insira um valor válido para o preço.');
        return false;
    }

    const quantityPattern = /^\d+$/;
    if (!quantity.match(quantityPattern)) {
        errorToast('Por favor, insira um número válido para a quantidade.');
        return false;
    }
    document.getElementById('product-form').submit();
}