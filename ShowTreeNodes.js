$(document).ready(function () {

  $('#multi-tree li:has("ul")').find('a:first').prepend('<em class="marker"></em>');
  $('[id*="b2room"]').children().hide();
  $('[id*="b1floor1room"]').children().hide();
  $('#b1floor2roomx').children().hide();
  
  $('#multi-tree li span').click(function () {

      $('a.current').removeClass('current');
      var a = $('a:first',this.parentNode);
      a.toggleClass('current');
      var li=$(this.parentNode);

      if (!li.next().length) {
        li.find('ul:first > li').addClass('last');
      }

      var ul=$('ul:first',this.parentNode);
      if (ul.length) {
        ul.slideToggle(300);
        var em=$('em:first',this.parentNode);
        em.toggleClass('open');
      }
   });
})
