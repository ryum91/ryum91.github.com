
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

  var tagData = [];
  for( var key in data ) {
    tagData.push({
      text: key,
      weight: data[key] * 10,
      link: '/search?tags=' + key
    });
  }

  $tagCloud.jQCloud(tagData, {
    autoResize: true,
    fontSize: {
      from: 0.1,
      to: 0.05
    }
  });
}

$.getJSON('/search.json', function(data) {
  drawTagCloud(convertData(data));
});
