/* global $, Firebase, Handlebars */

var urlBD = window.config.databaseURL;
var theRef = new Firebase( urlBD + "products")

var authData = theRef.getAuth();

if (authData) {
    console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);

    var dataUser = {
        mail:  authData.password.email
    }

    var sourceHtmlLogBlock = $("#logBlockTemplate").html();
    var templateLogBlock = Handlebars.compile(sourceHtmlLogBlock);

    var htmlLogBlock = templateLogBlock(dataUser);
    $(htmlLogBlock).appendTo("#navbar");

    $('#logoutButton').click(logOff);

} else {
  console.log('User not logged in');
  window.location.assign('user/login.html');
}

function logOff() {
    theRef.unauth();
    window.location.assign('index.html');
}


var prodData = {}

theRef.on('value', function(snap) {

    prodData = snap.val();

    $.each(prodData, function(index,value) {

        var dataProd = {
            index: index,
            name : value.name,
            price: value.price,
            image: value.image === "NONE" ? null : value.image,
            description: value.description
        }
        var sourceHtmlProdList = $("#prodListTemplate").html();
        var templateProdList = Handlebars.compile(sourceHtmlProdList);

        var htmlProdList = templateProdList(dataProd);
        $(htmlProdList).appendTo("#main");

    })
}, function(errorObject) {

    console.log("the read failed: " + errorObject.code)
})


function editProd(id) {
    window.name = id;
    console.log (window.name);
    window.location.assign('editProduct.html');

}

function onComplete(error) {
    if (error){
        alert('Delete Failed!');
    } else {
        alert('Deleted product!');
        window.location.reload(true);
    }
}

function deleteProd(id) {
    if (confirm('Are you sure you want to delete!?') == true) {
       theRef.child(id).remove(onComplete);
    }
}
