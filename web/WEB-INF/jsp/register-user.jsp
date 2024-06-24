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
        <link rel="stylesheet" href="./styles/toast.css">
        <link rel="stylesheet" href="./styles/register-user.css">
        <title>Cadastro</title>
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
                <form name="frmRegister" action="insert-user" method="post">
                    <h1>CRIAR CONTA</h1>
                    <div class="btn-login">
                        <a href="#" class="btn-google btn btn-dark"><i class="fa-brands fa-google"></i></a>
                        <a href="#" class="btn-face btn btn-dark"><i class="fa-brands fa-facebook"></i></a>
                    </div>
                    <div class="span-container d-flex">
                        <hr>
                        <span>ou</span>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="inputName" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="inputName" name="name">
                        </div>
                        <div class="col mb-3">
                            <label for="inputCpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="inputCpf" name="cpf" maxlength="14"
                                onkeyup="handleCpf(event)">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="inputPhone" class="form-label">Telefone</label>
                            <input type="tel" class="form-control" id="inputPhone" name="phone" maxlength="15"
                                onkeyup="handlePhone(event)">
                        </div>
                        <div class="col mb-3">
                            <label for="inputDate" class="form-label">Data de Nascimento</label>
                            <input type="date" class="form-control" id="inputDate" name="date">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="inputUser" class="form-label">Nome de Usuario</label>
                            <input type="text" class="form-control" id="inputUser" name="user">
                        </div>
                        <div class="col mb-3">
                            <label for="inputPassword" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="inputPassword" name="password">
                        </div>
                    </div>
                    <div class="btn-confirm">
                        <input class="btn btn-dark" type="button" value="Cadastrar" onclick="validate()">
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
    <script src="./js/register-user.js"></script>
    <script src="./js/toast.js"></script>

    </html>