<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <link rel="icon" type="image/x-icon" href="./assets/favicon.png">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="./styles/profile-page-details.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <%@include file="header.jsp" %>
            <%@include file="sidebar-user.jsp" %>
                <main>
                    <div class="title d-flex">
                        <i class="fa-solid fa-user"></i>
                        <h2>Meus Dados</h2>
                    </div>
                    <div class="container">
                        <section class="container-details">
                            <div class="header-container d-flex">
                                <i class="fa-solid fa-newspaper"></i>
                                <h2>Dados Basicos</h2>
                            </div>
                            <form action="">
                                <div class="field-wrapper">
                                    <input type="text" name="full-name" id="">
                                    <div class="field-placeholder"><span>Nome Completo</span></div>
                                </div>
                                <div class="field-wrapper">
                                    <input type="text" name="phone" id="">
                                    <div class="field-placeholder"><span>Telefone Celular</span></div>
                                </div>
                            </form>
                        </section>
                        <section class="container-address">
                            <div class="header-container d-flex">
                                <i class="fa-solid fa-location-dot"></i>
                                <h2>Endereços</h2>
                            </div>
                        </section>
                    </div>
                </main>
    </body>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <script src="./js/profile-page-details.js"></script>

    </html>