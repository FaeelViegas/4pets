<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <link rel="icon" type="image/x-icon" href="./assets/favicon.png">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Produtos</title>
        <link rel="stylesheet" href="./styles/toast.css">
        <link rel="stylesheet" href="./styles/sidebar-seller.css">
        <link rel="stylesheet" href="./styles/dashboard-products.css">
    </head>

    <body>
        <main>
            <div class="notifications"></div>
            <div class="sidebar close">
                <!--logo do menu lateral-->
                <div class="logo-details">
                    <a href="./home">
                        <img src="./assets/logo-header.png" alt="logo 4pets">
                    </a>
                </div>
                <!--opções do menu lateral-->
                <ul class="nav-links">
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-chart-line"></i>
                            <span class="link_name">Painel de Controle</span>
                        </a>
                        <ul class="sub-menu blank">
                            <li><a class="link_name" href="#">Painel de Controle</a></li>
                        </ul>
                    </li>
                    <!--opção projetos do menu com sub menu-->
                    <li>
                        <div class="icon-link">
                            <a href="#">
                                <i class="fa-solid fa-box"></i>
                                <span class="link_name">Produto</span>
                            </a>
                            <i class='bx bxs-chevron-down arrow'></i>
                        </div>
                        <!--sub menu da opção projetos do menu lateral-->
                        <ul class="sub-menu">
                            <li><a href="./dashboard">Cadastrar Produtos</a></li>
                            <li><a href="./product-list-seller">Listar Produtos</a></li>
                        </ul>
                    </li>
                    <!--perfil do usuario-->
                    <li>
                        <div class="profile-details">
                            <div class="profile-content">
                                <img src="./assets/favicon.png" alt="profileImg">
                            </div>
                            <c:when test="${not empty sessionScope.seller}">
                                <div class="name-job">
                                    <div class="profile_name">${sessionScope.seller}</div>
                                </div>
                            </c:when>
                            <a href="./logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
                        </div>
                    </li>
                </ul>
            </div>
            <!--botão do menu-->
            <section class="home-section">
                <div class="home-content">
                    <i class="fa-solid fa-bars"></i>
                    <span class="text">Dashboard</span>
                </div>
                <!--conteudo da pagina-->
                <div class="container m-5">
                    <h1>Produtos Cadastrados</h1>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Estoque</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
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
    <script src="./js/toast.js"></script>
    <script src="./js/sidebar-seller.js"></script>
    <script src="./js/table-products.js"></script>

    </html>