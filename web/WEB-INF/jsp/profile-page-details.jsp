<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <link rel="stylesheet" href="./styles/toast.css">
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
                    <div class="notifications"></div>
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
                            <div>
                                <form action="" class="user-datails-form" name="user-datails-form">
                                    <div class="field-wrapper hasValue">
                                        <input type="text" name="fullName" id="full-name">
                                        <div class="field-placeholder"><span>Nome Completo</span></div>
                                    </div>
                                    <div class="field-wrapper hasValue">
                                        <input type="text" name="cpf" id="cpf">
                                        <div class="field-placeholder"><span>CPF</span></div>
                                    </div>
                                    <div class="field-wrapper hasValue">
                                        <input type="date" name="birth-date" id="birthDate">
                                        <div class="field-placeholder"><span>Data de Nascimento</span></div>
                                    </div>
                                    <div class="field-wrapper hasValue">
                                        <input type="tel" name="phone" id="phone">
                                        <div class="field-placeholder"><span>Telefone Celular</span></div>
                                    </div>
                                </form>
                            </div>
                            <div class="container-buttons d-flex justify-content-center p-3 gap-3">
                                <button class="btn btn-outline-primary">ALTERAR NOME DE USUARIO</button>
                                <button class="btn btn-outline-primary">ALTERAR SENHA</button>
                            </div>
                        </section>
                        <section class="container-address d-flex flex-column">
                            <div class="header-container d-flex">
                                <i class="fa-solid fa-location-dot"></i>
                                <h2>Endereços</h2>
                            </div>
                            <div class="address-list-container">
                                <ul class="address-list">
                                </ul>
                            </div>
                            <div class="container-buttons">
                                <button data-toggle="modal" data-target="#address-modal"
                                    class="btn btn-outline-primary">CADASTRAR ENDEREÇO</button>
                            </div>
                        </section>
                    </div>
                    <div class="modal fade" id="address-modal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <form id="address-form" name="address-form" action="insert-address" method="POST">
                                        <div class="field-wrapper hasValue">
                                            <input type="text" name="cepAddress" id="cep-address" maxlength="8"
                                                minlength="8" required>
                                            <div class="field-placeholder"><span>CEP</span></div>
                                        </div>
                                        <div class="field-wrapper hasValue">
                                            <input type="text" name="streetAddress" id="street-address" disabled
                                                required data-input>
                                            <div class="field-placeholder"><span>Rua</span></div>
                                        </div>
                                        <div class="field-wrapper hasValue">
                                            <input type="text" name="numberAddress" id="number-address" disabled
                                                required data-input>
                                            <div class="field-placeholder"><span>Numero</span></div>
                                        </div>
                                        <div class="field-wrapper hasValue">
                                            <input type="text" name="cityAddress" id="city-address" disabled required
                                                data-input>
                                            <div class="field-placeholder"><span>Cidade</span></div>
                                        </div>
                                        <div class="field-wrapper hasValue">
                                            <input type="text" name="neighborhood" id="neighborhood-adress" disabled
                                                required data-input>
                                            <div class="field-placeholder"><span>Bairro</span></div>
                                        </div>
                                        <div class="field-wrapper hasValue">
                                            <input type="text" name="complementAddress" id="complement-adress" disabled
                                                data-input>
                                            <div class="field-placeholder"><span>Complemento</span></div>
                                        </div>
                                        <div class="">
                                            <select name="state" class="form-select shadow-none" id="state-adress"
                                                disabled required data-input>
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
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Fechar</button>
                                            <button type="submit" class="btn btn-primary">Cadastrar</button>
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <script src="./js/profile-page-details.js"></script>
    <script src="./js/address-form.js"></script>
    <script src="./js/toast.js"></script>

    </html>