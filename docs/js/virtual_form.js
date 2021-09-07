$(function () {
  $("#preferred_visit_date").datetimepicker({
    format: "YYYY/MM/DD",
    dayViewHeaderFormat: "YYYY年 MMMM",
    tooltips: {
      close: "閉じる",
      selectMonth: "月を選択",
      prevMonth: "前月",
      nextMonth: "次月",
      selectYear: "年を選択",
      prevYear: "前年",
      nextYear: "次年",
      selectTime: "時間を選択",
      selectDate: "日付を選択",
      prevDecade: "前期間",
      nextDecade: "次期間",
      selectDecade: "期間を選択",
      prevCentury: "前世紀",
      nextCentury: "次世紀",
    },
    locale: moment.locale("ja", {
      week: { dow: 1 },
    }),
    buttons: {
      showClose: true,
    },
  });

  $('[name="contact_type"]').each((index, element) => {
    $(element).on('input', function() {
      var contactType = $(element).val();
      if (contactType == "1" || contactType == "2") {
        $('[name="remarks"]').removeAttr("required");
        $('#remarks_required').hide();
        $("#form_preferred_visit_date").show();
        if (contactType == "1") {
          if (
            $('[name="preferred_visit_time"]').children(
              'option[value="20:00"]'
            ).length == 0
          ) {
            $('[name="preferred_visit_time"]').append(
              '<option value="20:00">20:00~21:00</option>'
            );
          }
        } else {
          if (
            $('[name="preferred_visit_time"]').children(
              'option[value="20:00"]'
            ).length == 1
          ) {
            $('[name="preferred_visit_time"]')
              .children('option[value="20:00"]')
              .remove();
          }
        }
      } else {
        if (contactType == "4") {
          $('[name="remarks"]').attr("required", "true");
          $('#remarks_required').show();
        } else {
          $("#form_preferred_visit_date").hide();
          $("#form_preferred_visit_time").hide();
        }
      }
    })
  });

  // $('[name="contact_type"]').change('input',function () {
  //   // console.log('input changed!');
  //   var contactType = $('[name="contact_type"]').val();
  //   if (contactType == "1" || contactType == "2") {
  //     $("#form_preferred_visit_date").show();
  //     if (contactType == "1") {
  //       if (
  //         $('[name="preferred_visit_time"]').children(
  //           'option[value="20:00"]'
  //         ).length == 0
  //       ) {
  //         $('[name="preferred_visit_time"]').append(
  //           '<option value="20:00">20:00~21:00</option>'
  //         );
  //       }
  //     } else {
  //       if (
  //         $('[name="preferred_visit_time"]').children(
  //           'option[value="20:00"]'
  //         ).length == 1
  //       ) {
  //         $('[name="preferred_visit_time"]')
  //           .children('option[value="20:00"]')
  //           .remove();
  //       }
  //     }
  //   } else {
  //     $("#form_preferred_visit_date").hide();
  //     $("#form_preferred_visit_time").hide();
  //   }
  // });

  $('#preferred_visit_date').on("change.datetimepicker", function (e) {
    var preferred_visit_date_value = $('input[name=preferred_visit_date]').val();
    if (preferred_visit_date_value == '') {
      $("#form_preferred_visit_time").hide();
      $('[name=preferred_visit_time]').removeAttr("required");
    } else {
      $("#form_preferred_visit_time").show();
      $('[name=preferred_visit_time]').attr("required", "true");
    }
  })
});

$("#inquiryForm").submit(function (event) {
  event.preventDefault();
  $("#send_button").prop("disabled", true);
  var postUrl =
    "https://script.google.com/macros/s/AKfycbwbcIIiHad2j7kq41e0IA1PYjCD6f3wK522sgUIQYPI1qUeZi5U/exec";
  var postData = $("#inquiryForm").serialize();
  var posting = $.post(postUrl, postData)
    .done(function (data) {
      if (data.message === "reserved") {
        $("#reservedErrorMessage").show();
        $("#send_button").prop("disabled", false);
      } else {
        gtag("event", "conversion", {
          event_category: "virtual_office",
          event_label: "inquiry",
          value: 1,
        });
        var callback = function () {
          if (typeof url != "undefined") {
            window.location = url;
          }
        };
        gtag("event", "conversion", {
          send_to: "AW-701518947/UGAXCMLx1bABEOOowc4C",
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