/* global $, Firebase */

var urlBD = window.config.databaseURL;
var theRef = new Firebase( urlBD + "products")

var prodData = {}

theRef.on('value', function(snap) {
    
    prodData = snap.val();
    
    $.each(prodData, function(index,value) {
        
        var prodPreview = '<div class="row">';
        
        prodPreview += '<div class="col-md-3 prodListHeader">';
        prodPreview += '<h2>' +  value.name + '</h2>';
        prodPreview += '</div>';
        
        prodPreview += '<div class="col-md-3 prodListHeader">';
        prodPreview += '<h2>$' +  value.price + '</h2>';
        prodPreview += '</div>';
        
        prodPreview += '</div>';
        
        prodPreview += '<div class="row">';
        
        prodPreview += '<div class="col-md-3 picFix">';
        if (value.image == "NONE") {
            prodPreview += '<img altc="No Pic">';
        }
        else {
            prodPreview += '<img src="' + value.image + '">';
        }
        prodPreview += '</div>';
        
        prodPreview += '<div class="col-md-3">';
        prodPreview += '<p>' +  value.description + '</p>';
        prodPreview += '</div>';
        
        prodPreview += '</div>';
        
        prodPreview += '<div class="row">';
        
        prodPreview += '<div class="col-md-3">';
         prodPreview += '<button type="button" class="btn btn-warning" onclick="editProd(\'' + index + '\')">EDIT PRODUCT</button>';
        prodPreview += '</div>';
        
        prodPreview += '<div class="col-md-9">';
        prodPreview += '<button type="button" class="btn btn-danger" onclick="deleteProd(\''+ index + '\')">DELETE PRODUCT</button>';
        prodPreview += '</div>';
        
        prodPreview += '</div>';
        
        prodPreview += '<div class="row spacer">';
        prodPreview += '</div>';
        
        $(prodPreview).appendTo("#main");
    })
}, function(errorObject) {
    
    console.log("the read failed: " + errorObject.code)
})


function editProd(id) { 
    window.name = id;
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
