<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
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

                </div>
            </section>
        </main>
    </body>
    <script src="./js/sidebar-seller.js"></script>

    </html>