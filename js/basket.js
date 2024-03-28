jQuery(document).ready(function () {
   "use script";
   /*tovar count item*/
   $("._tovarPrice").each(function () {
      var tovarPrice = $(this).text();
      var tovarCount = $(this).closest(".tovar__opys")
         .closest(".tovar__block--content").find("._tovarCount").val();
      var tovarRezult = tovarPrice * tovarCount;
      var tovarSumm = $(this).closest(".tovar__opys")
         .closest(".tovar__block--content").find("._tovarSumm");
      tovarSumm.html(tovarRezult);
   });
   /*all basket summ*/
   function allSumm() {
      var arrList = $('._tovarSumm').map(function () {
         var arrTovarSumm = $(this).text();
         var numberTovarSumm = Number(arrTovarSumm);
         return numberTovarSumm;
      }).get();
      function arraySum(array) {
         var summaTovariv = 0;
         for (var i = 0; i < array.length; i++) {
            summaTovariv += array[i];
         }
         $("._basketSumm").html(summaTovariv);
      }
      arraySum(arrList);
   }
   allSumm();
   /*remove product position*/
   $("._removeBlock").on("click", function () {
      if (confirm("Бажаєте видалити дану позицію?")) {
         $(this).closest(".tovar__block--delete").closest(".tovar__block").remove();
         allSumm();
      }
      else {
         return false;
      }
   });





















   /*count minus*/
   /*$(".count__minus").on("click", function (event) {
      event.preventDefault();
      var counterMinus = $(this).closest(".tovar__count").find("._tovarCount");


      counterMinus.val(+counterMinus.val() - 1);


      var tovarPriceM = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarPrice").text();
      var tovarCountM = $(this).closest(".tovar__count").find("._tovarCount").val().trim();
      var tovarSumm = tovarPriceM * tovarCountM;
      var tovarSummM = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarSumm");
      tovarSummM.html(tovarSumm);
   });
   /*count plus*/
   /*$(".count__plus").on("click", function (event) {
      event.preventDefault();
      var counertPlus = $(this).closest(".tovar__count").find("._tovarCount");
      counertPlus.val(+counertPlus.val() + 1);
      var tovarPriceM = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarPrice").text();
      var tovarCountM = $(this).closest(".tovar__count").find("._tovarCount").val().trim();
      var tovarSumm = tovarPriceM * tovarCountM;
      var tovarSummM = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarSumm");
      tovarSummM.html(tovarSumm);
   });*/
});