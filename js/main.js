jQuery(document).ready(function () {
  "use script";
  /*burger btn*/
  $(".burger__btn").on("click", function () {
    $(this).toggleClass("burger__btn--active");
    $(".menu").toggleClass("menu__open");
  });
  /*lightbox*/
  lightbox.option({
    'resizeDuration': 300,
    'wrapAround': true,
    'alwaysShowNavOnTouchDevices': true,
    'albumLabel': "Зображення %1 із %2",
    'disableScrolling': true
  });
  /*fixed header*/
  var headerHeight = $("#header").height();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= headerHeight) {
      $("#header").addClass("header__fixed");
    } else {
      $("#header").removeClass("header__fixed");
    }
  });
  /*backtop btn*/
  var introH = $(".intro").height();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= (introH || 800)) {
      $(".backtop").addClass("backtop__active");
    } else {
      $(".backtop").removeClass("backtop__active");
    }
  });
  $(".backtop").on("click", function () {
    $("html, body").animate({
      scrollTop: 0,
    }, 1000, "swing");
  });
  /*active style to label in contact form*/
  var contactNameField = $("#contactName");
  contactNameField.blur(function () {
    var contactNameFieldData = $(this).val();
    if (contactNameFieldData.length >= 1) {
      $("#lebelcontactName").css({
        "font-size": "1.2rem",
        "top": "-2.7rem"
      });
    } else {
      $("#lebelcontactName").removeAttr("style");
    }
  });
  var contactEmailField = $("#contactEmail");
  contactEmailField.blur(function () {
    var contactEmailFieldData = $(this).val();
    if (contactEmailFieldData.length >= 1) {
      $("#labelcontactEmail").css({
        "font-size": "1.2rem",
        "top": "-2.7rem"
      });
    } else {
      $("#labelcontactEmail").removeAttr("style");
    }
  });
  var contactPhoneField = $("#contactPhone");
  contactPhoneField.blur(function () {
    var contactPhoneFieldData = $(this).val();
    if (contactPhoneFieldData.length >= 1) {
      $("#labelcontactPhone").css({
        "font-size": "1.2rem",
        "top": "-2.7rem"
      });
    } else {
      $("#labelcontactPhone").removeAttr("style");
    }
  });
  var contactMessageField = $("#contactMessage");
  contactMessageField.blur(function () {
    var contactMessageFieldData = $(this).val();
    if (contactMessageFieldData.length >= 1) {
      $("#labelcontactMessage").css({
        "font-size": "1.2rem",
        "top": "-3.5rem"
      });
    } else {
      $("#labelcontactMessage").removeAttr("style");
    }
  });
  /*contact page form validation*/
  var mailBtn = $("#sendMail");
  var contact_ajax_url = $("#contactForm").attr('data-action');
  mailBtn.on("click", function () {
    var contact_name = $("#contactName").val().trim();
    var contact_phone = $("#contactPhone").val().trim(),
      contact_intRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    var contact_email = $("#contactEmail").val().trim(),
      contact_emailReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    var contact_message = $("#contactMessage").val().trim();
    if (contact_name.length < 3) {
      var contact_nameError = $("#errorcontactName").text();
      $("#errorContactText").text(contact_nameError);
      return false;
    } else if (!contact_emailReg.test(contact_email) || contact_email == '') {
      var contac_mailError = $("#errorcontactEmail").text();
      $("#errorContactText").text(contac_mailError);
      return false;
    } else if ((contact_phone.length < 6) || (!contact_intRegex.test(contact_phone))) {
      var contact_phoneError = $("#errorcontactPhone").text();
      $("#errorContactText").text(contact_phoneError);
      return false;
    } else if (contact_message.length < 10) {
      var contact_messageError = $("#errorcontactMessage").text();
      $("#errorContactText").text(contact_messageError);
      return false;
    }
    $("#errorContactText").text("");
    $.ajax({
      url: contact_ajax_url,
      type: 'POST',
      cache: false,
      data: {
        action: 'contactForm',
        'contact_name': contact_name,
        'contact_phone': contact_phone,
        'contact_email': contact_email,
        'contact_message': contact_message
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