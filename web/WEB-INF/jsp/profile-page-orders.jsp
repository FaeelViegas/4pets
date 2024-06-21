<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <link rel="icon" type="image/x-icon" href="./assets/favicon.png">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/profile-page-orders.css">
        <link rel="stylesheet" href="./styles/cardOrder.css">
        <title>Pedidos</title>
    </head>

    <body>
        <%@include file="header.jsp" %>
            <%@include file="sidebar-user.jsp" %>
                <main>
                    <div class="container">
                        <h2>MEUS PEDIDOS</h2>
                        <div class="order-ul">
                            <ul class="order-list">
                                <li>
                                    <div class="order-card" onclick="toggleItems('order1-items')">
                                        <div class="order-header">
                                            <div class="order-id">Pedido #12345</div>
                                            <div class="order-status">Status: Pago</div>
                                            <div class="order-date">Data: 21/06/2024</div>
                                            <div class="order-time">Hora: 14:30</div>
                                        </div>
                                        <div class="order-body">
                                            <div class="order-payment-method">Método de Pagamento: Cartão de Crédito
                                            </div>
                                            <div class="order-total">Total: R$ 150,00</div>
                                        </div>
                                        <ul class="list-itens-order" id="order1-items">
                                            <li>
                                                <section class="item-cart" id="${cartItens.idProduct}">
                                                    <div class="image-cart">
                                                        <img src="https://images.kabum.com.br/produtos/fotos/181089/processador-amd-ryzen-7-5700g-3-8ghz-4-6ghz-max-turbo-am4-video-integrado-8-nucleos-100-100000263box_1627588652_gg.jpg"
                                                            alt="">
                                                    </div>
                                                    <div class="container-name-cartt">
                                                        <span>Processador AMD Ryzen 7 5700G, 3.8GHz (4.6GHz Max
                                                            Turbo),
                                                            Cache 20MB, 8 Núcleos, 16 Threads, Vídeo Integrado, AM4
                                                            -
                                                            100-100000263BOX</span>
                                                    </div>
                                                    <div class="container-value-cartt">
                                                        <div>
                                                            <span>Quantidade:</span>
                                                            <span>0</span>
                                                        </div>
                                                        <div>
                                                            <span>Valor:</span>
                                                            <span>R$ 0</span>
                                                        </div>
                                                    </div>
                                                </section>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
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
    <script src="./js/cardOrder.js"></script>

    </html>