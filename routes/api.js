const express = require('express')
const route = express.Router()
const car_tracking = require('../controllers/car_tracking')
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

route.post(
  '/getcompanydata',
  car_tracking.getcompanyData(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)

route.post('/registeruser', car_tracking.driverRegister(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post(
  '/registercompany',
  car_tracking.companyRegister(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)
route.post('/updatecompany', car_tracking.updateCompany(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/deletecompany', car_tracking.deleteCompany(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.get('/getexduser', car_tracking.getExdUser(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post(
  '/updatestatuscarcardid',
  car_tracking.updateStatusCarcardId(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)
route.get(
  '/getloseexduser',
  car_tracking.getLoseExdUser(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)
route.post('/updatedriver', car_tracking.updateDriver(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

route.post('/getdriver', car_tracking.getDriver(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

route.post('/getdriverone', car_tracking.getDriverOne(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

route.post('/deleteuser', car_tracking.deleteUser(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

// ------------------------car
route.post('/getcar', car_tracking.getCar(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/addcar', car_tracking.addCar(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/updatecar', car_tracking.updateCar(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/deletecar', car_tracking.deleteCar(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/carselectdrive', car_tracking.carSelectDrive(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/getdriverenable', car_tracking.getDriverEnable(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/setdriverenable', car_tracking.setDriverEnable(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/setdriverdisable', car_tracking.setDriverDisable(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

//route
route.post('/getroute', car_tracking.getRoutePosition(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post(
  '/getrouteselect',
  car_tracking.getRouteSelect(),
  function (req, res) {
    var response = res.data
    res.status(200).json(response)
  }
)
route.post('/getrouteedit', car_tracking.getRouteEdit(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/updateroute', car_tracking.updateRoute(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/addroute', car_tracking.addRoute(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.get('/getroutego', car_tracking.getRouteGo(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})
route.post('/deleteroute', car_tracking.deleteRoute(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

//position
route.post('/setposition', car_tracking.setPosition(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})

route.post('/getcarenable', car_tracking.getCarEnable(), function (req, res) {
  var response = res.data
  res.status(200).json(response)
})