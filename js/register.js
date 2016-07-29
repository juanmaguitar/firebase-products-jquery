/* global $, Firebase */

var urlBD = window.config.databaseURL;
var myRef = new Firebase( urlBD + "products")

var emailAddress, passwrd, passwrdConfirm;

$('#registerForm').change(function(){
    passwrd = $('#password').val();
    passwrdConfirm = $('#password2').val();
    
    if (passwrd == passwrdConfirm) {
        $('#registerButton').removeProp('disabled');
    } else {
        $('#registerButton').prop('disabled', 'disabled');
    }
}); 


$('#registerButton').click(registerUser);
$('#cancelButton').click(cancelRegister);

function registerUser() {
    
    var newUser;
    
    emailAddress = $('#emailAddress').val();
    passwrd = $('#password').val();
    
    newUser = {
        email: emailAddress,
        password: passwrd
    }
    
    myRef.createUser( newUser,  onComplete );
}

function cancelRegister() {
    window.location.assign('index.html');
}

function onComplete(error, userData) {
    if (error) {
        switch (error.code) {
      case 'EMAIL_TAKEN':
        alert('The new user account cannot be created because the email is already in use.');
        break;
      case 'INVALID_EMAIL':
        alert('The specified email is not a valid email.');
        break;
      default:
        alert('Error creating user:', error);
        } 
    } else {
        alert('Successfully created user account' );
        window.location.assign('index.html');
    }
}