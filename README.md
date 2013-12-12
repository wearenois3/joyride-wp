joyride-wp
==========

A small javascript library to connect Wordpress JSON API to Foundation 5 Joyride

We were creating Wireframes on Omnigraffle or Balsamiq as most of the web agencies in the world.
Later on mockup-wise we would have started creating mockups on Zurb's Foundation.

That's why this very small piece of code we open sourced. 
We started using Wordpress as a REST service to serve instructions to illustrate better to clients 
the functionalities we're implementing for them on their Foundation base wireframes.

So if you've already set up a Wordpress instance, with JSON API plugin activated 
you just have to put in WF_URL you're complete address to reach it

e.g.:

var WF_URL = 'http://www.example.com/api/';

  
The way the whole thing is managed right now is that in the wordpress instance 
we're managing more than one project for Wireframes, so we're using categories
to address one particular project.

This way I'm defining WF_PRJ as the category_slug for the project.

e.g.:

var WF_URL = 'project_wf'

We're using custom post types here, you can add them through a very basic functions.php 
piece of code on the theme or with some magic plugin.

Thanks, we are open source. we are nois3.