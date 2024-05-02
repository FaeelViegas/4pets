<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/toast.css">
        <title>Login</title>
    </head>

    <body>
        <main>
            <div class="notifications"></div>
            <div>
                <h1>LOGIN</h1>
                <form action="login-user" name="frmLogin">
                    <div class="container">
                        <div class="input-group mb-3 z-index-0">
                            <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"
                                    style="color: #2e2e2e;"></i></span>
                            <input type="text" name="user" class="form-control" placeholder="Nome de Usuario"
                                aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon2"><i class="fa-solid fa-lock"
                                    style="color: #404040;"></i></span>
                            <input type="password" name="password" class="form-control" placeholder="Senha"
                                aria-label="Password" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input type="button" class="button-enter btn btn-dark" value="ENTRAR" onclick="validate()">
                    </div>
                </form>
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
    <script src="./js/toast.js"></script>
    <script src="./js/login-user.js"></script>
    </html>