module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.editor = editor;

function index(req, res){
  res.render('index', {layout: 'layout', title: 'Index Title'});

};
function login(req, res){
  res.render('login', {layout: 'layout', title: 'login Title'});
};
function loginProcess(req, res){
  res.redirect('/');
};
function chat(req, res){
  res.render('chat', {layout: 'layout', title: 'Chat Title'});
};

function editor(reg, res) {
 res.send('Editor');
};