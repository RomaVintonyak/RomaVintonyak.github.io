jQuery(document).ready(function () {
   "use script";
   /*active clas to cat item*/
   var catArrBtn = $(".product__menu--item");
   catArrBtn.on("click", function(event){
      event.preventDefault();
      catArrBtn.removeClass("active__item");
      $(this).addClass("active__item");
   });
});