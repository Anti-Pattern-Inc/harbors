$(function () {
  // スムーススクロール
  function smoothScroll(_this) {
    var href = $(_this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - 20;
    $("html, body").animate({ scrollTop: position }, 500, "swing");
    return false;
  }
  $('a[href^="#"]').not(".dropdown-toggle,[data-toggle='modal'],[data-toggle='collapse'],[data-toggle='tab']").on('click', function () {
    smoothScroll(this);
  });

  // 下スクロールでheaderを非表示
  var startPos = 0;
  var scrollPos = 0;
  if ($('.top-image').length == 0) {
    // ".top-image"がないとき
    $(window).on('scroll', function () {
      scrollPos = $(this).scrollTop();
      if (scrollPos >= 170) {
        if (scrollPos >= startPos) {
          $('#header').addClass('hide');
        } else {
          $('#header').removeClass('hide');
        }
      }
      startPos = scrollPos;
    })
  } else {
    // ".top-image"があるとき
    var topImageHeight = $('.top-image').height();
    $(window).on('scroll', function () {
      scrollPos = $(this).scrollTop();
      if (scrollPos >= topImageHeight) {
        $('#header').addClass('white-bg');
        if (scrollPos >= startPos) {
          $('#header').addClass('hide');
        } else {
          $('#header').removeClass('hide');
        }
      } else {
        $('#header').removeClass('white-bg');
      }
      
      startPos = scrollPos;
    })
  }
})

