module.exports.csrf = function csrf(req, res, next){
  res.locals.token = req.csrfToken();
  console.log(res.locals.token);
  next();
};