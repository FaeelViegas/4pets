<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <meta charset="UTF-8">
        <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard</title>
        <link rel="stylesheet" href="./styles/sidebar-seller.css">
    </head>

    <body>
        <main>
            <div class="sidebar close">
                <!--logo do menu lateral-->
                <div class="logo-details">
                    <img src="./assets/logo-header.png" alt="logo 4pets">
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
                            <a href="./project-list.html">
                                <i class="fa-solid fa-box"></i>
                                <span class="link_name">Produto</span>
                            </a>
                            <i class='bx bxs-chevron-down arrow'></i>
                        </div>
                        <!--sub menu da opção projetos do menu lateral-->
                        <ul class="sub-menu">
                            <li><a href="./project-register.html">Produtos</a></li>
                        </ul>
                    </li>
                    <!--perfil do usuario-->
                    <li>
                        <div class="profile-details">
                            <div class="profile-content">
                                <img src="" alt="profileImg">
                            </div>
                            <div class="name-job">
                                <div class="profile_name">Victor Rafaeel</div>
                            </div>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
                <div class="container">
                    <h1>PRODUTO</h1>
                    <form action="insert-product" enctype="multipart/form-data" method="post">
                        IMAGEM
                        <input type="file" name="image" class="form-control" placeholder="Carregue a imgaem"
                            aria-label="Username" aria-describedby="basic-addon1">
                        Nome
                        <input type="text" name="name" class="form-control" placeholder="Nome do produto"
                            aria-label="Username" aria-describedby="basic-addon1">
                        VALOR
                        <input type="text" name="price" class="form-control" placeholder="Valor do produtos"
                            aria-label="Username" aria-describedby="basic-addon1">
                        CATEGORIA
                        <input type="text" name="category" class="form-control" placeholder="categoria"
                            aria-label="Username" aria-describedby="basic-addon1">
                        VENDEDOR
                        <input type="text" name="seller" class="form-control" placeholder="vendedor"
                            aria-label="Username" aria-describedby="basic-addon1">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Descrição</span>
                            </div>
                            <textarea class="form-control" name="description" aria-label="With textarea"></textarea>
                        </div>
                        <input type="submit" value="ENVIAR">
                    </form>
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
    <script src="./js/sidebar-seller.js"></script>

    </html>