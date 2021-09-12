console.log('Server-side code running');

const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT||76;

// serve files from the public directory
app.use(express.static('public'));

// needed to parse JSON data in the body of POST requests
app.use(bodyparser.json());


// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public');
});

app.listen(port, () => {
    console.log(`Matrix listening at http://localhost:${port}`)
  })