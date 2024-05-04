<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/header.css">
        <link rel="stylesheet" href="./styles/shoppingCart.css">
    </head>

    <body>
        <header>
            <div class="container-header d-flex">
                <div class="logo-container">
                    <a href="./home">
                        <img src="./assets/cesta.gif" alt="logo">
                    </a>
                </div>
                <div class="input-container">
                    <input type="text" class="form-control" id="inputSearch" name="search">
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div class="user-container">
                    <button id="user-button-open"><i class="fa-solid fa-user"></i></button>
                    <div class="box">
                        <ul>
                            <li><a href="./login-page">Entre</a></li>
                            <li><a href="./register-page">Cadastre-se</a></li>
                        </ul>
                    </div>
                </div>
                <div class="cart-container">
                    <button id="cart-button-open"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>
            </div>
            <div class="category-header">
                <nav>
                    <ul class="category d-flex">
                        <li><a href="./category-product">Ver todas as categorias</a></li>
                        <li><a href="#">Ofertas</a></li>
                        <li><a href="#">Saudável</a></li>
                        <li><a href="#">Hortifrúti</a></li>
                        <li><a href="#">Limpeza</a></li>
                        <li><a href="#">Papelaria</a></li>
                        <li><a href="#">Bebidas</a></li>
                        <li><a href="#">Petshop</a></li>
                    </ul>
                </nav>
            </div>
            <div class="container-cart-shopping">
                <div id="shoppingCart">
                    <header class="header-cart">
                        <button class="btn btn-outline-info" id="cart-button-close"><i
                                class="fa-solid fa-xmark text-light"></i></button>
                        <div class="text-light">Carrinho(<span id="cart-itens-qtd">0</span>)</div>
                    </header>
                    <div class="itens-cart-ul">
                        <ul class="list-group-item">
                        </ul>
                    </div>
                    <footer class="footer-cart">
                        <div class="table-values">
                            <table class="table table-borderless">
                                <tbody>
                                    <td class="text-td">Valor total</td>
                                    <td class="value-td">R$ <div id="total-price-footer"></div>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                        <div class="button-confirm">
                            <a href="./finalize" class="btn btn-success">FINALIZAR</a>
                        </div>
                    </footer>
                </div>
            </div>
        </header>
    </body>
    <script src="./js/shoppingCart.js"></script>
    </html>