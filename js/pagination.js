
var $paginationPrev = $('#paginationPrev');
var $paginationNext = $('#paginationNext');

var pathArr = location.pathname.split('/');
var index = parseInt(pathArr[3]);
pathArr.splice(3, 1);
var path = pathArr.join('/');

var prevPath = path + '/' + (index - 1);
var nextPath = path + '/' + (index + 1);

// Prev Path Check
$.ajax({
  type: 'GET',
  url: prevPath,
}).success(function() {
  $paginationPrev.attr('href', prevPath).show();
});

// Next Path Check
$.ajax({
  type: 'GET',
  url: nextPath,
}).success(function() {
  $paginationNext.attr('href', nextPath).show();
});
