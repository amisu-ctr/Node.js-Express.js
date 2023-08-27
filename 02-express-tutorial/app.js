const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));
//parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).send({ success: true, person: name });
});

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ succes: false, msg: 'plesase provide name value' });
  }
  res.status(201).send({ success: true, data: [...people, name] });
});

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
