var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

// load keys
require('dotenv').config()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

const TEL_KEY = process.env.TEL_KEY
const SEND_MESSAGE_URL = 'https://api.telegram.org/bot${TEL_KEY}/sendMessage'

//This is the route the API will call
app.post('/new-message', function(req, res) {
  console.log(res)
  console.log(req)
  console.log(req.body)
  
  // message object has text and chat fields. chat has an ID, which is the id of the chat we are in
  const {message} = req.body

  // if no message or no matteo, reply nothing
  if (!message || message.text.toLowerCase().indexOf('matteo') < 0) {
    return res.end()
  }

  // if matteo, send a reply
  axios.post(SEND_MESSAGE_URL, {
    chat_id: message.chat.id,
    text: 'SCAM!!'
  })
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});
