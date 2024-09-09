const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html')
})
app.use(express.static('public'));


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  const msg = {
    to: email, 
    from: 'arshpreetsingh.toor@gmail.com', 
    subject: 'Welcome to DEV@Deakin!',
    text: 'Thank you for subscribing to our platform!',
    html: '<strong>Welcome to DEV@Deakin!</strong><p>We are glad to have you with us.</p>',
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Welcome email sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(8080, function (request, response) {
  console.log("Port is running on 8080");
})
