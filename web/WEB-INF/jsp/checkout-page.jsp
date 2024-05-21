<!DOCTYPE html>
<html lang="pt-br">

<head>
    <script src="https://kit.fontawesome.com/52a6b206fa.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout</title>
    <link rel="stylesheet" href="./styles/checkout.css">
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
                <div class="coupon-container">
                </div>
            </div>
            <div class="container-right">
                <div class="resume-container">
                    <div class="header-container">
                        <i class="fa-solid fa-clipboard-list"></i>
                        <span>RESUMO</span>
                    </div>
                </div>
                <div class="delivery-container">
                    <div class="header-container">
                        <i class="fa-solid fa-truck-fast"></i>
                        <span>ENTREGA</span>
                    </div>
                </div>
                <div class="payment-container">
                    <div class="button-container">
                        <a href="#" class="btn btn-success">IR PARA O PAGAMENTO</a>
                    </div>
                    <div class="back-container">
                        <a href="./home">VOLTAR AS COMPRAS</a>
                    </div>
                </div>
            </div>
        </div>
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
<script src="./js/checkout.js"></script>

</html>