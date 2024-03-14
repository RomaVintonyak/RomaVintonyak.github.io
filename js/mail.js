jQuery(document).ready(function () {
   "use script";
   /*active style to label in contact form*/
   var nameField = $("#name");
   nameField.blur(function () {
      var nameFieldData = $(this).val();
      if (nameFieldData.length >= 1) {
         $("#lebelName").css({
            "font-size": "1.2rem",
            "top": "-2.7rem"
         });
      } else {
         $("#lebelName").removeAttr("style");
      }
   });
   var emailField = $("#email");
   emailField.blur(function () {
      var emailFieldData = $(this).val();
      if (emailFieldData.length >= 1) {
         $("#labelEmail").css({
            "font-size": "1.2rem",
            "top": "-2.7rem"
         });
      } else {
         $("#labelEmail").removeAttr("style");
      }
   });
   var phoneField = $("#phone");
   phoneField.blur(function () {
      var phoneFieldData = $(this).val();
      if (phoneFieldData.length >= 1) {
         $("#labelPhone").css({
            "font-size": "1.2rem",
            "top": "-2.7rem"
         });
      } else {
         $("#labelPhone").removeAttr("style");
      }
   });
   var messageField = $("#message");
   messageField.blur(function () {
      var messageFieldData = $(this).val();
      if (messageFieldData.length >= 1) {
         $("#labelMessage").css({
            "font-size": "1.2rem",
            "top": "-3.5rem"
         });
      } else {
         $("#labelMessage").removeAttr("style");
      }
   });
   /*contact page form validation*/
   var mailBtn = $("#sendMail");
   var ajax_url = $("#contactForm").attr('data-action');
   mailBtn.on("click", function () {
      var name = $("#name").val().trim();
      var phone = $("#phone").val().trim(),
         intRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      var email = $("#email").val().trim(),
         emailReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
      var message = $("#message").val().trim();
      if (name.length < 3) {
         var nameError = $("#errorName").text();
         $("#errorText").text(nameError);
         return false;
      } else if (!emailReg.test(email) || email == '') {
         var mailError = $("#errorEmail").text();
         $("#errorText").text(mailError);
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
            action: 'sendForm',
            'name': name,
            'phone': phone,
            'email': email,
            'message': message
         },
         dataType: 'html',
         beforeSend: function () {
            mailBtn.prop("disabled", true);
         },
         success: function (data) {
            if (!data)
               alert("Щось не так ... Спробуйте ще раз!");
            else
               $("#contactForm").trigger("reset");
            alert(data);
            mailBtn.prop("disabled", false);
         }
      });
   });
});