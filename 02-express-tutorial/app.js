const express = require('express');
const app = express();

// static assets
app.use(express.static('./methods-public'));
//parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.post('/login', (req, res) => {
  console.log(req.body); //set urlecoded middleware to access form values
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name} `);
  }
  res.status(401).send('Enter Credentials');
});

app.listen(5000, () => {
  console.log('listening to port 5000');
});
