jQuery(document).ready(function () {
   "use script";
   /*active clas to cat item*/
   var catArrBtn = $(".product__menu--item");
   catArrBtn.on("click", function (event) {
      event.preventDefault();
      catArrBtn.removeClass("active__item");
      $(this).addClass("active__item");
   });
   /*filter product*/
   var filterBtn = $("[data-filter]");
   filterBtn.on("click", function () {
      var filterData = $(this).data('filter');
      $("[data-cat]").each(function () {
         var tovarData = $(this).data('cat');
         if (tovarData != filterData) {
            $(this).addClass("hide");
         } else {
            $(this).removeClass("hide");
         }
      });
   });
   /*pagination activ*/
   var paginBtn = $(".pagination__link");
   paginBtn.on("click", function (event) {
      event.preventDefault();
      paginBtn.removeClass("pagination__link--current");
      $(this).addClass("pagination__link--current");
   });
});