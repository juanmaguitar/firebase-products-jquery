/* global $, Firebase */

var urlBD = window.config.databaseURL;
var myRef = new Firebase( urlBD )

console.log (urlBD);

var itemName;
var itemDescription;
var itemPrice;
var baseImg;

$("#imageInput").change( function() {
    var reader = new FileReader();
    reader.onloadend = function() {
        baseImg = reader.result;
        $("#preview").attr("src", reader.result)
    };
    reader.readAsDataURL(this.files[0])
})

$("#addForm").change(function(){
    itemName = $("#itemName").val();
    itemDescription = $("#itemDescription").val();
    itemPrice = $("#itemPrice").val();

    if( itemName && itemDescription && itemPrice) {
        $("#saveButton").removeAttr("disabled");
    }
    else {
        $("#saveButton").attr("disabled", "disabled");
    }
})

function onComplete (error) {
    if (error) {
        alert('update failed, error code : ' + error.code);
    } else {
        alert('update suceeded');
        location.assign('productListing.html');
    }
}

function addProduct() {
    itemName = $("#itemName").val();
    itemDescription = $("#itemDescription").val();
    itemPrice = $("#itemPrice").val();
    if (!baseImg) {
        baseImg = "NONE";
    }

    var prodRef = myRef.child("products");
    var newProductData = {
        name: itemName,
        description: itemDescription,
        price: parseInt(itemPrice,10),
        image: baseImg
    }
    prodRef.push( newProductData, onComplete);
}

$("#saveButton").click( addProduct )