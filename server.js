// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {

  const now = new Date();

  res.json(toJSON(now));
});

app.get("/api/:date?", function (req, res) {

  const date = /^\d+$/.test(req.params.date) ?
      new Date(parseInt(req.params.date)) :
      new Date(req.params.date);

  if (!date.valueOf()) {
    res.json(toError());
    return;
  }

  res.json(toJSON(date));
});

const toJSON = (date) => {
  return {
    unix: date.valueOf(),
    utc: date.toUTCString()
  };
}

const toError = () => {
  return { 
    error: "Invalid Date" 
  }
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
