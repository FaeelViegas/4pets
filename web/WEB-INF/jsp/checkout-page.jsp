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
        <title>Revisão</title>
        <link rel="stylesheet" href="./styles/checkout.css">
        <link rel="stylesheet" href="./styles/progress-bar.css">
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
                    <div class="cart-container">
                        <div class="header-container">
                            <i class="fa-solid fa-basket-shopping"></i>
                            <span>PRODUTO</span>
                        </div>
                        <div class="itens-cart-ul">
                            <ul class="list-group-item">
                            </ul>
                        </div>
                    </div>
                    <!--<div class="coupon-container">
                </div>-->
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
                                <span class="values" id="total-value"><span>R$ </span>0.00</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Frete:</span>
                                <span class="values" id="frete"><span>R$ </span>0.00</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Total:</span>
                                <span class="values" id="total-order"><span>R$ </span>0.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="delivery-container">
                        <div class="header-container">
                            <i class="fa-solid fa-truck-fast"></i>
                            <span>ENTREGA</span>
                        </div>
                        <div class="delivery">
                            <div class="address d-flex flex-column p-2">
                                <div id="selectedAddress" class="address-selected d-flex flex-column">
                                    <h4 class="text-center m-0">SELECIONE UM ENDEREÇO!</h4>
                                </div>
                                <div class="d-flex gap-3 mt-2">
                                    <button id="selectAddressBtn" data-toggle="modal"
                                        data-target="#address-modal-selection"
                                        class="btn btn-outline-primary">Selecionar</button>
                                    <button id="registerAddressBtn" data-toggle="modal" data-target="#address-modal"
                                        class="btn btn-outline-primary">Cadastrar</button>
                                </div>
                            </div>
                            <div class="shipping-container">
                                <div class="shipping-selection d-flex p-3 gap-3 flex-column">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="payment-container">
                        <div class="button-container">
                            <a href="./payment-page" class="btn btn-success">IR PARA O PAGAMENTO</a>
                        </div>
                        <div class="back-container">
                            <a href="./home">VOLTAR AS COMPRAS</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="address-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Cadastre um novo endereço de entrega!
                            </h5>
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
                                aria-label="Close"><i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="address-form" name="address-form" action="insert-address-checkout" method="POST">
                                <div class="field-wrapper hasValue">
                                    <input type="text" name="cepAddress" id="cep-address" maxlength="8" minlength="8"
                                        required>
                                    <div class="field-placeholder"><span>CEP</span></div>
                                </div>
                                <div class="field-wrapper hasValue">
                                    <input type="text" name="streetAddress" id="street-address" disabled required
                                        data-input>
                                    <div class="field-placeholder"><span>Rua</span></div>
                                </div>
                                <div class="field-wrapper hasValue">
                                    <input type="text" name="numberAddress" id="number-address" disabled required
                                        data-input>
                                    <div class="field-placeholder"><span>Numero</span></div>
                                </div>
                                <div class="field-wrapper hasValue">
                                    <input type="text" name="cityAddress" id="city-address" disabled required
                                        data-input>
                                    <div class="field-placeholder"><span>Cidade</span></div>
                                </div>
                                <div class="field-wrapper hasValue">
                                    <input type="text" name="neighborhood" id="neighborhood-adress" disabled required
                                        data-input>
                                    <div class="field-placeholder"><span>Bairro</span></div>
                                </div>
                                <div class="field-wrapper hasValue">
                                    <input type="text" name="complementAddress" id="complement-adress" disabled
                                        data-input>
                                    <div class="field-placeholder"><span>Complemento</span></div>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <select name="state" class="form-select shadow-none" id="state-adress" disabled
                                        required data-input>
                                        <option selected>Estado</option>
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="address-modal-selection" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Selecione um novo endereço de entrega!
                            </h5>
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
                                aria-label="Close"><i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="address-selection">
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="closeModalBtn" class="btn btn-secondary"
                                    data-dismiss="modal">Fechar</button>
                                <button type="submit" id="confirmAddressBtn" class="btn btn-primary">Confirmar</button>
                            </div>
                            </form>
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
    <script src="./js/checkout.js"></script>
    <script src="./js/address-form.js"></script>

    </html>