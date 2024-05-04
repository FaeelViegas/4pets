const cartButtonOpen = document.getElementById('cart-button-open');
const cartButtonClose = document.getElementById('cart-button-close');
let priceFooter = document.getElementById('total-price-footer');

//adiciona e remove a class 'active' do elemento 'shoppingCart'
function toggleMenu(event) {
    const menu = document.getElementById('shoppingCart');
    menu.classList.toggle('active');
}

cartButtonOpen.addEventListener('click', toggleMenu);
cartButtonClose.addEventListener('click', toggleMenu);