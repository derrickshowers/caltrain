(function($) {
  'use strict';

  var settings = {
    stopCodes: [
      {
        stopName: 'San Francisco 4th & King',
        stopCodeNB: '70011',
        stopCodeSB: '70012'
      },
      {
        stopName: '22nd Street',
        stopCodeNB: '70021',
        stopCodeSB: '70022'
      },
      {
        stopName: 'Bayshore',
        stopCodeNB: '70031',
        stopCodeSB: '70032'
      },
      {
        stopName: 'Southern San Francisco',
        stopCodeNB: '70041',
        stopCodeSB: '70042'
      },
      {
        stopName: 'San Bruno',
        stopCodeNB: '70051',
        stopCodeSB: '70052'
      },
      {
        stopName: 'Millbrae',
        stopCodeNB: '70061',
        stopCodeSB: '70062'
      },
      {
        stopName: 'Burlingame',
        stopCodeNB: '70081',
        stopCodeSB: '70082'
      },
      {
        stopName: 'San Mateo',
        stopCodeNB: '70091',
        stopCodeSB: '70092'
      },
      {
        stopName: 'Hayward Park',
        stopCodeNB: '70101',
        stopCodeSB: '70102'
      },
      {
        stopName: 'Hillsdale',
        stopCodeNB: '70111',
        stopCodeSB: '70112'
      },
      {
        stopName: 'Belmont',
        stopCodeNB: '70121',
        stopCodeSB: '70122'
      },
      {
        stopName: 'San Carlos',
        stopCodeNB: '70131',
        stopCodeSB: '70132'
      },
      {
        stopName: 'Redwood City',
        stopCodeNB: '70141',
        stopCodeSB: '70142'
      },
      {
        stopName: 'Menlo Park',
        stopCodeNB: '70161',
        stopCodeSB: '70162'
      },
      {
        stopName: 'Palo Alto',
        stopCodeNB: '70171',
        stopCodeSB: '70172'
      },
      {
        stopName: 'California Avenue',
        stopCodeNB: '70191',
        stopCodeSB: '70192'
      },
      {
        stopName: 'San Antonio',
        stopCodeNB: '70201',
        stopCodeSB: '70202'
      },
      {
        stopName: 'Mountain View',
        stopCodeNB: '70211',
        stopCodeSB: '70212'
      },
      {
        stopName: 'Sunnyvale',
        stopCodeNB: '70221',
        stopCodeSB: '70222'
      },
      {
        stopName: 'Lawrence',
        stopCodeNB: '70231',
        stopCodeSB: '70232'
      },
      {
        stopName: 'Santa Clara',
        stopCodeNB: '70241',
        stopCodeSB: '70242'
      },
      {
        stopName: 'San Jose Diridon',
        stopCodeNB: '70261',
        stopCodeSB: '70262'
      }
    ]
  }

  /**
   * appends stuff to the DOM
   * @return none
   */
  function appendTime(routeType, routeDirection, nextTime) {
    var li,
        textNode,
        resultsArea = document.getElementById('results');

    // remove intro if it's there
    $('#introduction').remove();

    // create heading if it doesn't exist
    if ($('.heading').length < 1) {
      appendLI('type', 'heading');
      appendLI('route', 'heading');
      appendLI('time', 'heading');
    }

    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        appendLI(arguments[i]);
      }
    } else {
      appendLI(arguments[0], 'error');
    }

    function appendLI(text, type) {
      li = document.createElement('li');
      textNode = document.createTextNode(text);
      li.appendChild(textNode);
      if (type === 'error') {
        li.className = 'timeInfo error'
      } else if (type === 'heading') {
        li.className = 'heading'
      } else {
        li.className = 'timeInfo';
      }
      resultsArea.appendChild(li);
    }
  }

  /**
   * does the AJAX call to get the goods
   * @param {string} stopCode numerical code that ids stop
   * @return none
   */
  function getTimes(stopCode) {
    var url = '';

    // look for params in the url for debugging
    var dataParam = window.location.search.split("data=")[1];
    if (dataParam === 'raw') {
      window.open('/api/times/' + stopCode + '/raw', '_blank');
    }

    // use mock json if data=mock passed as param
    if (dataParam === 'mock') {
      url = '/js/mock.json';
    } else {
      url = '/api/times/' + stopCode;
    }

    $.get(url, function(data) {
      var routeType,
          routeDirection,
          nextTime,
          noTrain = true,
          cleanData = data.RTT.AgencyList[0].Agency[0].RouteList[0].Route;

      for (var i = 0; i < cleanData.length; i++) {
        routeType = cleanData[i].$.Name;
        console.log(routeType);
        for (var i2 = 0; i2 < cleanData[i].RouteDirectionList[0].RouteDirection.length; i2++) {
          routeDirection = cleanData[i].RouteDirectionList[0].RouteDirection[i2].$.Name;
          nextTime = cleanData[i].RouteDirectionList[0].RouteDirection[i2].StopList[0].Stop[0].DepartureTimeList[0].DepartureTime;
          if (nextTime !== undefined) {
            nextTime = nextTime[0] + ' mins';
            appendTime(routeType, routeDirection, nextTime);
            noTrain = false;
          }
        }
      }

      if (noTrain) {
        appendTime('no more trians');
      }

    });
  }

  /**
   * get the stop code
   * @param {string} stopName the name of the stop
   * @param {string} direction north or south, assumed south if nothing is passed
   * @return {string or null} the stop code id, or null if nothing matches
   */
  function findStopCode(stopName, direction) {
    for (var i = 0; i < settings.stopCodes.length; i++) {
      if (settings.stopCodes[i].stopName === stopName) {
        return (direction === 'north') ? settings.stopCodes[i].stopCodeNB : settings.stopCodes[i].stopCodeSB;
      }
    }
    return null;
  }

  /**
   * eventually this will validate and such. right now it's just a way to
   * modularize the code a bit.
   */
  function validateSubmit() {
    var direction = $('.direction.selected').attr('id');
    var stopCode = findStopCode(document.getElementById('search').value, direction);
    
    // clear previous times
    $('.timeInfo').remove();

    if (stopCode !== '' && stopCode !== null && direction !== '') {
      getTimes(stopCode, direction);
    } else if (stopCode === null) {
      appendTime('are you sure you typed the station correctly?')
    }
  }

  /**
   * does just what you'd think it does
   * no return, no parmas, just init
   */
  function init() {

    // click even handler for north/south buttons
    $('.direction').on('click', function() {
      var $this = $(this);
      $('.direction').each(function() {
        if ($this !== $(this)) {
          $(this).removeClass('selected')
        }
      })
      $(this).addClass('selected');
      validateSubmit();
    })

    // TODO: See if we can use settings.stopCodes instead of this.
    // For now, this is an array of stations for the autocomplete thinger.
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
        'Santa Clara',
        'San Jose Diridon'
      ],
      close: function() {
        // when autocomplete closes, remove selected state from north/south buttons
        $('.direction').each(function() {
          $(this).removeClass('selected');
        });
      }
    });

  }

  init();

})(jQuery);