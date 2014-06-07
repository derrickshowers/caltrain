var express = require('express'),
    http = require('http');
    app = express();

// app setup
var port = process.env.PORT || 3005;

// 511 setup
var domain = 'services.my511.org';
var token = '&token=5e58e873-398c-4408-87f4-d58b19136466';

// routes
app.use(express.static(__dirname + '/src'));

app.get('/api/time/:station', function(req, res) {
  var station = req.params.station;
  var options = {
    hostname: domain,
    path: '/Transit2.0/GetNextDeparturesByStopCode.aspx?stopcode=' + station + token
  };
  
  http.request(options, function(serviceRes) {
    var data = '';

    serviceRes.on('data', function (chunk) {
      data += chunk;
    });

    serviceRes.on('end', function () {
      res.send(data);
    });
  })
  .on('error', function(e){
    console.log("Error: " + e.message);
  })
  .end();

});

app.listen(port);

/*
*  SOME QUICK NOTES
*  
*  Caltrain routes: http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?agencyName=Caltrain&token=5e58e873-398c-4408-87f4-d58b19136466
*  Stops (NB): http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~NB&token=5e58e873-398c-4408-87f4-d58b19136466
*  Stops (SB): http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?routeIDF=Caltrain~LOCAL~SB1&token=5e58e873-398c-4408-87f4-d58b19136466
*/