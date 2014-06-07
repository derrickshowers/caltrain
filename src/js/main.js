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

  // init
  $('#search').autocomplete({
    source: ['San Jose', 'Mountain View', 'San Francisco']
  });
  //getTimes('70012');

})(jQuery);