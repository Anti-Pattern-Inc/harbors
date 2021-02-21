$(function () {
  //スライダー
  $('.space-slider').slick({
    infinite: true,
    speed: 500,
    slidesToShow: 3.5,
    rtl: true,
    prevArrow:'<div class="prev"><img src="/img/slider-prev.svg" alt=""></div>',
    nextArrow: '<div class="next"><img src="/img/slider-next.svg" alt=""></div>',
    
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2.5,
      }
    }]
  });

  // スムーススクロール
  function smoothScroll(headerHeight, _this) {
    var href= $(_this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-headerHeight; 
    $("html, body").animate({scrollTop:position}, 500, "swing");
    return false;
  }
  $('a[href^="#"]:not(a[href="#scroll"]').on('click', function () {
    smoothScroll(150, this);
  });
  $('a[href^="#scroll"]').on('click', function () {
    smoothScroll(0, this);
  });
  $('a[href^="#top"]').on('click', function () {
    smoothScroll(0, this);
  });

  var startPos = 0;
  var scrollPos = 0;
  var topImageHeight = $('.top-image').height();
  var width = $('html').width();
  $(window).on('scroll', function () {
    // スクロールでheader表示切り替え
    scrollPos = $(this).scrollTop();
    if (width >= 768 && scrollPos >= topImageHeight) {
      if (scrollPos >= startPos) {
        $('#header').addClass('hide');
      } else {
        $('#header').removeClass('hide');
      }
    }
    
    if (scrollPos >= topImageHeight) {
      $('#header').addClass('white-bg');
    } else {
      $('#header').removeClass('white-bg');
    }
    startPos = scrollPos;
  })
  
  $('.header-disabled').hover(
    function () {
      if ($('.hovered')) {
        $('.header-disabled').removeClass('hovered');
        $('.footer-disabled').removeClass('hovered');
        $('.speech-bubble').removeClass('hovered');
        $('.footer-speech-bubble').removeClass('hovered');
      }
      var speechBubble = $(this).next();
      $(this).addClass('hovered');
      speechBubble.addClass('hovered');
    }
  );

  $('.footer-disabled').hover(
    function () {
      if ($('.hovered')) {
        $('.header-disabled').removeClass('hovered');
        $('.footer-disabled').removeClass('hovered');
        $('.speech-bubble').removeClass('hovered');
        $('.footer-speech-bubble').removeClass('hovered');
      }

      var footerSpeechBubble = $(this).next();
      $(this).addClass('hovered');
      footerSpeechBubble.addClass('hovered')
    }
  )

  $('body').not('.hovered').click(function () {
    $('.header-disabled').removeClass('hovered');
    $('.footer-disabled').removeClass('hovered');
    $('.speech-bubble').removeClass('hovered');
    $('.footer-speech-bubble').removeClass('hovered');
  })
  
  // ハンバーガー
  $('.nav-toggle').click(function () {
    var deviceWidth = $('html').width();
    $('.nav-toggle').toggleClass('cross');
    $('.nav-menu').toggleClass('open');
    $("html").toggleClass("no-scroll");

    if ($('.nav-menu').hasClass('open')) {
      $('.nav-menu').stop().animate({
        left: 0
      }, 500);
    } else {
      $('.nav-menu').stop().animate({
        left: deviceWidth
      }, 500);
    }
  });
});