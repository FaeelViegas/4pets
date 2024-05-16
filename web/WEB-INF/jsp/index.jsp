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
                <section class="products-4pets">
                    <h2 class="title-carousel">Produtos que você encontra na 4Pets!</h2>
                    <div class="c-carousel c-carousel--products">
                        <div class="c-carousel__slides js-carousel--products d-flex">
                            <div id="loading" class="act">
                                <div id="loader" class="active"></div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-buttons d-flex justify-content-center">
                        <button class="js-carousel--simple-prev btn-slide m-2" aria-label="Anterior"><i
                                class="fa-solid fa-arrow-left"></i></button>
                        <button class="js-carousel--simple-next btn-slide m-2" aria-label="Próximo"><i
                                class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </section>
                <section class="prominence-market">
                    <h2 class="title-carousel">Lojas em destaque!</h2>
                    <div class="c-carousel c-carousel--market">
                        <div class="carousel-buttons d-flex justify-content-center align-items-center">
                            <button class="js-carousel--market-prev btn-slide m-2" aria-label="Anterior"><i
                                    class="fa-solid fa-arrow-left"></i></button>
                        </div>
                        <div class="c-carousel__slides js-carousel--market d-flex">
                            <div class="market-card">
                                <img src="https://th.bing.com/th/id/OIG4.UWYTWn7Twta3xCdH1aoH?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="imagem">
                            </div>
                            <div class="market-card">
                                <img src="https://th.bing.com/th/id/OIG4.zEyv7HJGbmmiZnjZsW8v?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="imagem">
                            </div>
                            <div class="market-card">
                                <img src="https://th.bing.com/th/id/OIG2.imAKInQ3Mj9o35_2XM.h?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="imagem">
                            </div>
                            <div class="market-card">
                                <img src="https://th.bing.com/th/id/OIG1.AR6SVoVcJ_2s31vjMohz?pid=ImgGn" alt="imagem">
                            </div>
                            <div class="market-card">
                                <img src="https://th.bing.com/th/id/OIG1.11Gugw8LYngGg_x0Uasp?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="imagem">
                            </div>
                            <div class="market-card">
                                <img src="https://th.bing.com/th/id/OIG1.Ab9Q.yMNr5F8xYEEhWXL?pid=ImgGn" alt="imagem">
                            </div>
                            <div class="market-card">
                                <img src="https://th.bing.com/th/id/OIG2.D13xT3inOxvnPC722.N_?pid=ImgGn" alt="imagem">
                            </div>
                        </div>
                        <div class="carousel-buttons d-flex justify-content-center align-items-center">
                            <button class="js-carousel--market-next btn-slide m-2" aria-label="Próximo"><i
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