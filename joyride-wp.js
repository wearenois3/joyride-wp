var wf = {
  init: function() {
    $('<ol class="joyride-list" data-joyride>').appendTo('body');
    $('<li data-id="firstStop" data-text="Next" data-options="tip_location: bottom"><h4>Benvenuti</h4><p> Qui troverai le nostre descrizioni per i wireframe</p></li>').appendTo($('.joyride-list'));
    /**

    If you've already set up a Wordpress instance, with JSON API plugin activated 
    you just have to put in WF_URL you're complete address to reach it

    e.g.:

    var WF_URL = 'http://www.example.com/api/';

    **/
    var WF_URL = 'http://www.example.com/api/';

    /**
      
    The way the whole thing is managed right now is that in the wordpress instance 
    we're managing more than one project for Wireframes, so we're using categories
    to address one particular project.

    This way I'm defining WF_PRJ as the category_slug for the project.

    e.g.:

    var WF_URL = 'project_wf'

    **/
    var WF_PRJ = 'project_wf';

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


