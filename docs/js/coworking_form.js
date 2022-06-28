$(function () {
  $('[name="contact_type"]').change(function () {
    var contactType = $('[name="contact_type"] option:selected').val();
    if (contactType == "1" || contactType == "2") {
      $("#form_preferred_visit_date").show();
      $("#form_preferred_visit_time").show();
      $('[name="preferred_visit_date"]').attr("required", "true");
      $('[name="preferred_visit_time"]').attr("required", "true");
    } else {
      $("#form_preferred_visit_date").hide();
      $("#form_preferred_visit_time").hide();
      $('[name="preferred_visit_date"]').removeAttr("required");
      $('[name="preferred_visit_time"]').removeAttr("required");
    }
  });
});

$("#inquiryForm").submit(function (event) {
  event.preventDefault();
  $("#send_button").prop("disabled", true);
  var postUrl =
    "https://script.google.com/macros/s/AKfycbzkU0OkFb4iDcUn0W5UW4ia_iv4jXDmf6mcUUuKWpCzUrcGhAF-644z8KUwcUfUi6EStQ/exec";
  var postData = $("#inquiryForm").serialize();
  var posting = $.post(postUrl, postData)
    .done(function (data) {
      if (data.message === "reserved") {
        $("#reservedErrorMessage").show();
        $("#send_button").prop("disabled", false);
      } else {
        gtag("event", "conversion", {
          event_category: "coworking",
          event_label: "inquiry",
          value: 1,
        });
        var callback = function () {
          if (typeof url != "undefined") {
            window.location = url;
          }
        };
        gtag("event", "conversion", {
          send_to: "AW-701518947/lWC1CNWfhbABEOOowc4C",
          event_callback: callback,
        });
        $("#reservedErrorMessage").hide();
        $("#inquiryForm").hide();
        $("#thanksMessage").show();
      }
    })
    .fail(function () {
      $("#errorMessage").show();
      $("#send_button").prop("disabled", false);
    });
});
