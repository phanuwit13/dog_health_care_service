var DecisionTree = require('decision-tree')
var train_data_child = require('../models/child/train_data')

// var child = 10
// var teen = 96
var train_child = train_data_child.training_data()

var class_name = 'disease'

var featuresChild = [
  'age',
  'seep',
  'conjunctivitis',
  'tearStains',
  'vomit',
  'diarrhea',
  'liquidStool',
  'verySmellyStools',
  'cough',
  'fever',
]

exports.test = (req, res, next) => {
  return (req, res, next) => {
    var dt = new DecisionTree(class_name, features)
    dt.train(train_child)
    // var accuracy = dt.evaluate(test_data)
    var predicted_class = dt.predict({
      age: 'child',
      seep: false,
      conjunctivitis: false,
      tearStains: false,
      vomit: false,
      diarrhea: true,
      liquidStool: true,
      verySmellyStools: true,
      cough: false,
      fever: false,
    })

    return res.status(200).json({
      success: false,
      data: null,
      message: predicted_class,
      // accuracy: accuracy,
    })
  }
}
