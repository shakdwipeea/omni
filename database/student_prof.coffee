module.exports = (req,profileCallback)->
  conn = require './conn'
  mysql = require 'mysql'

  profile = {}
  connection = mysql.createConnection conn

  q = "select * from student_details where USN = '" + req.usn + "'"
  console.log(q)
  query = connection.query q, (err,rows) ->
    if err then console.log(err)
    profileCallback rows[0]
