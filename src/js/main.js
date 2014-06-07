(function($) {
  'use strict';

  // defaults
  var apiKey = '5e58e873-398c-4408-87f4-d58b19136466';
  var URL = 'http://services.my511.org/Transit2.0/';

  // first request
  var requestURL = URL + '/GetAgencies.aspx?' + apiKey;
  $.get(requestURL, function(data) {
    console.log(data);
  })

})(jQuery);