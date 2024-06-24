setTimeout(() => {
    const $loader = document.getElementById('loader');
    $loader.classList.remove('active');
    const $loading = document.getElementById('loading');
    $loading.classList.remove('act');

}, "990");

setTimeout(() => {
    const $simpleCarousel = document.querySelector(".js-carousel--products");
    const $carouselMarket = document.querySelector(".js-carousel--market");

    new Glider($carouselMarket, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dragVelocity: 2,
        duration: 5,
        arrows: {
            prev: ".js-carousel--market-prev",
            next: ".js-carousel--market-next",
        },
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
        ],
    });
    new Glider($simpleCarousel, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dragVelocity: 2,
        duration: 5,
        arrows: {
            prev: ".js-carousel--simple-prev",
            next: ".js-carousel--simple-next",
        },
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
        ],
    });
}, "1000");
