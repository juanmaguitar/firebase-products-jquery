/* global $, Firebase, Handlebars */

var urlBD = window.config.databaseURL;
var theRef = new Firebase( urlBD + 'users')

var authData = theRef.getAuth();

var provider;
var name;

theRef.onAuth(function(authData) {
	var isNewUser = true;
	var eMail, Photo;

	provider = authData.provider;
	name = getName(authData);

	if ( authData.provider === "password" ) {
		eMail = authData.password.email;
		Photo = authData.password.profileImageURL;
	}

	var mailUser = authData.password.email
	theRef.child(authData.uid).once("value", function(snapshot) {
		var isNewUser = !snapshot.exists();
	  if (authData && isNewUser) {


	    // save the user's profile into the database so we can list users,
	    // use them in Security and Firebase Rules, and show profiles
	    console.log("adding new user to Users...")
	    theRef.child(authData.uid).set({
	      provider: provider,
	      name: name
	    });

		}
		else {
			console.log("already exists...")
			provider = snapshot.child("provider").val();
			name = snapshot.child("name").val();
		}
		console.log ("authData: %o", authData)
		console.log ("provider: %o", provider)
		console.log ("name: %o", name)

		$("img").attr("src", Photo)
		$("#emailAddress").val(eMail)

	})
});



// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}