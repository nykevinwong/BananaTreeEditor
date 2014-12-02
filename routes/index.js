module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.editor = editor;

function index(req, res){
  res.render('index', {layout: 'layout', title: 'Index Title'});

};
function login(req, res){
  res.send('Login');
};
function loginProcess(req, res){
  res.redirect('/');
};
function chat(req, res){
  res.send('Chat');
};

function editor(reg, res) {
 res.send('Editor');
};