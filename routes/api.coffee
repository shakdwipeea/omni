apiRoutes = (app) ->
  app.get '/api/student_profile', (req,res) ->
    profile = req.user
    res.status(200).json(profile)

module.exports = apiRoutes
