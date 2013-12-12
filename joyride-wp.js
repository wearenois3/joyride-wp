var WF_URL = 'PLEASE FILL IT WITH YOUR API ADDRESS FROM WordPress JSON API';
/**


**/
var WF_PRJ = 'PLEASE FILL IT WITH THE CORRECT CATEGORY SLUG FOR YOUR PROJECT';
/**


**/
var wf = {
  init: function() {
    $('<ol class="joyride-list" data-joyride>').appendTo('body');
    $('<li data-id="firstStop" data-text="Next" data-options="tip_location: bottom"><h4>Benvenuti</h4><p> Qui troverai le nostre descrizioni per i wireframe</p></li>').appendTo($('.joyride-list'));


    $.ajax({
        type: 'GET',
        url: WF_URL,
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
          console.log('the API is working good.');
        },
        error: function (error) {
          // TODO
          //$('.toobad').reveal();
          console.log('you appear to be offline, or your API is not working at all.');
        }
      })
  },

  error: function() {
    $('#error').html('that\'s terrible :(');
  },


  getCategoryPosts: function(callback, type, slug) {
    $.ajax({
      type: 'GET',
      url: WF_URL + 'get_category_posts' + '/?post_type=' + type + '&slug=' + slug + '&count=-1',
      dataType: 'json',
      crossDomain: true,
      success: callback,
      error: function(error) {
        $('body').html('something was really wrong, please refresh or check internet connection');
      }
    })

  },

  parseJoyride: function(data) {
    if(!data.posts) {
      return;
    }
    
    for(var i = 0; i < data.posts.length; ++i) {
      var k = i+1;
      var content = '<h4>#' + k + ': ' + data.posts[i].title + '</h4>' + data.posts[i].content;
      $('<li data-id="' + data.posts[i].slug +'" data-text="Next" data-options="tip_location: bottom">').html(content).appendTo($('.joyride-list'));
    }
    $(document).foundation('joyride', 'start');
  },

  error: function(error) {
    var error_data = {
      "type": error,
      "message" : "sorry we're getting back soon, just experiencing some hiccups"
    }
  }
}

wf.getCategoryPosts(
  function (data) {
    wf.parseJoyride(data);
  },
  'joyride',
  WF_PRJ
);


