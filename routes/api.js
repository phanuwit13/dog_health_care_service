const express = require('express')
const route = express.Router()
const dog_health_care = require('../controllers/dog_health_care')
const training_data = require('../models/training_data')

module.exports = route

route.get('/get_disease', dog_health_care.getDisease(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

route.get('/get_symptom', dog_health_care.getSymptom(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

route.get(
  '/get_symptom_of_disease',
  dog_health_care.getSymptomOfDisease(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)
route.post(
  '/set_symptom_of_disease',
  dog_health_care.setSymptomOfDisease(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)

route.get(
  '/get_class_symptom',
  dog_health_care.getClassSymptom(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)

route.post(
  '/predict_disease',
  training_data.training_data(),
  dog_health_care.predictDisease(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)
