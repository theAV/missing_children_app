$(document).ready(function() {
    if ($('.intro-slider').length) {
        $('.intro-slider').owlCarousel({
            items: 1,
            lazyLoad: true,
            animateOut: 'fadeOut',
            loop: true,
            dots: false,
            nav: false,
            mouseDrag: false,
            touchDrag: false,
            pullDrag: false,
            autoplay: true
        });
    }
});