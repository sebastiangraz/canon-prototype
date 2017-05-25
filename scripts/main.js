var rafId = null;
var delay = 50;
var lTime = 0;

function scroll() {
  var scrollTop = $(window).scrollTop();
  var height = $(window).height()
  var visibleTop = scrollTop + height;
  $('.reveal').each(function() {
    var $t = $(this);
    if ($t.hasClass('reveal_visible')) { return; }
    var top = $t.offset().top;
    if (top <= visibleTop) {
      if (top + $t.height() < scrollTop) {
        $t.removeClass('reveal_pending').addClass('reveal_visible');
      } else {
        $t.addClass('reveal_pending');
        if (!rafId) requestAnimationFrame(reveal);
      }
    }
  });
}
function reveal() {
  rafId = null;
  var now = performance.now();

  if (now - lTime > delay) {
    lTime = now;
    var $ts = $('.reveal_pending');
    $($ts.get(0)).removeClass('reveal_pending').addClass('reveal_visible');
  }


  if ($('.reveal_pending').length >= 1) rafId = requestAnimationFrame(reveal);
}


$("#search-products").on("keyup", function(){
    if (($(this).val()) == 0) {
      $('#search-filter').addClass('hidden');
      $('#search-results').html('<span class="red tungsten">New</span><br>Arrivals')
    } else {
      $('#search-filter').removeClass('hidden');
      $('#search-results').html('Search results for' + '<br><span class="w6 fl fr-ns mw6 truncate red tungsten">' + $(this).val() + '</span>')
    }
})

$(scroll);
$(window).scroll(scroll);
