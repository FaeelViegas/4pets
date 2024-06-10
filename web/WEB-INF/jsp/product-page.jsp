<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <link rel="icon" type="image/x-icon" href="./assets/favicon.png">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="./styles/product-page.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>4pets</title>
    </head>

    <body>
        <%@include file="header.jsp" %>
            <main>
                <div class="container">
                    <div class="container-left">
                        <div class="container-product">
                            <div class="image-container">
                                <img src="https://m.media-amazon.com/images/I/61XJEwvCL8L.__AC_SX300_SY300_QL70_ML2_.jpg"
                                    alt="">
                            </div>
                            <div class="name-container">
                                <span class="name-product">
                                    Areia Higiênica Meau Biodegradável Grãos Finos para Gatos
                                </span>
                            </div>
                            <div class="store-container">
                                <div class="store-box">
                                    <div class="image-store">
                                        <img src="https://th.bing.com/th/id/OIG1.11Gugw8LYngGg_x0Uasp?w=1024&h=1024&rs=1&pid=ImgDetMain"
                                            alt="imagem">
                                    </div>
                                    <span>Paws Bites</span>
                                </div>
                            </div>
                        </div>
                        <div class="product-details">
                            <button class="section-header"><i class="fa-solid fa-list"></i>Informações</button>
                            <div class="section-content">
                            </div>
                        </div>
                    </div>
                    <div class="container-right">
                        <div class="product-value">
                            <div>
                                <span class="d-flex value-product pt-3 pb-3">
                                    R$ 204,90
                                </span>
                            </div>
                            <div class="d-flex justify-content-around">
                                <span>Quantas unidades?</span>
                                <input id="qtd-input" type="number" value="1" min="1" max="10" step="1" />
                            </div>
                            <div class="d-flex justify-content-center pt-3 pb-3">
                                <button class="btn-add">Adicionar ao carrinho</button>
                            </div>
                        </div>
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
    <script src="./js/product-page.js"></script>

    </html>