jQuery(document).ready(function () {
  "use script";
  /*burger button*/
  var burger = $(".burger__btn");
  burger.on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("burger__btn--active");
    $(".nav__menu").toggleClass("nav__menu--open");
  });
  /*intro slider*/
  var introSlider = $("#introSlider");
  introSlider.slick({
    dots: true,
    slidesToShow: 1,
    autoplay: false,
    dotsClass: "intro__slider--dots",
    draggable: false,
    touchMove: false,
    focusOnSelect: false,
    swipe: false,
    arrows: true,
    prevArrow: '<button type="button" class="intro__slider--prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="intro__slider--next"><i class="fas fa-chevron-right"></i></button>',
  });
  /*main product slider*/
  var productSlider = $("#productSlider");
  productSlider.slick({
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: false,
    touchMove: false,
    focusOnSelect: false,
    swipe: false,
    arrows: true,
    prevArrow: '<button type="button" class="product__slider--prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="product__slider--next"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 678,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  /*back top button*/
  var backTop = $("#backTop");
  var introHeight = $(".intro").height();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= (introHeight || 800)) {
      backTop.addClass("back__top--active");
    } else {
      backTop.removeClass("back__top--active");
    }
  });
  backTop.on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0,
    }, 1000, "swing");
  });
  /*lightbox tovar galery*/
  lightbox.option({
    resizeDuration: 500,
    fadeDuration: 500,
    disableScrolling: true,
    wrapAround: true,
  })
});