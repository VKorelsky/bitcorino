var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const Axios = require('axios')

// const Matrix = require('./matrix.js')
// regression = Matrix.new()

// load keys
require('dotenv').config()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

const TEL_KEY = process.env.TEL_KEY

const BASE_URL = `https://api.telegram.org/bot${TEL_KEY}/`
const SEND_MESSAGE_URL = BASE_URL + `/sendMessage`
const SEND_VOICE_MESSAGE_URL = BASE_URL + `/sendVoice`

console.log(SEND_VOICE_MESSAGE_URL);

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
      sendMessage('SCAM!!')
  } else if (messageBody.indexOf('/scam') >= 0) {
      sendMessage("I smell 1 scammer here")
  } else if (messageBody.indexOf('who are you Johny ?') >= 0) {
      sendMessage('I am Jonhy Bitcorino, from brooklyn ! I trade bitcoin and drink kawfee.')
  } else if (messageBody.indexOf("Hows it going") >= 0) {
      sendMessage("It's going FANTASTIC. Bitcoin just hit 10 000 & I am feeling great.")
  } else if (messageBody.indexOf("What do you think of Martha") >= 0) {
      sendVoiceMessage("martha")
  } else {
    // if nothing matches, send nothing
    return res.end()
  }
  // } else if (messageBody.indexOf("/regress") >= 0) {
  //   regressCoeffs = Matrix.getSummary()
  //
  //   // turn the map into a string and return that
  //   sendMessage(regressCoeffs)

  // Execute
  function sendMessage (messageContent) {
    Axios.post(SEND_MESSAGE_URL, {
      chat_id: message.chat.id,
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

  function sendVoiceMessage (audio_file_name) {
      Axios.post(SEND_VOICE_MESSAGE_URL, {
        chat_id: message.chat.id,
        voice: `https://salty-ridge-99287.herokuapp.com/${audio_file_name}`
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
});

app.get('/martha', function(req, res){
   let file = __dirname + '/audio/martha.mp3'
   res.download(file)
});


// Finally, start the server
app.listen(process.env.PORT || 3000, function() {
  console.log(`Telegram app listening on port ${process.env.PORT || 3000}!`);
});
