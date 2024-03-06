jQuery(document).ready(function () {
  "use script";
  /*burger button*/
  var burger = $(".burger__btn");
  burger.on("click", function(event){
    event.preventDefault();
    $(this).toggleClass("burger__btn--active");
  });
  /*intro slider*/
  var introSlider = $("#introSlider");
  introSlider.slick({
    dots: true,
    slidesToShow: 1,
    autoplay: false,
    dotsClass: "intro__slider--dots",
    draggable: false,
    arrows: true,
    prevArrow: '<button type="button" class="intro__slider--prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="intro__slider--next"><i class="fas fa-chevron-right"></i></button>',
  });
});