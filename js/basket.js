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
   $(".count__minus").on("click", function (event) {
      event.preventDefault();
      var counterMinus = $(this).closest(".tovar__count").find("._tovarCount");
      var countMinus = parseInt(counterMinus.val()) - 1;
      countMinus = countMinus < 1 ? 1 : countMinus;
      counterMinus.val(countMinus);
      counterMinus.change();
      var tovarPriceM = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarPrice").text();
      var tovarCountM = $(this).closest(".tovar__count").find("._tovarCount").val().trim();
      var tovarSumm = tovarPriceM * tovarCountM;
      var tovarSummM = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarSumm");
      tovarSummM.html(tovarSumm);
      allSumm();
      return false;
   });
   /*count plus*/
   $(".count__plus").on("click", function (event) {
      event.preventDefault();
      var counertPlus = $(this).closest(".tovar__count").find("._tovarCount");
      counertPlus.val(parseInt(counertPlus.val()) + 1);
      counertPlus.change();
      var tovarPriceP = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarPrice").text();
      var tovarCountP = $(this).closest(".tovar__count").find("._tovarCount").val().trim();
      var tovarSummP = tovarPriceP * tovarCountP;
      var tovarSummPblock = $(this).closest(".tovar__count")
         .closest(".tovar__block--content").find("._tovarSumm");
      tovarSummPblock.html(tovarSummP);
      allSumm();
      return false;
   });
   /*form validation basket*/
   var sendBasket = $("#sendBasket");
   var basket_ajax_url = $("#basketForm").attr('data-action');
   sendBasket.on("click", function () {
      var basketPIB = $("#basketPIB").val().trim();
      var basketPhone = $("#basketPhone").val().trim(),
         basketPhoneintRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      var basketMail = $("#basketMail").val().trim(),
         basketMailReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
      var basketAdress = $("#basketAdress").val().trim();
      var basketDostavka = $("#basketDostavka :selected").val().trim();
      var basketOplata = $("#basketOplata :selected").val().trim();
      if (basketPIB.length < 6) {
         $(".error__pib--basket").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      } else if ((basketPhone.length < 6) || (!basketPhoneintRegex.test(basketPhone))) {
         $(".error__pib--basket").removeAttr("style");
         $(".error__phone--basket").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      } else if (!basketMailReg.test(basketMail) || basketMail == '') {
         $(".error__pib--basket").removeAttr("style");
         $(".error__phone--basket").removeAttr("style");
         $(".error__mail--basket").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      } else if (basketAdress.length < 6) {
         $(".error__pib--basket").removeAttr("style");
         $(".error__phone--basket").removeAttr("style");
         $(".error__mail--basket").removeAttr("style");
         $(".error__adress--basket").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      }
      $(".error__pib--basket").removeAttr("style");
      $(".error__phone--basket").removeAttr("style");
      $(".error__mail--basket").removeAttr("style");
      $(".error__adress--basket").removeAttr("style");
      $.ajax({
         url: basket_ajax_url,
         type: 'POST',
         cache: false,
         data: {
            action: 'sendBasketForm',
            'basketPIB': basketPIB,
            'basketPhone': basketPhone,
            'basketMail': basketMail,
            'basketAdress': basketAdress,
            'basketDostavka': basketDostavka,
            'basketOplata': basketOplata
         },
         dataType: 'html',
         beforeSend: function () {
            sendBasket.prop("disabled", true);
         },
         success: function (data) {
            if (!data)
               alert("Щось не так ... Спробуйте ще раз!");
            else
               $("#basketForm").trigger("reset");
            alert(data);
            sendBasket.prop("disabled", false);
         }
      });
   });
});