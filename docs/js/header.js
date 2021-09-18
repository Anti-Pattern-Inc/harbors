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
  
  function closeSpeechBubble() {
    $('.header-disabled').removeClass('hovered');
    $('.footer-disabled').removeClass('hovered');
    $('.speech-bubble').removeClass('hovered');
    $('.footer-speech-bubble').removeClass('hovered');
  }
  
  // ハンバーガー
  $('.nav-toggle').click(function () {
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
  });

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
});
