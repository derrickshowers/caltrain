(function($) {
  'use strict';

  var settings = {
    twitterSpeed: 300,
    fadeSpeed: 1000
  }

  var $twitterHeading = $('#twitter-heading'),
      deviceHeight = $(window).height(),
      headingHeight = $twitterHeading.height();

  // function for twitter timeline animation
  function animateTwitterTimeline(el, direction, bgColor) {

    el.animate({
      bottom: (direction === 'up') ? deviceHeight - headingHeight : 0,
      'background-color': bgColor,
    }, settings.twitterSpeed);
    $('.twitter-timeline-rendered').animate({
      height: (direction === 'up') ? deviceHeight - headingHeight : 0
    }, settings.twitterSpeed);

    return el.promise();

  }

  // click handler
  $twitterHeading.on('click', function(e) {
    if ($twitterHeading.offset().top === 0) {

      var animationPromise = animateTwitterTimeline($(this), 'down', '#DC3C41');

      // show return to twitter
      animationPromise.done(function() {
        $(this).text('Return to Twitter');
        $(this).animate({
          color: '#FFF'
        }, settings.fadeSpeed);
      })

    } else {
      
      var animationPromise = animateTwitterTimeline($(this), 'up', '#FFF');

      // show return text when done
      animationPromise.done(function() {
        $(this).text('Touch to return');
        $(this).animate({
          color: '#DC3C41'
        }, settings.fadeSpeed);
      })

    }

  });

})(jQuery);