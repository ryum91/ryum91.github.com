
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Json Data Convert
function convertData(dataArr) {
  var result = {};

  for( var i in dataArr ) {
    var data = dataArr[i];
    if( !data ) {
      continue;
    }
    var tags = data.tags;
    if( 1 === tags.length ) {
      continue;
    }

    for( var j in tags ) {
      var tag = tags[j];
      if( !tag ) {
        continue;
      }
      if( result[tag] ) {
        result[tag] += 1;
      } else {
        result[tag] = 1;
      }
    }
  }
  return result;
}

// Draw Tag Cloud
function drawTagCloud(data) {
  var $tagCloud = $('#tagCloud');
  for( var key in data ) {
    $('<a>').attr('href', '/search?tags=' + key).addClass('link').attr('rel', parseInt(data[key]) + 5).text('#'+key).appendTo($tagCloud);
  }

  $('#tagCloud a').tagcloud({
    size: {start:15, end:25, unit:'px'},
    color: {start: '#46CFB0', end: '#3498DB'}
  });
}

$.getJSON('/search.json', function(data) {
  drawTagCloud(convertData(data));
});
