const $simpleCarousel = document.querySelector(".js-carousel--simple");

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
                draggable: false,
            },
        },
    ],
});