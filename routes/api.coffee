apiRoutes = (app) ->
  app.get '/api/student_profile', (req,res) ->
    profile = req.user
    res.status(200).json(profile)

  app.post '/api/student_subject', (req,res) ->

    studentSubjects = require '../database/student_sub'

    studentSubjects req, (subject_details) ->

      if subject_details
        console.log 'Subject details are :',subject_details
        res.status(200).json(subject_details)
      res.status(404).end();

module.exports = apiRoutes
