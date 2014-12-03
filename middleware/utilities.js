module.exports.csrf = function csrf(req, res, next){
  res.locals.token = req.csrfToken();
  console.log(res.locals.token);
  next();
};

// store session.user object from session to locals object when session.isAuthenticated = true
module.exports.authenticated = function authenticated(req, res, next){
  res.locals.isAuthenticated = req.session.isAuthenticated;
  if (req.session.isAuthenticated) {
    res.locals.user = req.session.user;
  }
  next();
};

// redirect to login page if Authentication failed.
module.exports.requireAuthentication = function requireAuthentication(req, res, next){
  if (req.session.isAuthenticated) {
    next();
  }else {
    res.redirect('/login');
  }
};

// simple authentication check. set session.isAuthenticated = true if username is god or satan.
module.exports.auth = function auth(username, password, session){
  var isAuth = username === 'god' || username === 'satan';
  if (isAuth) {
    session.isAuthenticated = isAuth;
    session.user = {username: username};
  }
  return isAuth;
};

module.exports.logOut = function logOut(session){
  session.isAuthenticated = false;
  delete session.user; // JavaScript delete only delete a property.
};