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
   var paginBtn = $(".page-numbers");
   paginBtn.on("click", function (event) {
      event.preventDefault();
      paginBtn.removeClass("current");
      $(this).addClass("current");
   });
   /*sotr tovar in catalog*/
   $("#popular").click(function () {
      location.reload(true);
   });
   $("#lowPrice").click(function () {
      var tovar = $(".product__card"),
         catalog = $(".catalog__tovariv");
      tovar.sort(function (tovar, catalog) {
         return tovar.getAttribute("data-order") - catalog.getAttribute("data-order");
      }),
         tovar.detach().appendTo(catalog);
   });
   $("#heightPrice").click(function () {
      var tovarH = $(".product__card"),
         catalogH = $(".catalog__tovariv");
      tovarH.sort(function (tovarH, catalogH) {
         return catalogH.getAttribute("data-order") - tovarH.getAttribute("data-order");
      }),
         tovarH.detach().appendTo(catalogH);
   });
});

