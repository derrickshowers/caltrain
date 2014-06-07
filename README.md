# Caltrain Real Departures

Idea right now is to create an app that provides real time departure information for Caltrain by stop. So, if you're at Mountain View, and want to know when the next train is coming - and most importantly - if it's late, you can pull up this app. This won't replace Caltrain schedule apps, just something to use as you're on your way to the station to see if you have to run, or can walk at a leisurely pace.

I also want to pull in Twitter data so that you can see if there's anything crazy going on right under the next time of departure.

## 511 API

Yes, you can see my API token. But I don't really care - have fun with it!

*Routes:* http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?agencyName=Caltrain&token=5e58e873-398c-4408-87f4-d58b19136466
*Stops (NB):* http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~NB&token=5e58e873-398c-4408-87f4-d58b19136466
*Stops (SB):* http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~SB1&token=5e58e873-398c-4408-87f4-d58b19136466

## Series of Events

Wanted to do this entire on the front end, without creating my own API in node, but that's not possible since 511.org doesn't allow cross domain AJAX requests. I guess this will be cleaner in the log end - I'll be able to convert the XML to JSON server side (since 511.org only provides their response in XML - awesome!).