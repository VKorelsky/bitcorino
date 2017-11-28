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
const SEND_MESSAGE_URL = `https://api.telegram.org/bot${TEL_KEY}/sendMessage`

//This is the route the API will call
app.post('/new-message', function(req, res) {
  // message object has text and chat fields. chat has an ID, which is the id of the chat we are in
  const {message} = req.body

  if (!message) { return res.end() }
  const messageBody = message.text.toLowerCase()

  console.log(messageBody)

  // if no message or no matteo, reply nothing
  if (messageBody.indexOf('/scam matteo') >= 0 ) {
    console.log(1)
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
  } else if (messageBody.indexOf('who are you Johny ?') >= 0) {
    console.log(2)
    axios.post(SEND_MESSAGE_URL, {
      chat_id: message.chat.id,
      text: 'I am Jonhy Bitcorino, from brooklyn ! I trade bitcoin and drink kawfee.'
    })
      .then(response => {
        console.log('Message posted')
        res.end('ok')
      })
      .catch(err => {
        console.log('Error :', err)
        res.end('Error :' + err)
      })
  } else if (messageBody.indexOf("Hows it going") >= 0) {
    console.log(3)
    axios.post(SEND_MESSAGE_URL, {
      chat_id: message.chat.id,
      text: "It's going FANTASTIC. Bitcoin just hit 10 000 I am feeling great."
    })
      .then(response => {
        console.log('Message posted')
        res.end('ok')
      })
      .catch(err => {
        console.log('Error :', err)
        res.end('Error :' + err)
      })
  } else {
    // if nothing matches, send nothing
    return res.end()
  }

});

// Finally, start our server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Telegram app listening on port ${process.env.PORT}!`);
});
