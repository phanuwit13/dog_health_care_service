const express = require('express')
const route = express.Router()
const car_tracking = require('../controllers/car_tracking')
const dog_health_care = require('../controllers/dog_health_care')

module.exports = route

route.post('/login', car_tracking.login(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

route.get(
  '/getcompanyselection',
  car_tracking.getCompanySelection(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)

route.get(
  '/test_data',
  dog_health_care.test(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)

route.post(
  '/getcompanydata',
  car_tracking.getcompanyData(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)
