(function($) {
  'use strict';

  var settings = {
    resultsArea: document.getElementById('results')
  }

  function appendTime(routeType, routeDirection, nextTime) {
    var li,
        textNode,
        ul = document.createElement('ul');

    for (var i = 0; i < arguments.length; i++) {
      li = document.createElement('li');
      textNode = document.createTextNode(arguments[i]);
      li.appendChild(textNode);
      ul.appendChild(li);
    }

    settings.resultsArea.appendChild(ul);
  }

  function getTimes(stopCode) {
    $.get('/api/times/' + stopCode, function(data) {
      var routeType,
          routeDirection,
          nextTime,
          cleanData = data.RTT.AgencyList[0].Agency[0].RouteList[0].Route;

      for (var i = 0; i < cleanData.length; i++) {
        routeType = cleanData[i].$.Name;
        for (var i2 = 0; i2 < cleanData[i].RouteDirectionList[0].RouteDirection.length; i2++) {
          routeDirection = cleanData[i].RouteDirectionList[0].RouteDirection[i2].$.Name;
          nextTime = cleanData[i].RouteDirectionList[0].RouteDirection[i2].StopList[0].Stop[0].DepartureTimeList[0].DepartureTime;
          if (nextTime !== undefined) {
            nextTime = nextTime[0];
            appendTime(routeType, routeDirection, nextTime);
          }
        }
      }
    });
  }

  function findStopCode(stopName, direction) {

  }

  // init
  $('.direction').on('click', function() {
    var $this = $(this);
    $('.direction').each(function() {
      if ($this !== $(this)) {
        $(this).removeClass('selected')
      }
    })
    $(this).addClass('selected');
  })

  $('#search').autocomplete({
    source: [
      'San Francisco 4th & King',
      '22nd Street',
      'Bayshore',
      'Southern San Francisco',
      'San Bruno',
      'Millbrae',
      'Burlingame',
      'San Mateo',
      'Hayward Park',
      'Hillsdale',
      'Belmont',
      'San Carlos',
      'Redwood City',
      'Menlo Park',
      'Palo Alto',
      'California Avenue',
      'San Antonio',
      'Mountain View',
      'Sunnyvale',
      'Lawrence',
      'Santa Calra',
      'San Jose Diridon'
    ]
  });
  //getTimes('70012');

})(jQuery);