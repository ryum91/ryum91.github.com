// from https://github.com/alexpearce/alexpearce.github.com/blob/master/assets/js/alexpearce.js

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
  // The last element is a null terminator
  posts.pop();
  for (var i in posts) {
    var post = posts[i];
    var prop = post[property];

    // Last element of tags is null
    post.tags.pop();

    // The property could be a string, such as a post's category,
    // or an array, such as a post's tags
    if ( -1 !== prop.toLowerCase().indexOf(value.toLowerCase()) ) {
      filteredPosts.push(post);
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
  if( 'tags' === property ) {
    $('#listTitle').text( "#" + value );
  } else {
    $('#listTitle').text( property + " '" + value + "'" );
  }

  // Loop through each post to format it
  for (var i in posts) {
    // Create an unordered list of the post's tags
    var tagsList = '<ul class="list-tags">',
        post     = posts[i],
        tags     = post.tags;

    for (var j in tags) {
      tagsList += '<li><a href="/search?tags=' + tags[j] + '">' + tags[j].toLowerCase() + '</a></li>';
    }
    tagsList += '</ul>';

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
        // + tagsList
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
    title   : getParam('title')
  };

  $.each(map, function(type, value) {
    if (value !== null) {
      if( type === 'title' ) {
        $.getJSON('/search.json', function(data) {
          layoutResultsPage('Search', value, filterContainsValue(data, type, value));
        });

      } else {
        $.getJSON('/search.json', function(data) {
          layoutResultsPage(type, value, filterPostsByPropertyValue(data, type, value));
        });
      }
    }
  });

  // Replace ERB-style Liquid tags in highlighted code blocks...
  replaceERBTags($('div.highlight').find('code.text'));
  // ... and in inline code
  replaceERBTags($('p code'));
});
