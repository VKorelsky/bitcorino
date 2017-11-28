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

// this is our hook, messages arrive here
app.post('/new-message', function(req, res) {
  // message object has text and chat fields. chat has an ID, which is the id of the chat we are in
  const {message} = req.body

  // debugging purposes
  console.log("MESSAGE-- " +  message.text)

  // if no message, reply nothing
  if (!message || !message.text) { return res.end() }
  const messageBody = message.text

  // ROUTING
  if (messageBody.indexOf('/scam matteo') >= 0 ) {
      sendMessage(message.chat.id, 'SCAM!!')
  } else if (messageBody.indexOf('who are you Johny ?') >= 0) {
      sendMessage(message.chat.id, 'I am Jonhy Bitcorino, from brooklyn ! I trade bitcoin and drink kawfee.')
  } else if (messageBody.indexOf("Hows it going") >= 0) {
      sendMessage(message.chat.id, "It's going FANTASTIC. Bitcoin just hit 10 000 & I am feeling great.")
  } else {
    // if nothing matches, send nothing
    return res.end()
  }
});

function sendMessage (chatId, messageContent) {
  axios.post(SEND_MESSAGE_URL, {
    chat_id: chatId,
    text: messageContent
  })
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })
}

// Finally, start the server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Telegram app listening on port ${process.env.PORT || 3000}!`);
});
