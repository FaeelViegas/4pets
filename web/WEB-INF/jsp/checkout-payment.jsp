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
        <title>Pagamento</title>
        <link rel="stylesheet" href="./styles/checkout-payment.css">
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
            <div class="container">
                <div class="container-left">
                    <div class="payment-container">
                        <div class="header-container">
                            <i class="fa-solid fa-credit-card"></i>
                            <span>METODO DE PAGAMENTO</span>
                        </div>
                        <div class="container-method mt-1">
                            <form onsubmit="return validateForm()">
                                <div class="payment-method">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" id="pix" name="paymentMethod" class="custom-control-input"
                                            onclick="togglePaymentDetails()">
                                        <label class="custom-control-label" for="pix">PIX</label>
                                    </div>
                                </div>

                                <div class="payment-method">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" id="creditCard" name="paymentMethod"
                                            class="custom-control-input" onclick="togglePaymentDetails()">
                                        <label class="custom-control-label" for="creditCard">Cartão de Crédito</label>
                                    </div>
                                    <div id="creditCardDetails" style="display: none;">
                                        <div class="form-group mt-3">
                                            <label for="cardNumber">Número do Cartão</label>
                                            <input type="text" class="form-control" id="cardNumber"
                                                placeholder="Número do Cartão">
                                        </div>
                                        <div class="form-group">
                                            <label for="cardName">Nome Impresso no Cartão</label>
                                            <input type="text" class="form-control" id="cardName"
                                                placeholder="Nome Impresso no Cartão">
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="cardExpiry">Validade</label>
                                                <input type="month" class="form-control" id="cardExpiry"
                                                    placeholder="MM/AA">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="cardCVV">Código de Verificação</label>
                                                <input type="text" class="form-control" id="cardCVV" placeholder="CVV">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="cardCPF">CPF/CNPJ do titular</label>
                                            <input type="text" class="form-control" id="cardCPF"
                                                placeholder="CPF/CNPJ do titular">
                                        </div>
                                        <div class="form-group">
                                            <label for="paymentDate">Data de pagamento</label>
                                            <input type="date" class="form-control" id="paymentDate">
                                        </div>
                                        <p class="mt-2">Forma de pagamento: À vista - Até 10% de desconto - R$ 326,82
                                        </p>
                                    </div>
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
                            </div>
                        </div>
                        <div class="confirm-container">
                            <div class="button-container">
                                <a href="./payment-page" class="btn btn-success">CONTINUAR</a>
                            </div>
                            <div class="back-container">
                                <a href="./home">VOLTAR</a>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
        <%@include file="footer.jsp" %>
    </body>

    </html>