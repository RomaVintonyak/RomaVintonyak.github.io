jQuery(document).ready(function () {
   "use script";
   /*modal window script*/
   var showModal = $("._popup");
   var modalWindow = $(".modal");
   var modalMask = $(".modal__mask");
   var modalBody = $(".modal__content");
   var recoverModalBody = $(".modal__recover");
   var modalClose = $("#modalClose");
   showModal.on("click", function (event) {
      event.preventDefault();
      modalWindow.addClass("modal__open");
      $("body").css({ "overflow": "hidden" });
   });
   modalClose.on("click", function (event) {
      event.preventDefault();
      modalWindow.removeClass("modal__open");
      $("body").removeAttr("style");
   })
   modalMask.on("click", function () {
      modalWindow.removeClass("modal__open");
      $("body").removeAttr("style");
      modalBody.removeClass("modal__content--active");
      recoverModalBody.removeClass("modal__recover--active");
   });
   modalBody.on("click", function (event) {
      event.stopPropagation();
   });
   /*recover modal wondow scritp*/
   var showRecoverBtn = $("#recoverPass");
   var recoverCloseBtn = $("#recoverClose");
   showRecoverBtn.on("click", function (event) {
      event.preventDefault();
      recoverModalBody.addClass("modal__recover--active");
      modalBody.addClass("modal__content--active");
   });
   recoverCloseBtn.on("click", function () {
      modalWindow.removeClass("modal__open");
      $("body").removeAttr("style");
      recoverModalBody.removeClass("modal__recover--active");
      modalBody.removeClass("modal__content--active");
   });
   recoverModalBody.on("click", function (event) {
      event.stopPropagation();
   });
   /*switch tabs button*/
   var modalTabsButton = $(".switch__tabs");
   modalTabsButton.on("click", function (event) {
      event.preventDefault();
      modalTabsButton.removeClass("switch__tabs--active");
      $(this).addClass("switch__tabs--active");
   });
   $("._login").on("click", function () {
      $(".modal__register").removeClass("modal__register--active");
      $(".modal__login").addClass("modal__login--active");
   });
   $("._register").on("click", function () {
      $(".modal__login").removeClass("modal__login--active");
      $(".modal__register").addClass("modal__register--active");
   });
   /*login form script*/
   var btnAuth = $("#sendAuth");
   var auth_ajax_url = $("#loginForm").attr('data-action');
   btnAuth.on("click", function () {
      var emailAuth = $("#emailAuth").val().trim(),
         emailAuthReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
      var passAuth = $("#paswordAuth").val().trim();
      if (!emailAuthReg.test(emailAuth) || emailAuth == '') {
         $(".error__mail--auth").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      } else if (passAuth.length < 10) {
         $(".error__mail--auth").removeAttr("style");
         $(".error__password--auth").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      }
      $(".error__mail--auth").removeAttr("style");
      $(".error__password--auth").removeAttr("style");
      $.ajax({
         url: auth_ajax_url,
         type: 'POST',
         cache: false,
         data: {
            action: 'sendAuthForm',
            'emailAuth': emailAuth,
            'passAuth': passAuth
         },
         dataType: 'html',
         beforeSend: function () {
            btnAuth.prop("disabled", true);
         },
         success: function (data) {
            if (!data)
               alert("Щось не так ... Спробуйте ще раз!");
            else
               $("#loginForm").trigger("reset");
            alert(data);
            btnAuth.prop("disabled", false);
         }
      });
   });
   /*registr form script*/
   var btnRegister = $("#sendRegister");
   var registr_ajax_url = $("#registerForm").attr('data-action');
   btnRegister.on("click", function () {
      var nameRegister = $("#nameRegister").val().trim();
      var emailRegister = $("#emailRegister").val().trim(),
         emailRegisterReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
      var passRegister = $("#paswordRegister").val().trim();
      if (nameRegister.length < 6) {
         $(".error__name--register").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      } else if (!emailRegisterReg.test(emailRegister) || emailRegister == '') {
         $(".error__name--register").removeAttr("style");
         $(".error__mail--register").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      } else if (passRegister.length < 10) {
         $(".error__name--register").removeAttr("style");
         $(".error__mail--register").removeAttr("style");
         $(".error__password--register").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      }
      $(".error__name--register").removeAttr("style");
      $(".error__mail--register").removeAttr("style");
      $(".error__password--register").removeAttr("style");
      $.ajax({
         url: registr_ajax_url,
         type: 'POST',
         cache: false,
         data: {
            action: 'sendRegisterForm',
            'nameRegister': nameRegister,
            'emailRegister': emailRegister,
            'passRegister': passRegister
         },
         dataType: 'html',
         beforeSend: function () {
            btnRegister.prop("disabled", true);
         },
         success: function (data) {
            if (!data)
               alert("Щось не так ... Спробуйте ще раз!");
            else
               $("#registerForm").trigger("reset");
            alert(data);
            btnRegister.prop("disabled", false);
         }
      });
   });
   /*recover pasword form script*/
   var btnRecover = $("#sendRecover");
   var recover_ajax_url = $("#recoverForm").attr('data-action');
   btnRecover.on("click", function () {
      var emailRecover = $("#emailRecover").val().trim(),
         emailRecoverReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
      if (!emailRecoverReg.test(emailRecover) || emailRecover == '') {
         $(".error__mail--recover").css({
            "opacity": "1",
            "visibility": "visible"
         });
         return false;
      }
      $(".error__mail--recover").removeAttr("style");
      $.ajax({
         url: recover_ajax_url,
         type: 'POST',
         cache: false,
         data: {
            action: 'sendRecoverForm',
            'emailRecover': emailRecover,
         },
         dataType: 'html',
         beforeSend: function () {
            btnRecover.prop("disabled", true);
         },
         success: function (data) {
            if (!data)
               alert("Щось не так ... Спробуйте ще раз!");
            else
               $("#recoverForm").trigger("reset");
            alert(data);
            btnRecover.prop("disabled", false);
         }
      });
   });
});