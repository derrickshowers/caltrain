(function($) {
  'use strict';

  var settings = {
    resultsArea: document.getElementById('results'),
    stopCodes: [
      {
        stopName: 'San Francisco 4th & King',
        stopCode: '70012'
      },
      {
        stopName: '22nd Street',
        stopCode: '70022'
      },
      {
        stopName: 'Bayshore',
        stopCode: '70032'
      },
      {
        stopName: 'Southern San Francisco',
        stopCode: '70042'
      },
      {
        stopName: 'San Bruno',
        stopCode: '70052'
      },
      {
        stopName: 'Millbrae',
        stopCode: '70062'
      },
      {
        stopName: 'Burlingame',
        stopCode: '70082'
      },
      {
        stopName: 'San Mateo',
        stopCode: '70092'
      },
      {
        stopName: 'Hayward Park',
        stopCode: '70102'
      },
      {
        stopName: 'Hillsdale',
        stopCode: '70112'
      },
      {
        stopName: 'Belmont',
        stopCode: '70122'
      },
      {
        stopName: 'San Carlos',
        stopCode: '70132'
      },
      {
        stopName: 'Redwood City',
        stopCode: '70142'
      },
      {
        stopName: 'Menlo Park',
        stopCode: '70162'
      },
      {
        stopName: 'Palo Alto',
        stopCode: '70172'
      },
      {
        stopName: 'California Avenue',
        stopCode: '70192'
      },
      {
        stopName: 'San Antonio',
        stopCode: '70202'
      },
      {
        stopName: 'Mountain View',
        stopCode: '70212'
      },
      {
        stopName: 'Sunnyvale',
        stopCode: '70222'
      },
      {
        stopName: 'Lawrence',
        stopCode: '70232'
      },
      {
        stopName: 'Santa Calra',
        stopCode: '70242'
      },
      {
        stopName: 'San Jose Diridon',
        stopCode: '70262'
      }
    ]
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
    for (var i = 0; i < settings.stopCodes.length; i++) {
      if (settings.stopCodes[i].stopName === stopName) {
        return settings.stopCodes[i].stopCode;
      }
    }
    return null;
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
    ],
    change: function() {
      getTimes(findStopCode($(this).val()));
    }
  });

})(jQuery);