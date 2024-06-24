<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <link rel="icon" type="image/x-icon" href="./assets/favicon.png">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/checkout-conclusion.css">
        <link rel="stylesheet" href="./styles/progress-bar.css">
        <title>Conclusão</title>
    </head>

    <body>
        <header>
            <div class="header-container">
                <div class="logo-container">
                    <a href="./home">
                        <img src="./assets/logo-header.png" alt="logo">
                    </a>
                </div>
            </div>
        </header>
        <main>
            <div class="progress-container">
                <div class="step cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <div class="text">Carrinho</div>
                </div>
                <div class="step payment">
                    <i class="fa-solid fa-credit-card"></i>
                    <div class="text">Pagamento</div>
                </div>
                <div class="step confirm">
                    <i class="fa-solid fa-eye"></i>
                    <div class="text">Confirmação</div>
                </div>
                <div class="step conclusion">
                    <i class="fa-solid fa-circle-check"></i>
                    <div class="text">Concluir</div>
                </div>
            </div>
            <div id="pix-container" class="container">
                <h1>PEDIDO REALIZADO COM SUCESSO!</h1>
                <p>AGORA É SÓ REALIZAR O PAGAMENTO</p>
                <div class="order-details">
                    <div class="qr-code">
                        <img src="./assets/qrcode-pix.png" alt="QR Code">
                        <button class="copy-button">COPIAR CÓDIGO PIX</button>
                        <input type="text"
                            value="00020126360014BR.GOV.BCB.PIX0114+556699684770452040000530398654040.015802BR5913Victor Viegas6008Londrina62070503***63047349"
                            id="pix-code" readonly style="position:absolute; left:-9999px;">
                    </div>
                    <div class="order-info">
                        <div class="validity">
                            <p>Aproveite! Este código tem validade de 12 horas.</p>
                        </div>
                        <div class="order-number">
                            <p>O número do seu pedido é:</p>
                            <h2 id="id-order">
                                <%= request.getAttribute("orderId") %>
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="payment-instructions">
                    <p>Escaneie o QR Code ou copie o código PIX. Abra o APP da instituição que você possui o PIX
                        cadastrado e realize o pagamento.</p>
                </div>
                <div class="actions">
                    <button class="home-button" onclick="window.location.href='./home'">Continuar Comprando</button>
                    <button class="orders-button" onclick="window.location.href='./my-orders'">Meus Pedidos</button>
                </div>
            </div>
            <div id="card-container" class="container">
                <h1>PEDIDO REALIZADO COM SUCESSO!</h1>
                <p>SEU PAGAMENTO FOI CONCLUÍDO</p>
                <div class="order-details">
                    <div class="order-info">
                        <div class="order-number">
                            <p>O número do seu pedido é:</p>
                            <h2 id="id-order">
                                <%= request.getAttribute("orderId") %>
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <button class="home-button" onclick="window.location.href='./home'">Continuar Comprando</button>
                    <button class="orders-button" onclick="window.location.href='./my-orders'">Meus Pedidos</button>
                </div>
            </div>
        </main>
        <%@include file="footer.jsp" %>
    </body>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <script src="./js/checkout-conclusion.js"></script>

    </html>