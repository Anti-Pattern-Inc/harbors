$(function () {
  $('.header-disabled').hover(
    function () {
      $('.transparent-area').remove();
      if ($('.hovered')) {
        closeSpeechBubble()
      }
      let speechBubble = $(this).next();
      $(this).addClass('hovered');
      speechBubble.addClass('hovered');
      let transparentAreaWidth = speechBubble.outerWidth();
      let transparentAreaHeight = 35;
      $(this).before('<div class="transparent-area hovered"></div>');
      $('.transparent-area').offset({
        top: speechBubble.offset().top - 35,
        left: speechBubble.offset().left
      })
      $('.transparent-area').width(transparentAreaWidth);
      $('.transparent-area').height(transparentAreaHeight);
    },
    function () {
      if (($('.transparent-area').is(':hover'))) {
        $('.speech-bubble.hovered').mouseleave(
          function () {
            $('.transparent-area').remove();
            closeSpeechBubble();
          }
        )
      } else {
        $('.transparent-area').remove();
        closeSpeechBubble();
      }
    }
  )


  $('.footer-disabled').hover(
    function () {
      $('.transparent-area').remove();
      if ($('.hovered')) {
        closeSpeechBubble()
      }
      let speechBubble = $(this).next();
      $(this).addClass('hovered');
      speechBubble.addClass('hovered');
      let transparentAreaWidth = speechBubble.outerWidth();
      let transparentAreaHeight = 42;
      $(this).before('<div class="transparent-area hovered"></div>');
      $('.transparent-area').offset({
        top: speechBubble.offset().top + speechBubble.outerHeight(),
        left: speechBubble.offset().left
      })
      $('.transparent-area').width(transparentAreaWidth);
      $('.transparent-area').height(transparentAreaHeight);
    },
    function () {
      if ($('.transparent-area').is(':hover')) {
        $('.footer-speech-bubble.hovered').mouseleave(
          function () {
            $('.transparent-area').remove();
            closeSpeechBubble()
          }
        )
      } else {
        $('.transparent-area').remove();
        closeSpeechBubble()
      }
    }
  );

  function closeSpeechBubble() {
    $('.header-disabled').removeClass('hovered');
    $('.footer-disabled').removeClass('hovered');
    $('.speech-bubble').removeClass('hovered');
    $('.footer-speech-bubble').removeClass('hovered');
  }
      
  // ハンバーガー
  $('.nav-toggle').click(
    function () {
      let deviceWidth = $('html').width();
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
    }
  );

  $('.nav-hover').click(
    function() {
      let deviceWidth = $('html').width();
      $("html").removeClass("no-scroll");
      $('.nav-toggle').removeClass('cross');
      $('.nav-menu').removeClass('open');
      $('.nav-menu').stop().animate({
        left: deviceWidth
      }, 500);
  });

  // スムーススクロール
  function smoothScroll(_this) {
    let href = $(_this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top - 20;
    $("html, body").animate({ scrollTop: position }, 500, "swing");
    return false;
  }
  $('a[href^="#"]').not(".dropdown-toggle,[data-toggle='modal'],[data-toggle='collapse'],[data-toggle='tab']").on('click', function () {
    smoothScroll(this);
  });

  // 下スクロールでheaderを非表示
  let startPosition = 0;
  let scrollPosition = 0;
  if ($('.top-image').length == 0) {
    // ".top-image"がないとき
    $(window).on('scroll', function () {
      scrollPosition = $(this).scrollTop();
      if (scrollPosition >= 170) {
        if (scrollPosition >= startPosition) {
          $('#header').addClass('hide');
        } else {
          $('#header').removeClass('hide');
        }
      }
      startPosition = scrollPosition;
    })
  } else {
    // ".top-image"があるとき
    let topImageHeight = $('.top-image').height();
    $(window).on('scroll', function () {
      scrollPosition = $(this).scrollTop();
      if (scrollPosition >= topImageHeight) {
        $('#header').addClass('white-bg');
        if (scrollPosition >= startPosition) {
          $('#header').addClass('hide');
        } else {
          $('#header').removeClass('hide');
        }
      } else {
        $('#header').removeClass('white-bg');
      }
      startPosition = scrollPosition;
    })
  }
});