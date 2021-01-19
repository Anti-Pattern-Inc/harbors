'use strict'
{
  // スムーススクロール
  $(function () {
    var headerHeight = 150;
    $('a[href^="#"]').click(function(){
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top-headerHeight; 
      $("html, body").animate({scrollTop:position}, 550, "swing");
      return false;
    });
  });

  $(window).on('load', function() {
    var headerHeight = 190;
    if(document.URL.match("#")) {
      var str = location.href ;
      var cut_str = "#";
      var index = str.indexOf(cut_str);
      var href = str.slice(index);
      var target = href;
      var position = $(target).offset().top - headerHeight;
      $("html, body").scrollTop(position);
      return false;
    }
  });
}