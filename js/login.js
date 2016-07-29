/* global $, Firebase */

$('#loginButton').click(loginUser);
$('#registerButton').click(registerUser);
$('#cancelButton').click(cancelLogin);

function cancelLogin() {
    window.location.assign('index.html');
}

function registerUser() {
    window.location.assign('register.html');
}

function loginUser() {
    var logUser;
    var emailAccount = $('#emailAddress').val();
    var passwrd = $('#password').val();
    
    var urlBD = window.config.databaseURL;
    var ref = new Firebase( urlBD )

    logUser = {
        email: emailAccount,
        password: passwrd
    
    };
    
    ref.authWithPassword( logUser, onComplete );
}

function onComplete (error, authData) {
    if (error) {
    alert('Login Failed! ', error);
  } else {
    alert('User logged in');
    window.location.assign('index.html');
  }
}