(function($) {
  'use strict';

  var $twitterHeading = $('#twitter-heading'),
      deviceHeight = $(window).height(),
      headingHeight = $twitterHeading.height();

  // click handler
  $twitterHeading.on('click', function(e) {
    if ($twitterHeading.offset().top === 0) {
      $(this).animate({
        bottom: 0,
        'background-color': '#DC3C41',
      }, 300, function() {
        $(this).text('Return to Twitter');
        $(this).animate({
          color: '#FFF'
        }, 1000);
      });
      $('.twitter-timeline-rendered').animate({
        height: 0
      }, 300);
    } else {
      $(this).animate({
        bottom: deviceHeight - headingHeight,
        'background-color': '#FFF',
      }, 300, function() {
        $(this).text('Touch to return');
        $(this).animate({
          color: '#DC3C41'
        }, 1000);
      });
      $('.twitter-timeline-rendered').show();
      $('.twitter-timeline-rendered').animate({
        height: deviceHeight - headingHeight
      }, 300);
    }

  });

})(jQuery);