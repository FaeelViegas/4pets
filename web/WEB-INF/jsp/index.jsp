<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pr-br">

    <head>
        <link rel="icon" type="image/x-icon" href="./assets/favicon.png">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/cardProduct.css">
        <link rel="stylesheet" href="./styles/home.css">
        <title>Home</title>
    </head>

    <body>
        <%@include file="header.jsp" %>
            <main>
                <h2 class="title-carousel">Produtos que você encontra na 4Pets!</h2>
                <div class="c-carousel c-carousel--simple">
                    <div class="c-carousel__slides js-carousel--products d-flex">
                    </div>
                    <div class="carousel-buttons d-flex justify-content-center">
                        <button class="js-carousel--simple-prev btn-slide m-2" aria-label="Anterior"><i
                                class="fa-solid fa-arrow-left"></i></button>
                        <button class="js-carousel--simple-next btn-slide m-2" aria-label="Próximo"><i
                                class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
                <section class="prominence-market">
                    <h2 class="title-carousel">Lojas em destaque!</h2>
                    <div class="c-carousel c-carousel--simple">
                        <div class="carousel-buttons d-flex justify-content-center">
                            <button class="js-carousel--simple-prev btn-slide m-2" aria-label="Anterior"><i
                                    class="fa-solid fa-arrow-left"></i></button>
                        </div>
                        <div class="c-carousel__slides js-carousel--market d-flex">
                            <div class="market-card">
                                <img src="#" alt="imagem">
                            </div>
                        </div>
                        <div class="carousel-buttons d-flex justify-content-center">
                            <button class="js-carousel--simple-next btn-slide m-2" aria-label="Próximo"><i
                                    class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </section>

            </main>
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
    <script src="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js"></script>
    <script src="./js/home.js"></script>
    <script src="./js/carousel.js"></script>

    </html>