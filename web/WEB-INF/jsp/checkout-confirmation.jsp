<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <link rel="icon" type="image/x-icon" href="./assets/favicon.png">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmação</title>
        <link rel="stylesheet" href="./styles/progress-bar.css">
        <link rel="stylesheet" href="./styles/checkout-confirmation.css">
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
            <div class="container">
                <div class="container-left">
                    <div class="payment-container">
                        <div class="header-container">
                            <i class="fa-solid fa-user"></i>
                            <span>DADOS PESSOAIS</span>
                        </div>
                    </div>
                </div>
                <div class="container-right">
                    <div class="resume-container">
                        <div class="header-container">
                            <i class="fa-solid fa-clipboard-list"></i>
                            <span>RESUMO</span>
                        </div>
                        <div class="resume d-flex p-3">
                            <div class="d-flex justify-content-between">
                                <span>Valor total dos produtos:</span>
                                <span class="values" id="total-value">R$ 0</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Frete:</span>
                                <span class="values" id="frete">R$ 0</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Total:</span>
                                <span class="values" id="total-order">R$ 0</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Metodo de Pagamento:</span>
                                <span class="values" id="method-order"></span>
                            </div>
                        </div>
                    </div>
                    <div class="confirm-container">
                        <div class="button-container">
                            <a href="#" class="btn btn-success">FINALIZAR</a>
                        </div>
                        <div class="back-container">
                            <a href="./payment-page">VOLTAR</a>
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

    </html>