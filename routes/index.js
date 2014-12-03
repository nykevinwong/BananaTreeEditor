module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.editor = editor;

function index(req, res){
  res.cookie('IndexCookie', 'This was set from Index middleware [web server side].');
 // res.clearCookie('IndexCookie');
  res.render('index', {layout: 'layout', title: 'Index Title', cookie: JSON.stringify(req.cookies), session: JSON.stringify(req.session) });

};
function login(req, res){
  res.render('login', {layout: 'layout', title: 'login Title'});
};
function loginProcess(req, res){
  console.log(req.body);
  res.send(req.body.username + ' ' + req.body.password);

};
function chat(req, res){
  res.render('chat', {layout: 'layout', title: 'Chat Title'});
};

function editor(reg, res) {
 res.send('Editor');
};