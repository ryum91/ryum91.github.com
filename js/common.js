
var $topMenu = $('#topMenu');
var $document = $(document);
var offset = $topMenu.offset();
var $topMenuFix = $('#topMenuFix');
$(window).scroll(function() {
  if( $document.scrollTop() > offset.top ) {
    $topMenuFix.show();
  } else {
    $topMenuFix.hide();
  }
});
