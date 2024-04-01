jQuery(document).ready(function () {
   "use script";
   /*reviews form show script*/
   var reviewsBtn = $("._reviewsUser");
   reviewsBtn.on("click", function () {
      $(this).parent(".reviews__answer")
         .parent(".reviews__block--user")
         .find(".reviews__form").css({
            "display": "block"
         });
      $(this).parent(".reviews__answer")
         .parent(".reviews__block--admin")
         .find(".reviews__form").css({
            "display": "block"
         });
   });
   /*send reviews form script*/
   var btnReviews = $(".reviewsButton");
   var reviews_ajax_url = $("[data-id]").attr('data-action');
   btnReviews.on("click", function () {
      var reviewsName = $(this).parent("._reviewsForm").find(".reviewsName").val().trim();
      var reviewsEmail = $(".reviewsEmail").val().trim(),
         reviewsEmailAuthReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
      var reviewsText = $(".reviewsText").val().trim();
      if (reviewsName.length < 6) {
         $(".reviewsName").css({
            "border": "1px solid red"
         });
         return false
      } else if (!reviewsEmailAuthReg.test(reviewsEmail) || reviewsEmail == '') {
         $(".reviewsName").removeAttr("style");
         $(".reviewsEmail").css({
            "border": "1px solid red"
         });
         return false;
      } else if (reviewsText.length < 10) {
         $(".reviewsName").removeAttr("style");
         $(".reviewsEmail").removeAttr("style");
         $(".reviewsText").css({
            "border": "1px solid red"
         });
         return false;
      }
      $(".reviewsName").removeAttr("style");
      $(".reviewsEmail").removeAttr("style");
      $(".reviewsText").removeAttr("style");
      $.ajax({
         url: reviews_ajax_url,
         type: 'POST',
         cache: false,
         data: {
            action: 'sendReviewsForm',
            'reviewsName': reviewsName,
            'reviewsEmail': reviewsEmail,
            'reviewsText': reviewsText
         },
         dataType: 'html',
         beforeSend: function () {
            btnReviews.prop("disabled", true);
         },
         success: function (data) {
            if (!data)
               alert("Щось не так ... Спробуйте ще раз!");
            else
               $("[data-id]").trigger("reset");
            $("[data-id]").removeAttr("style");
            alert(data);
            btnReviews.prop("disabled", false);
         }
      });
   });
});