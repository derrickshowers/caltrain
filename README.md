# Caltrain Real Departures

Idea right now is to create an app that provides real time departure information for Caltrain by stop. So, if you're at Mountain View, and want to know when the next train is coming - and most importantly - if it's late, you can pull up this app. This won't replace Caltrain schedule apps, just something to use as you're on your way to the station to see if you have to run, or can walk at a leisurely pace.

I also want to pull in Twitter data so that you can see if there's anything crazy going on right under the next time of departure.

## 511 API

Yes, you can see my API token. But I don't really care - have fun with it! [511.org's documentation](http://511.org/docs/RTT%20API%20V2.0%20Reference.pdf)

*Routes:* http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?agencyName=Caltrain&token=5e58e873-398c-4408-87f4-d58b19136466
*Stops (NB):* http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~NB&token=5e58e873-398c-4408-87f4-d58b19136466
*Stops (SB):* http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~SB1&token=5e58e873-398c-4408-87f4-d58b19136466

### List of Stops

*Southbound:*
San Francisco Caltrain Station" - 70012
22nd Street Caltrain Station" - 70022
Bayshore Caltrain Station" - 70032
So San Francisco Caltrain Station" - 70042
San Bruno Caltrain Station" - 70052
Millbrae Caltrain Station" - 70062
Burlingame Caltrain Station" - 70082
San Mateo Caltrain Station" - 70092
Hayward Park Caltrain Station" - 70102
Hillsdale Caltrain Station" - 70112
Belmont Caltrain Station" - 70122
San Carlos Caltrain Station" - 70132
Redwood City Caltrain Station" - 70142
Menlo Park Caltrain Station" - 70162
Palo Alto Caltrain Station" - 70172
California Ave Caltrain Station" - 70192
San Antonio Caltrain Station" - 70202
Mountain View Caltrain Station" - 70212
Sunnyvale Caltrain Station" - 70222
Lawrence Caltrain Station" - 70232
Santa Clara Caltrain Station" - 70242
San Jose Diridon Caltrain Station" - 70262

*Northbound:*
San Francisco Caltrain Station" - 70012
22nd Street Caltrain Station" - 70022
Bayshore Caltrain Station" - 70032
So San Francisco Caltrain Station" - 70042
San Bruno Caltrain Station" - 70052
Millbrae Caltrain Station" - 70062
Burlingame Caltrain Station" - 70082
San Mateo Caltrain Station" - 70092
Hayward Park Caltrain Station" - 70102
Hillsdale Caltrain Station" - 70112
Belmont Caltrain Station" - 70122
San Carlos Caltrain Station" - 70132
Redwood City Caltrain Station" - 70142
Menlo Park Caltrain Station" - 70162
Palo Alto Caltrain Station" - 70172
California Ave Caltrain Station" - 70192
San Antonio Caltrain Station" - 70202
Mountain View Caltrain Station" - 70212
Sunnyvale Caltrain Station" - 70222
Lawrence Caltrain Station" - 70232
Santa Clara Caltrain Station" - 70242
San Jose Diridon Caltrain Station" - 70262


## Series of Events

Wanted to do this entire on the front end, without creating my own API in node, but that's not possible since 511.org doesn't allow cross domain AJAX requests. I guess this will be cleaner in the log end - I'll be able to convert the XML to JSON server side (since 511.org only provides their response in XML - awesome!).

API done. Very simple - just takes a station param (which is the stopCode on 511.org's documentation), grabs the XML, and translates that into JSON using [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) and JSON.stringify().

JS on the front end gets the departure info from the API and then parses the JSON to get the necessary info. Appends that to the DOM.