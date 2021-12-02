var mysql = require('mysql')

const connection = process.env.PORT
  ? mysql.createConnection({
      host: 'wcwimj6zu5aaddlj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'wbj4x2s8caz4aouq',
      password: 'sxxd8dompo4bz4t8',
      database: 'lfl2n7c3v5tz3hur',
    })
  : mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dogs_health',
    })

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'car_tracking',
// })

exports.connection = connection
