// from https://github.com/alexpearce/alexpearce.github.com/blob/master/assets/js/alexpearce.js

var $searchType = $('#searchType');
var $searchInput = $('#searchInput');

// Retrieves the value of a GET parameter with a given key
// Accepts:
//   param: string
// Returns:
//   string or null
var getParam = function(param) {
  var queryString = decodeURIComponent(window.location.search).substring(1),
      queries = queryString.split("&");
  for (var i in queries) {
    var pair = queries[i].split("=");
    if (pair[0] == param) {
      return pair[1];
    }
  }
  return null;
};

// Filters posts with the condition `post['property'] == value`
// Accepts:
//   posts - array of post objects and a string
//   property - string of post object property to compare
//   value - filter value of property
// Returns:
//  array of post objects
var filterPostsByPropertyValue = function(posts, property, value) {
  var filteredPosts = [];
  // The last element is a null terminator
  for (var i in posts) {
    var post = posts[i];
    var prop = post[property];

    // The property could be a string, such as a post's category,
    // or an array, such as a post's tags
    if (prop.constructor == String) {
      if (prop.toLowerCase() == value.toLowerCase()) {
        filteredPosts.push(post);
      }
    } else if (prop.constructor == Array) {
      for (var j in prop) {
        if (prop[j].toLowerCase() == value.toLowerCase()) {
          filteredPosts.push(post);
        }
      }
    }
  }

  return filteredPosts;
};

var filterContainsValue = function(posts, property, value) {
  var filteredPosts = [];
  var isPropertyArray = ( property instanceof Array );
  for (var i in posts) {
    var post = posts[i];
    if( isPropertyArray ) {
      for( var j in property ) {
        var currentProp = property[j];
        var prop = post[currentProp];
        if ( -1 !== prop.toLowerCase().indexOf(value.toLowerCase()) ) {
          filteredPosts.push(post);
        }
      }
    } else {
      var prop = post[property];
      if ( -1 !== prop.toLowerCase().indexOf(value.toLowerCase()) ) {
        filteredPosts.push(post);
      }
    }
  }
  return filteredPosts;
};

// Formats search results and appends them to the DOM
// Accepts:
//   property: string of object type we're displaying
//   value: string of name of object we're displaying
//   posts: array of post objects
// Returns: nothing
var layoutResultsPage = function(property, value, posts) {
  // Make sure we're on the search results page
  $searchType.val(property);
  $searchInput.val(value);

  // Loop through each post to format it
  for (var i in posts) {
    var post = posts[i];
    $('#listElement').append(
      '<li class="mv2">'
        // Page anchor
        +  '<a class="db pv1 link blue hover-mid-gray" href="' + post.href + '">'
        +    '<div class="list-text-wrap">'
        +      '<span class="list-text">'
        +        post.title
        +      '</span>'
        +    '</div>'
        +    '<time class="fr silver ttu">'
        +      post.date.year + '-' + post.date.month + '-' + post.date.day
        +    '</time>'
        +  '</a>'
        + '</li>'
    );
  }
}

// Formats the search results page for no results
// Accepts:
//   property: string of object type we're displaying
//   value: string of name of object we're displaying
// Returns: nothing
var noResultsPage = function(property, value) {
  $('#listTitle').text('결과가 없습니다.');
};

// Replaces ERB-style tags with Liquid ones as we can't escape them in posts
// Accepts:
//   elements: jQuery elements in which to replace tags
// Returns: nothing
var replaceERBTags = function(elements) {
  elements.each(function() {
    // Only for text blocks at the moment as we'll strip highlighting otherwise
    var $this = $(this),
        txt   = $this.html();

    // Replace <%=  %>with {{ }}
    txt = txt.replace(new RegExp("&lt;%=(.+?)%&gt;", "g"), "{{$1}}");
    // Replace <% %> with {% %}
    txt = txt.replace(new RegExp("&lt;%(.+?)%&gt;", "g"), "{%$1%}");

    $this.html(txt);
  });
};

$(function() {
  var map = {
    category : getParam('category'),
    tags     : getParam('tags'),
    title   : getParam('title'),
    content   : getParam('content'),
    titlecontent   : getParam('titlecontent')
  };

  $.each(map, function(type, value) {
    if (value !== null) {
      if( type === 'tags' ) {
        $.getJSON('/search.json', function(data) {
          layoutResultsPage(type, value, filterPostsByPropertyValue(data, type, value));
        });

      } else if ( type === 'titlecontent' ) {
        $.getJSON('/search.json', function(data) {
          layoutResultsPage(type, value, filterContainsValue(data, ['title', 'content'], value));
        });

      } else {
        $.getJSON('/search.json', function(data) {
          layoutResultsPage(type, value, filterContainsValue(data, type, value));
        });
      }
    }
  });

  // Replace ERB-style Liquid tags in highlighted code blocks...
  replaceERBTags($('div.highlight').find('code.text'));
  // ... and in inline code
  replaceERBTags($('p code'));
});

function searchRun() {
  var type = $searchType.val();
  var input = $searchInput.val();
  location.href = '/search?' + type + '=' + input;
}

$('#searchButton').click(searchRun);
$searchInput.keyup(function(e) {
  if( 13 == e.keyCode ) {
    searchRun();
  }
});

$searchInput.focus();
