const express = require('express')
const app = express()
const api = require('./routes/api');
var bodyParser = require('body-parser')
const cors = require("cors");
const formData = require("express-form-data");
app.use(formData.parse());


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World big')
})
app.use('/api', api);

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})