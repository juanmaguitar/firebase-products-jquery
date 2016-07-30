/* global $, Firebase */

var prodID = window.name.replace("NG_DEFER_BOOTSTRAP!",""); /// ??? mistery to me too

console.log (prodID);
var urlBD = window.config.databaseURL;
var prodRef = new Firebase( urlBD + "products")


var name, desc, price, img;

var oneProduct = {};

prodRef.child(prodID).once('value', function(snapshot){

    oneProduct = snapshot.val();

    console.log(oneProduct)

    name = oneProduct.name;
    desc = oneProduct.description;
    price = oneProduct.price;
    img = oneProduct.image;

    $('#itemName').val(name);
    $('#itemDescription').val(desc);
    $('#itemPrice').val(price);

    if (img != "NONE") $('#preview').attr('src', img);
});


$('#imageInput').change(function() {
    var reader = new FileReader();
    reader.onloadend = function() {
        img = reader.result;
        $('#preview').attr('src', reader.result);
    };
   reader.readAsDataURL(this.files[0]);
});


function onComplete (error) {
    console.log("onComplete...");
    if (error) {
        console.log(error)
        alert('update failed, error code : ' + error.code);
    } else {
        alert('update suceeded');
        location.assign('productListing.html');
    }
}

function editProduct() {

    var editName = $('#itemName').val();
    var editDesc = $('#itemDescription').val();
    var editPrice = $('#itemPrice').val();
    var editImg = img;

    editPrice = parseInt(editPrice,10)

    var updateData = {
        name: editName,
        description: editDesc,
        price: editPrice,
        image: editImg
    }

    prodRef.child(prodID).update( updateData, onComplete );


}

$('#editButton').click(editProduct);