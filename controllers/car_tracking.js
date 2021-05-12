const e = require('express')
const db = require('../util/db')
const database = db.connection

database.connect()
exports.login = (req, res, next) => {
  return (req, res, next) => {
    var query = 'SELECT * from user where identification_id like ? '
    try {
      database.query(
        query,
        [req.body.identification_id],
        function (err, rows, fields) {
          if (err) {
            throw new Error(err)
          }
          if (rows.length > 0) {
            console.log(rows[0].password + ' : ' + req.body.password)
            if (rows[0].password === req.body.password) {
              res.data = {
                success: true,
                data: rows[0],
                message: 'เข้าสู่ระบบสำเร็จ !',
              }
            } else {
              return res.status(200).json(
                (res.data = {
                  success: false,
                  data: null,
                  message: 'รหัสผ่านไม่ถูกต้อง !',
                })
              )
            }
          } else {
            res
              .status(200)
              .json({ success: false, data: null, message: 'ไม่พบ User !' })
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getCompanySelection = (req, res, next) => {
  return (req, res, next) => {
    var query = 'SELECT * from company '
    database.query(query, function (err, rows, fields) {
      if (err) {
        res.status(200).json({ success: false, data: null, message: err })
      }
      if (rows.length > 0) {
        res.data = {
          success: true,
          data: rows,
          message: 'พบสถานประกอบการ !',
        }
      } else {
        res.status(200).json({
          success: false,
          data: null,
          message: 'ไม่พบสถานประกอบการ !',
        })
      }
      next()
    })
  }
}

exports.driverRegister = (req, res, next) => {
  return (req, res, next) => {
    try {
      var query = 'SELECT * from user'
      var insertUser =
        'INSERT INTO user (driver_id, identification_id,password,driver_title,driver_fname,driver_lname,carcard_id,company_id,status,type_driver,exd_carcard_id,status_carcard_id,driver_phone) VALUES (null, ?,?,?,?,?,?,?,?,?,?,?,?)'
      database.query(query, function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }

        if (rows.length > 0) {
          var identificationArr = rows.map(function (item) {
            return item.identification_id
          })
          var carcardArr = rows.map(function (item) {
            return item.carcard_id
          })
          if (identificationArr.indexOf(req.body.identification_id) !== -1) {
            res.status(200).json({
              success: false,
              data: null,
              message: 'เลขบัตรประชาชนนี้มีผู้ใช้แล้ว',
            })
            return
          }
          if (carcardArr.indexOf(req.body.carcard_id) !== -1) {
            res.status(200).json({
              success: false,
              data: null,
              message: 'ใบขับขี่นี้มีผู้ใช้แล้วนี้มีผู้ใช้แล้ว',
            })
            return
          }
          try {
            database.query(
              insertUser,
              [
                req.body.identification_id,
                req.body.password,
                req.body.driver_title,
                req.body.driver_fname,
                req.body.driver_lname,
                req.body.carcard_id,
                req.body.company_id,
                req.body.status,
                req.body.type_driver,
                req.body.exd_carcard_id,
                req.body.status_carcard_id,
                req.body.driver_phone,
              ],
              function (err, rows, fields) {
                if (err) throw new Error(err)
                res.data = {
                  success: true,
                  data: rows,
                  message: 'สมัครสมาชิกสำเร็จ รอการยืนยัน !',
                }
                next()
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
        } else {
          database.query(
            insertUser,
            [
              req.body.identification_id,
              req.body.password,
              req.body.driver_title,
              req.body.driver_fname,
              req.body.driver_lname,
              req.body.carcard_id,
              req.body.company_id,
              req.body.status,
              req.body.type_driver,
              req.body.exd_carcard_id,
              req.body.status_carcard_id,
              req.body.driver_phone,
            ],
            function (err, rows, fields) {
              if (err) throw new Error(err)
              console.log('1 record inserted')
              next()
            }
          )
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.companyRegister = (req, res, next) => {
  return (req, res, next) => {
    try {
      var query = 'SELECT * from user'
      var insertUser =
        'INSERT INTO user (driver_id, identification_id,password,driver_title,driver_fname,driver_lname,carcard_id,company_id,status,type_driver,exd_carcard_id,status_carcard_id) VALUES (null, ?,?,?,?,?,?,?,?,?,?,?)'
      var insertCompany =
        'INSERT INTO company (company_id, company_name,company_address,company_phone,status) VALUES (null, ?,?,?,?)'

      database.query(query, function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }

        if (rows.length > 0) {
          var identificationArr = rows.map(function (item) {
            return item.identification_id
          })
          var carcardArr = rows.map(function (item) {
            return item.carcard_id
          })
          if (identificationArr.indexOf(req.body.identification_id) !== -1) {
            res.status(200).json({
              success: false,
              data: null,
              message: 'เลขบัตรประชาชนนี้มีผู้ใช้แล้ว',
            })
            return
          }
          if (carcardArr.indexOf(req.body.carcard_id) !== -1) {
            res.status(200).json({
              success: false,
              data: null,
              message: 'ใบขับขี่นี้มีผู้ใช้แล้วนี้มีผู้ใช้แล้ว',
            })
            return
          }
          try {
            database.query(
              insertCompany,
              [
                req.body.company_name,
                req.body.company_address,
                req.body.company_phone,
                req.body.status,
              ],
              function (err, rows, fields) {
                if (err) throw new Error(err)
                try {
                  database.query(
                    insertUser,
                    [
                      req.body.identification_id,
                      req.body.password,
                      req.body.driver_title,
                      req.body.driver_fname,
                      req.body.driver_lname,
                      req.body.carcard_id,
                      rows.insertId,
                      req.body.status,
                      req.body.type_driver,
                      req.body.exd_carcard_id,
                      req.body.status_carcard_id,
                    ],
                    function (err, rows, fields) {
                      if (err) throw new Error(err)
                      res.data = {
                        success: true,
                        data: rows,
                        message: 'สมัครสมาชิกสำเร็จ รอการยืนยัน !',
                      }
                      next()
                    }
                  )
                } catch (error) {
                  return res.status(200).json({
                    success: false,
                    data: null,
                    message: error.message,
                  })
                }
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
        } else {
          try {
            database.query(
              insertCompany,
              [
                req.body.company_name,
                req.body.company_address,
                req.body.company_phone,
                req.body.status,
              ],
              function (err, rows, fields) {
                if (err) throw new Error(err)
                try {
                  database.query(
                    insertUser,
                    [
                      req.body.identification_id,
                      req.body.password,
                      req.body.driver_title,
                      req.body.driver_fname,
                      req.body.driver_lname,
                      req.body.carcard_id,
                      rows.insertId,
                      req.body.status,
                      req.body.type_driver,
                    ],
                    function (err, rows, fields) {
                      if (err) throw new Error(err)
                      res.data = {
                        success: true,
                        data: rows,
                        message: 'สมัครสมาชิกสำเร็จ รอการยืนยัน !',
                      }
                      next()
                    }
                  )
                } catch (error) {
                  return res.status(200).json({
                    success: false,
                    data: null,
                    message: error.message,
                  })
                }
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getcompanyData = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * from user as u LEFT JOIN company as c on u.company_id = c.company_id where (type_driver = 1 && c.status LIKE ?)&&c.company_id Like ? '
    try {
      database.query(
        query,
        ['%' + req.body.status + '%', '%' + req.body.company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: null,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.updateCompany = (req, res, next) => {
  return (req, res, next) => {
    var updateCompany =
      'UPDATE company SET company_name = ?, company_address = ?,company_phone=?,status=? WHERE company_id =?;'
    var updateUser =
      'UPDATE user SET driver_title = ?, driver_fname = ?,driver_lname=?,password=?,status=?,exd_carcard_id=?,status_carcard_id=? WHERE driver_id =?;'
    var updateStatus = 'UPDATE user SET status=? WHERE company_id =?'
    try {
      database.query(
        updateCompany,
        [
          req.body.company_name,
          req.body.company_address,
          req.body.company_phone,
          req.body.status,
          req.body.company_id,
        ],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          try {
            database.query(
              updateUser,
              [
                req.body.driver_title,
                req.body.driver_fname,
                req.body.driver_lname,
                req.body.password,
                req.body.status,
                req.body.exd_carcard_id,
                req.body.status_carcard_id,
                req.body.driver_id,
              ],
              function (err, rows, fields) {
                if (err) {
                  // res.status(200).json({ success: false, data: null, message: err });
                  throw new Error(err)
                }
                try {
                  database.query(
                    updateStatus,
                    [req.body.status, req.body.company_id],
                    function (err, rows, fields) {
                      if (err) {
                        // res.status(200).json({ success: false, data: null, message: err });
                        throw new Error(err)
                      }
                      res.data = {
                        success: true,
                        data: rows,
                        message: 'อัพเดทข้อมูลสำเร็จ !',
                      }
                      next()
                    }
                  )
                } catch (error) {
                  return res.status(200).json({
                    success: false,
                    data: null,
                    message: error.message,
                  })
                }
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.deleteCompany = (req, res, next) => {
  return (req, res, next) => {
    var deleteUser = 'DELETE FROM user WHERE company_id = ?'
    var deleteCompany = 'DELETE FROM company WHERE company_id = ?'
    try {
      database.query(
        deleteUser,
        [req.body.company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          try {
            database.query(
              deleteCompany,
              [req.body.company_id],
              function (err, rows, fields) {
                if (err) {
                  // res.status(200).json({ success: false, data: null, message: err });
                  throw new Error(err)
                }
                res.data = {
                  success: true,
                  data: rows,
                  message: 'ลบข้อมูลสำเร็จ !',
                }
                next()
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getExdUser = (req, res, next) => {
  return (req, res, next) => {
    var exdUser =
      "SELECT * FROM `user` WHERE  type_driver = 0 &&status_carcard_id =0 && status LIKE 'approved' "

    try {
      database.query(exdUser, function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }
        if (rows.length > 0) {
          // res.status(200).json({ success: false, data: null, message: err });
          res.data = {
            success: true,
            data: rows,
            message: 'พบข้อมูล !',
          }
          next()
        } else {
          res.data = {
            success: false,
            data: rows,
            message: 'ไม่พบข้อมูล !',
          }
          next()
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.updateStatusCarcardId = (req, res, next) => {
  return (req, res, next) => {
    var updateStatus =
      'UPDATE user SET status_carcard_id = ? WHERE driver_id LIKE ? '
    try {
      database.query(
        updateStatus,
        [req.body.status_carcard_id, req.body.driver_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          res.data = {
            success: true,
            data: rows,
            message: 'อัพเดทข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getLoseExdUser = (req, res, next) => {
  return (req, res, next) => {
    var exdUser =
      "SELECT * FROM `user` as u LEFT JOIN company as c on u.company_id = c.company_id WHERE   type_driver = 0 && status_carcard_id = 1 && u.status LIKE 'approved'&&  u.company_id like ? "
    try {
      database.query(
        exdUser,
        [req.body.company_id ? '%' + req.body.company_id : '%'],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          if (rows.length > 0) {
            // res.status(200).json({ success: false, data: null, message: err });
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: rows,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.updateDriver = (req, res, next) => {
  return (req, res, next) => {
    var updateUser =
      'UPDATE user SET driver_title = ?, driver_fname = ?,driver_lname=?,password=?,status=?,exd_carcard_id=?,status_carcard_id=?,driver_phone=?,company_id=? WHERE driver_id =?;'
    try {
      database.query(
        updateUser,
        [
          req.body.driver_title,
          req.body.driver_fname,
          req.body.driver_lname,
          req.body.password,
          req.body.status,
          req.body.exd_carcard_id,
          req.body.status_carcard_id,
          req.body.driver_phone,
          req.body.company_id,
          req.body.driver_id,
        ],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          res.data = {
            success: true,
            data: rows,
            message: 'อัพเดทข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getDriver = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * from user as u LEFT JOIN company as c on u.company_id = c.company_id where (type_driver = 0 && u.status LIKE ?)&& c.company_id Like ? '
    try {
      database.query(
        query,
        ['%' + req.body.status + '%', '%' + req.body.company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: null,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getDriverOne = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * from user as u LEFT JOIN company as c on u.company_id = c.company_id where driver_id = ? '
    try {
      database.query(query, [req.body.driver_id], function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }

        if (rows.length > 0) {
          res.data = {
            success: true,
            data: rows,
            message: 'พบข้อมูล !',
          }
          next()
        } else {
          res.data = {
            success: false,
            data: null,
            message: 'ไม่พบข้อมูล !',
          }
          next()
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.deleteUser = (req, res, next) => {
  return (req, res, next) => {
    var deleteUser = 'DELETE FROM user WHERE driver_id = ?'
    try {
      database.query(
        deleteUser,
        [req.body.driver_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          res.data = {
            success: true,
            data: rows,
            message: 'ลบข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getCar = (req, res, next) => {
  return (req, res, next) => {
    var queryCar =
      'SELECT * from car LEFT JOIN company as c on car.company_id = c.company_id where c.company_id LIKE ? '
    try {
      database.query(
        queryCar,
        ['%' + req.body.company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: null,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.deleteCar = (req, res, next) => {
  return (req, res, next) => {
    var deleteCar = 'DELETE FROM car WHERE car_id = ?'
    try {
      database.query(
        deleteCar,
        [req.body.car_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          res.data = {
            success: true,
            data: rows,
            message: 'ลบข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.addCar = (req, res, next) => {
  return (req, res, next) => {
    var getCar = 'SELECT * from car'
    var addCar =
      'INSERT INTO car (car_id,car_number, provinces,car_color,car_brand,car_detail,company_id,route_id) VALUES (null, ?,?,?,?,?,?,?)'
    var round =
      'INSERT INTO car_round (car_round_id,car_id) VALUES (null, ?)'
    try {
      database.query(getCar, function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }
        if (rows.length > 0) {
          var carnumberArr = rows.map(function (item) {
            return item.car_number
          })
          if (carnumberArr.indexOf(req.body.car_number) !== -1) {
            res.status(200).json({
              success: false,
              data: null,
              message: 'ทะเบียนรถนี้มีผู้ลงทะเบียนแล้ว !',
            })
            return
          }
          try {
            database.query(
              addCar,
              [
                req.body.car_number,
                req.body.provinces,
                req.body.car_color,
                req.body.car_brand.toUpperCase(),
                req.body.car_detail,
                req.body.company_id,
                req.body.route_id,
              ],
              function (err, rows, fields) {
                if (err) {
                  // res.status(200).json({ success: false, data: null, message: err });
                  throw new Error(err)
                }
                try {
                  database.query(
                    round,
                    [
                      rows.insertId,
                    ],
                    function (err, rows, fields) {
                      if (err) {
                        // res.status(200).json({ success: false, data: null, message: err });
                        throw new Error(err)
                      }
                      res.data = {
                        success: true,
                        data: rows,
                        message: 'เพิ่มข้อมูลสำเร็จ !',
                      }
                      next()
                    }
                  )
                } catch (error) {
                  return res
                    .status(200)
                    .json({
                      success: false,
                      data: null,
                      message: error.message,
                    })
                }
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
        } else {
          try {
            database.query(
              addCar,
              [
                req.body.car_number,
                req.body.provinces,
                req.body.car_color,
                req.body.car_brand.toUpperCase(),
                req.body.car_detail,
                req.body.company_id,
                req.body.route_id,
              ],
              function (err, rows, fields) {
                if (err) {
                  // res.status(200).json({ success: false, data: null, message: err });
                  throw new Error(err)
                }

                res.data = {
                  success: true,
                  data: rows,
                  message: 'เพิ่มข้อมูลสำเร็จ !',
                }
                next()
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
        }
      })
    } catch (error) {}
  }
}
exports.updateCar = (req, res, next) => {
  return (req, res, next) => {
    var updateCar =
      'UPDATE car SET car_number = ?, provinces = ?,car_color=?,car_brand=?,car_detail=?,company_id=? ,route_id=? WHERE car_id =?;'
    try {
      database.query(
        updateCar,
        [
          req.body.car_number,
          req.body.provinces,
          req.body.car_color,
          req.body.car_brand.toUpperCase(),
          req.body.car_detail,
          req.body.company_id,
          req.body.route_id,
          req.body.car_id,
        ],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          res.data = {
            success: true,
            data: rows,
            message: 'อัพเดทข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getRoutePosition = (req, res, next) => {
  return (req, res, next) => {
    var query = 'SELECT * from position_route where route_id = ? && direction=?'
    try {
      database.query(
        query,
        [req.body.route_id, req.body.direction],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: null,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getRouteSelect = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT route_id,route_name,routes.route_company_id,route_price,route_company.company_id,route_number,company_name, company_address,company_phone FROM `routes` LEFT JOIN route_company ON routes.route_company_id = route_company.route_company_id LEFT JOIN company ON route_company.company_id = company.company_id WHERE routes.route_company_id LIKE ?'
    try {
      database.query(
        query,
        ['%' + req.body.route_company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: null,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getRouteEdit = (req, res, next) => {
  return (req, res, next) => {
    var query = 'SELECT * from routes where route_id = ?'
    try {
      database.query(query, [req.body.route_id], function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }

        if (rows.length > 0) {
          res.data = {
            success: true,
            data: rows,
            message: 'พบข้อมูล !',
          }
          next()
        } else {
          res.data = {
            success: false,
            data: null,
            message: 'ไม่พบข้อมูล !',
          }
          next()
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.updateRoute = (req, res, next) => {
  return (req, res, next) => {
    let point = JSON.parse(req.body.position)
    var updateCompany =
      'UPDATE routes SET route_name = ?,route_price=?,route_company_id=? WHERE route_id =?;'
    var deletePosition =
      'DELETE FROM position_route WHERE route_id=? && direction=?;'
    var insertPosition =
      'INSERT INTO position_route (position_id,lat, lng, route_id,direction)VALUES (null, ?, ?, ?,?)'
    try {
      database.query(
        updateCompany,
        [
          req.body.route_name,
          req.body.route_price,
          req.body.route_company_id,
          req.body.route_id,
        ],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          try {
            database.query(
              deletePosition,
              [req.body.route_id, req.body.direction],
              function (err, rows, fields) {
                if (err) {
                  // res.status(200).json({ success: false, data: null, message: err });
                  throw new Error(err)
                }
              }
            )
          } catch (error) {
            return res
              .status(200)
              .json({ success: false, data: null, message: error.message })
          }
          for (let i = 0; i < point.length; i++) {
            try {
              database.query(
                insertPosition,
                [
                  point[i].lat,
                  point[i].lng,
                  req.body.route_id,
                  req.body.direction,
                ],
                function (err, rows, fields) {
                  if (err) {
                    // res.status(200).json({ success: false, data: null, message: err });
                    throw new Error(err)
                  }
                }
              )
            } catch (error) {
              return res
                .status(200)
                .json({ success: false, data: null, message: error.message })
            }
          }
          res.data = {
            success: true,
            data: rows,
            message: 'อัพเดทข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.addRoute = (req, res, next) => {
  return (req, res, next) => {
    let point = JSON.parse(req.body.position)
    var insertCompany =
      'INSERT into routes (route_id,route_name, route_price,route_company_id)VALUES (null, ?, ?,?)'
    var insertPosition =
      'INSERT INTO position_route (position_id,lat, lng, route_id,direction)VALUES (null, ?, ?, ?,?)'
    if (req.body.route_id != undefined) {
      console.log(req.body.route_id)
      for (let i = 0; i < point.length; i++) {
        try {
          database.query(
            insertPosition,
            [point[i].lat, point[i].lng, req.body.route_id, req.body.direction],
            function (err, rows, fields) {
              if (err) {
                // res.status(200).json({ success: false, data: null, message: err });
                throw new Error(err)
              }
            }
          )
        } catch (error) {
          return res
            .status(200)
            .json({ success: false, data: null, message: error.message })
        }
      }
      res.data = {
        success: true,
        data: [],
        message: 'อัพเดทข้อมูลสำเร็จ !',
      }
      next()
    } else {
      console.log('phanuwit')
      try {
        database.query(
          insertCompany,
          [
            req.body.route_name,
            req.body.route_price,
            req.body.route_company_id,
          ],
          function (err, rows, fields) {
            if (err) {
              // res.status(200).json({ success: false, data: null, message: err });
              throw new Error(err)
            }
            for (let i = 0; i < point.length; i++) {
              try {
                database.query(
                  insertPosition,
                  [
                    point[i].lat,
                    point[i].lng,
                    rows.insertId,
                    req.body.direction,
                  ],
                  function (err, rows, fields) {
                    if (err) {
                      // res.status(200).json({ success: false, data: null, message: err });
                      throw new Error(err)
                    }
                  }
                )
              } catch (error) {
                return res
                  .status(200)
                  .json({ success: false, data: null, message: error.message })
              }
            }
            res.data = {
              success: true,
              data: rows,
              message: 'อัพเดทข้อมูลสำเร็จ !',
            }
            next()
          }
        )
      } catch (error) {
        return res
          .status(200)
          .json({ success: false, data: null, message: error.message })
      }
    }
  }
}
exports.getRouteGo = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * FROM routes INNER JOIN (SELECT route_id FROM `position_route` as pr1 WHERE pr1.direction =0 AND NOT route_id IN ( SELECT route_id FROM `position_route` as pr2 WHERE pr2.direction =1) GROUP BY route_id) AS routeselect ON routes.route_id = routeselect.route_id LEFT JOIN route_company ON routes.route_company_id = route_company.route_company_id'
    try {
      database.query(query, function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }
        if (rows.length > 0) {
          res.data = {
            success: true,
            data: rows,
            message: 'พบข้อมูล !',
          }
          next()
        } else {
          res.data = {
            success: false,
            data: null,
            message: 'ไม่พบข้อมูล !',
          }
          next()
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.deleteRoute = (req, res, next) => {
  return (req, res, next) => {
    var deleteRoute = 'DELETE FROM routes WHERE route_id = ?'
    try {
      database.query(
        deleteRoute,
        [req.body.route_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          res.data = {
            success: true,
            data: rows,
            message: 'ลบข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.carSelectDrive = (req, res, next) => {
  return (req, res, next) => {
    var query = 'SELECT * from car where company_id = ? && driver_id is NULL'
    try {
      database.query(
        query,
        [req.body.company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: null,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getDriverEnable = (req, res, next) => {
  return (req, res, next) => {
    var query = 'SELECT * from car where driver_id = ? '
    try {
      database.query(query, [req.body.driver_id], function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }

        if (rows.length > 0) {
          res.data = {
            success: true,
            data: rows,
            message: 'พบข้อมูล !',
          }
          next()
        } else {
          res.data = {
            success: false,
            data: rows,
            message: 'ไม่พบข้อมูล !',
          }
          next()
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.setDriverEnable = (req, res, next) => {
  return (req, res, next) => {
    var query = 'UPDATE car SET driver_id = ? WHERE car_id =?;'
    try {
      database.query(
        query,
        [req.body.driver_id, req.body.car_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          res.data = {
            success: true,
            data: true,
            message: 'สำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.setDriverDisable = (req, res, next) => {
  return (req, res, next) => {
    var query = 'UPDATE car SET driver_id = NULL WHERE driver_id =?;'
    try {
      database.query(query, [req.body.driver_id], function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }

        res.data = {
          success: true,
          data: true,
          message: 'สำเร็จ !',
        }
        next()
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.setPosition = (req, res, next) => {
  return (req, res, next) => {
    var query = 'UPDATE car SET lat = ?,lng = ? WHERE car_id = ?;'
    try {
      database.query(
        query,
        [req.body.lat, req.body.lng, req.body.car_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          res.data = {
            success: true,
            data: rows,
            message: 'สำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getCarEnable = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * from car LEFT JOIN user on car.driver_id = user.driver_id where car.driver_id IS NOT NULL && route_id = ?'
    try {
      database.query(query, [req.body.route_id], function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }

        res.data = {
          success: true,
          data: rows,
          message: 'สำเร็จ !',
        }
        next()
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getRouteCompany = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * from route_company as rc LEFT JOIN company as c ON rc.company_id = c.company_id'
    try {
      database.query(query, function (err, rows, fields) {
        if (err) {
          // res.status(200).json({ success: false, data: null, message: err });
          throw new Error(err)
        }
        if (rows.length > 0) {
          res.data = {
            success: true,
            data: rows,
            message: 'พบข้อมูล !',
          }
          next()
        } else {
          res.data = {
            success: false,
            data: rows,
            message: 'ไม่พบข้อมูล !',
          }
          next()
        }
      })
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getCarRouteCompany = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * from route_company as rc LEFT JOIN company as c ON rc.company_id = c.company_id where rc.company_id = ?'
    try {
      database.query(
        query,
        [req.body.company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: rows,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.addRouteCompany = (req, res, next) => {
  return (req, res, next) => {
    var query = 'SELECT * from route_company where route_number = ?'
    var insert =
      'INSERT INTO route_company (route_company_id,company_id, route_number)VALUES (null, ?, ?)'
    try {
      database.query(
        query,
        [req.body.route_number],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.status(200).json({
              success: false,
              data: null,
              message: 'มีสายนี้อยู่ในระบบแล้ว',
            })
            return
          } else {
            try {
              database.query(
                insert,
                [
                  req.body.company_id ? req.body.company_id : null,
                  req.body.route_number,
                ],
                function (err, rows, fields) {
                  if (err) {
                    // res.status(200).json({ success: false, data: null, message: err });
                    throw new Error(err)
                  }
                  res.data = {
                    success: true,
                    data: rows,
                    message: 'เพิ่มข้อมูลสำเร็จ !',
                  }
                  next()
                }
              )
            } catch (error) {
              return res
                .status(200)
                .json({ success: false, data: null, message: error.message })
            }
          }
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.deleteRouteCompany = (req, res, next) => {
  return (req, res, next) => {
    var deleteUser = 'DELETE FROM route_company WHERE route_company_id = ?'
    try {
      database.query(
        deleteUser,
        [req.body.route_company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }
          res.data = {
            success: true,
            data: rows,
            message: 'ลบข้อมูลสำเร็จ !',
          }

          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.updateRouteCompany = (req, res, next) => {
  return (req, res, next) => {
    var update =
      'UPDATE route_company SET company_id= ?, route_number = ? where route_company_id = ?'
    var query = 'SELECT * from route_company where route_number = ?'
    if (req.body.route_number != req.body.route_number_old) {
      try {
        database.query(
          query,
          [req.body.route_number],
          function (err, rows, fields) {
            if (err) {
              // res.status(200).json({ success: false, data: null, message: err });
              throw new Error(err)
            }

            if (rows.length > 0) {
              res.status(200).json({
                success: false,
                data: null,
                message: 'มีสายนี้อยู่ในระบบแล้ว',
              })
              return
            } else {
              try {
                database.query(
                  update,
                  [
                    req.body.company_id ? req.body.company_id : null,
                    req.body.route_number,
                    req.body.route_company_id,
                  ],
                  function (err, rows, fields) {
                    if (err) {
                      // res.status(200).json({ success: false, data: null, message: err });
                      throw new Error(err)
                    }
                    res.data = {
                      success: true,
                      data: rows,
                      message: 'อัพเดทข้อมูลสำเร็จ !',
                    }
                    next()
                  }
                )
              } catch (error) {
                return res
                  .status(200)
                  .json({ success: false, data: null, message: error.message })
              }
            }
          }
        )
      } catch (error) {
        return res
          .status(200)
          .json({ success: false, data: null, message: error.message })
      }
    } else {
      try {
        database.query(
          update,
          [
            req.body.company_id ? req.body.company_id : null,
            req.body.route_number,
            req.body.route_company_id,
          ],
          function (err, rows, fields) {
            if (err) {
              // res.status(200).json({ success: false, data: null, message: err });
              throw new Error(err)
            }
            res.data = {
              success: true,
              data: rows,
              message: 'อัพเดทข้อมูลสำเร็จ !',
            }
            next()
          }
        )
      } catch (error) {
        return res
          .status(200)
          .json({ success: false, data: null, message: error.message })
      }
    }
  }
}
exports.getCompanyNotRoute = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'Select* FROM company INNER JOIN (SELECT company.company_id FROM `company` LEFT JOIN `route_company` on company.company_id = route_company.company_id WHERE route_company.company_id IS NULL || route_company.company_id = ?) as cc on company.company_id = cc.company_id'
    try {
      database.query(
        query,
        [req.body.company_id ? req.body.company_id : ''],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: rows,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getCarRound = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * FROM car_round LEFT JOIN car on car_round.car_id = car.car_id LEFT JOIN company on car.company_id = company.company_id LEFT JOIN routes on routes.route_id = car.route_id WHERE company.company_id LIKE ?'
    try {
      database.query(
        query,
        ['%' + req.body.company_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: rows,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.updateRound = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'UPDATE car_round SET round_1 = ?, round_2 = ?,round_3=?,round_4=? ,round_5=? , round_6 = ?,round_7=?,round_8=?,round_9=? ,round_10=? WHERE car_round_id =?;'
    try {
      database.query(
        query,
        [
          req.body.round_1 === 'null' ? null : req.body.round_1,
          req.body.round_2 === 'null' ? null : req.body.round_2,
          req.body.round_3 === 'null' ? null : req.body.round_3,
          req.body.round_4 === 'null' ? null : req.body.round_4,
          req.body.round_5 === 'null' ? null : req.body.round_5,
          req.body.round_6 === 'null' ? null : req.body.round_6,
          req.body.round_7 === 'null' ? null : req.body.round_7,
          req.body.round_8 === 'null' ? null : req.body.round_8,
          req.body.round_9 === 'null' ? null : req.body.round_9,
          req.body.round_10 === 'null' ? null : req.body.round_10,
          req.body.car_round_id,
        ],
        function (err, rows, fields) {
          console.log(
            req.body.round_1,
            req.body.round_2,
            req.body.round_3,
            req.body.round_4,
            req.body.round_5,
            req.body.round_6,
            req.body.round_7,
            req.body.round_8,
            req.body.round_9,
            req.body.round_10
          )
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          res.data = {
            success: true,
            data: rows,
            message: 'อัพเดทข้อมูลสำเร็จ !',
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
exports.getCarRoundShow = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * FROM car_round LEFT JOIN car on car_round.car_id = car.car_id LEFT JOIN company on car.company_id = company.company_id LEFT JOIN routes on routes.route_id = car.route_id WHERE routes.route_id LIKE ?'
    try {
      database.query(
        query,
        ['%' + req.body.route_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: rows,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}

exports.getCarRoundCar = (req, res, next) => {
  return (req, res, next) => {
    var query =
      'SELECT * FROM car_round LEFT JOIN car on car_round.car_id = car.car_id LEFT JOIN company on car.company_id = company.company_id LEFT JOIN routes on routes.route_id = car.route_id WHERE car.car_id = ?'
    try {
      database.query(
        query,
        [req.body.car_id],
        function (err, rows, fields) {
          if (err) {
            // res.status(200).json({ success: false, data: null, message: err });
            throw new Error(err)
          }

          if (rows.length > 0) {
            res.data = {
              success: true,
              data: rows,
              message: 'พบข้อมูล !',
            }
            next()
          } else {
            res.data = {
              success: false,
              data: rows,
              message: 'ไม่พบข้อมูล !',
            }
            next()
          }
          next()
        }
      )
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, data: null, message: error.message })
    }
  }
}
