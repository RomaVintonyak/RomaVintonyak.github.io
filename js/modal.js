jQuery(document).ready(function () {
   "use script";
   /*MODAL WINDOW*/
   /*modal open*/
   $("._byePosition").on("click", function (event) {
      event.preventDefault();
      $(".modal").addClass("modal__open");
      $("body").css({ "overflow": "hidden" });
      //write input
      var titleFlowers = $(this).parent(".product__card--button")
         .parent(".product__card")
         .find("._title").text();
      var descriptionFlowers = $(this).parent(".product__card--button")
         .parent(".product__card")
         .find("._description").text();
      var priceFlowers = $(this).parent(".product__card--button")
         .parent(".product__card")
         .find("._price").text();
      $("#titleFlowers").val(titleFlowers);
      $("#descriptionFlowers").val(descriptionFlowers);
      $("#priceFlowers").val(priceFlowers);

   });
   /*modal close*/
   $("._modalClose").on("click", function (event) {
      event.preventDefault();
      $(".modal").removeClass("modal__open");
      $("body").removeAttr("style");
      //reset input
      $("#titleFlowers").val("");
      $("#descriptionFlowers").val("");
      $("#priceFlowers").val("");
   });
   $(".modal__mask").on("click", function () {
      $(".modal").removeClass("modal__open");
      $("body").removeAttr("style");
      //reset input
      $("#titleFlowers").val("");
      $("#descriptionFlowers").val("");
      $("#priceFlowers").val("");
   });
   $(".modal__body").on("click", function (event) {
      event.stopPropagation();
   });
   /*active style to label in contact form*/
   var nameField = $("#name");
   nameField.blur(function () {
      var nameFieldData = $(this).val();
      if (nameFieldData.length >= 1) {
         if ($(window).width() > 768) {
            $("#lebelName").css({
               "font-size": "1.2rem",
               "top": "-2.7rem"
            });
         } else {
            $("#lebelName").css({
               "font-size": "1.2rem",
               "top": "-2rem"
            });
         }
      } else {
         $("#lebelName").removeAttr("style");
      }
   });
   var phoneField = $("#phone");
   phoneField.blur(function () {
      var phoneFieldData = $(this).val();
      if (phoneFieldData.length >= 1) {
         if ($(window).width() > 768) {
            $("#labelPhone").css({
               "font-size": "1.2rem",
               "top": "-2.7rem"
            });
         } else {
            $("#labelPhone").css({
               "font-size": "1.2rem",
               "top": "-2rem"
            });
         }
      } else {
         $("#labelPhone").removeAttr("style");
      }
   });
   var messageField = $("#message");
   messageField.blur(function () {
      var messageFieldData = $(this).val();
      if (messageFieldData.length >= 1) {
         if ($(window).width() > 768) {
            $("#labelMessage").css({
               "font-size": "1.2rem",
               "top": "-2.7rem"
            });
         } else {
            $("#labelMessage").css({
               "font-size": "1.2rem",
               "top": "-2rem"
            });
         }
      } else {
         $("#labelMessage").removeAttr("style");
      }
   });
   /* bye mail script*/
   var byeBtn = $("#sendCart");
   var ajax_url = $("#shopingForm").attr('data-action');
   byeBtn.on("click", function () {
      var name = $("#name").val().trim();
      var phone = $("#phone").val().trim(),
         intRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      var message = $("#message").val().trim();
      var titleFlowers = $("#titleFlowers").val().trim();
      var descriptionFlowers = $("#descriptionFlowers").val().trim();
      var priceFlowers = $("#priceFlowers").val().trim();
      if (name.length < 3) {
         var nameError = $("#errorName").text();
         $("#errorText").text(nameError);
         return false;
      } else if ((phone.length < 6) || (!intRegex.test(phone))) {
         var phoneError = $("#errorPhone").text();
         $("#errorText").text(phoneError);
         return false;
      } else if (message.length < 10) {
         var messageError = $("#errorMessage").text();
         $("#errorText").text(messageError);
         return false;
      }
      $("#errorText").text("");
      $.ajax({
         url: ajax_url,
         type: 'POST',
         cache: false,
         data: {
            action: 'sendCart',
            'name': name,
            'phone': phone,
            'message': message,
            'titleFlowers': titleFlowers,
            'descriptionFlowers': descriptionFlowers,
            'priceFlowers': priceFlowers,
         },
         dataType: 'html',
         beforeSend: function () {
            byeBtn.prop("disabled", true);
         },
         success: function (data) {
            if (!data)
               alert("Щось не так ... Спробуйте ще раз!");
            else
               $("#shopingForm").trigger("reset");
            alert(data);
            byeBtn.prop("disabled", false);
         }
      });
   });
});