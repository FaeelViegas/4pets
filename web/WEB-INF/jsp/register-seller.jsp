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
        <title>Cadastro</title>
        <link rel="stylesheet" href="./styles/toast.css">
        <link rel="stylesheet" href="./styles/register-seller.css">
    </head>

    <body>
        <header>
            <div class="image-home">
                <a href="./home">
                    <img src="./assets/logo-header.png" alt="forpets">
                </a>
            </div>
        </header>
        <main>
            <div class="notifications"></div>
            <div>
            </div>
            <section class="container">
                <form name="frmSellerRegister" action="insert-seller" method="post">
                    <h1>REGISTRAR VENDEDOR</h1>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="inputSellerName" class="form-label">Nome do Vendedor</label>
                            <input type="text" class="form-control" id="inputSellerName" name="sellerName" required>
                        </div>
                        <div class="col mb-3">
                            <label for="inputStoreName" class="form-label">Nome da Loja</label>
                            <input type="text" class="form-control" id="inputStoreName" name="storeName" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="inputTypeIdentification" class="form-label">Tipo de Identificação</label>
                            <select class="form-control" id="inputTypeIdentification" name="typeIdentification"
                                onchange="toggleIdentificationFields()" required>
                                <option value="CPF">CPF</option>
                                <option value="CNPJ">CNPJ</option>
                            </select>
                        </div>
                        <div class="col mb-3">
                            <label for="inputNumberIdentification" class="form-label">Número de Identificação</label>
                            <input type="text" class="form-control" id="inputNumberIdentification"
                                name="numberIdentification" onkeyup="handleIdentification(event)" required>
                        </div>
                    </div>
                    <div class="row" id="businessNameDiv" style="display: none;">
                        <div class="col mb-3">
                            <label for="inputBusinessName" class="form-label">Nome Empresarial</label>
                            <input type="text" class="form-control" id="inputBusinessName" name="businessName">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="inputStoreEmail" class="form-label">Email da Loja</label>
                            <input type="email" class="form-control" id="inputStoreEmail" name="storeEmail" required>
                        </div>
                        <div class="col mb-3">
                            <label for="inputStorePhone" class="form-label">Telefone da Loja</label>
                            <input type="tel" class="form-control" id="inputStorePhone" name="storePhone" maxlength="15"
                                onkeyup="handlePhone(event)" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="inputPassword" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="inputPassword" name="password" required>
                        </div>
                    </div>
                    <div class="btn-confirm">
                        <input class="btn btn-dark" type="button" value="Cadastrar" onclick="validateSeller()">
                    </div>
                    <div class="redirect-cont">
                        <span>Ja possui cadastro? <a href="./login-seller-page">Entre</a></span>
                    </div>
                </form>
            </section>
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
    <script src="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js"></script>
    <script src="./js/toast.js"></script>
    <script src="./js/register-seller.js"></script>

    </html>