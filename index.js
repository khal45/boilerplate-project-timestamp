// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
// function to check if the date is invalid
const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  // re.params.date gets the date value in the url
  let date = new Date(req.params.date);
  // condition to handle if date entered is invalid. date entered was a string that was not parsed
  if (isInvalidDate(date)) {
    date = new Date(+req.params.date);
  }

  // second instance of invalid date, date is totally not a date at all
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

// Listen on port set in environment variable or default to 3000
let listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
