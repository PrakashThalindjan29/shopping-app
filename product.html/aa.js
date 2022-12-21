function getProductDetail() {
    var searchId = window.location.search.split("=")[1];
  
    $.get(
      "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + searchId,
      function(data) {
        var productDetail = data;
        Name = productDetail.name;
        imageSrc = productDetail.preview;
        brand = productDetail.brand;
        price = productDetail.price;
        description = productDetail.description;
        photo0 = productDetail.photos[0];
        photo1 = productDetail.photos[1];
        photo2 = productDetail.photos[2];
        photo3 = productDetail.photos[3];
        photo4 = productDetail.photos[4];
        photo5 = productDetail.photos[5];
  
        createProductPage(
          imageSrc,
          Name,
          brand,
          price,
          description,
          photo0,
          photo1,
          photo2,
          photo3,
          photo4,
          photo5
        );
      }
    );
  }
  getProductDetail();
  function createProductPage(
    imageSrc,
    name,
    brand,
    price,
    description,
    img0,
    img1,
    img2,
    img3,
    img4,
    img5
  ) {
    var productImg = document.getElementById("productImg");
    productImg.src = imageSrc;
  
    var productName = document.getElementById("name");
    productName.innerHTML = name;
  
    var productBrand = document.getElementById("brand");
    productBrand.innerHTML = brand;
  
    var productPrice = document.getElementById("price");
    productPrice.innerHTML = price;
  
    var productDescription = document.getElementById("description");
    productDescription.innerHTML = description;
  
    var photo0 = document.getElementById("img0");
    photo0.src = img0;
  
    var photo1 = document.getElementById("img1");
    photo1.src = img1;
  
    var photo2 = document.getElementById("img2");
    photo2.src = img2;
  
    var photo3 = document.getElementById("img3");
    photo3.src = img3;
  
    var photo4 = document.getElementById("img4");
    photo4.src = img4;
  
    var photo5 = document.getElementById("img5");
    photo5.src = img5;
  
    function changeImage() {
      photo0.addEventListener("click", function() {
        productImg.src = img0;
      });
  
      photo1.addEventListener("click", function() {
        productImg.src = img1;
      });
      photo2.addEventListener("click", function() {
        productImg.src = img2;
      });
  
      photo3.addEventListener("click", function() {
        productImg.src = img3;
      });
  
      photo4.addEventListener("click", function() {
        productImg.src = img4;
      });
  
      photo5.addEventListener("click", function() {
        productImg.src = img5;
      });
  
      $(document).on("click", ".previewImg img", function() {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    }
    changeImage();
}
createProductPage();

var addToCartBtn = document.getElementById("add-to-cart");
var cart = document.getElementById("cart-count");
var myCartData = [];
var cartIntialValue;
if(localStorage.getItem('cart-count') == null) {
	localStorage.setItem('cart-count', '0');
} else {
	var cartValue = localStorage.getItem('cart-count');
	localStorage.setItem('cart-count', cartValue);
}


function addCart1(){
    if (window.localStorage.getItem("cart-count") === null) {
        cartIntialValue = 0;
      } else {
        cartIntialValue = JSON.parse(window.localStorage.getItem("cart-count"));
        cart.innerHTML = cartIntialValue;
      }
      var cartCurrentValue = cartIntialValue + 1;
      window.localStorage.setItem("cart-count", cartCurrentValue);
      cart.innerHTML = window.localStorage.getItem("cart-count");
    }
    cart.innerHTML = window.localStorage.getItem("cart-count");
    


    function addDataIntoList(productData) {
      if (window.localStorage.getItem("product-list") === null) {
        myCartData = [];
      }
      else {
        myCartData = JSON.parse(window.localStorage.getItem("product-list"));
      }
    
      if (myCartData.length === 0) {
        var myObj = {
          id: productData.id,
          title: productData.name,
          count: 1,
          price: productData.price,
          preview: productData.preview
        };
        myCartData.push(myObj);
      }
      else if (myCartData.length != 0) {
        var w = 0;
        for (var i = 0; i < myCartData.length; i++) {
          if (myCartData[i].id == productData.id) {
            myCartData[i].count = parseInt(myCartData[i].count) + 1;
            w += 1;
          }
        }
        if (w == 0) {
          var myObj = {
            id: productData.id,
            title: productData.name,
            count: 1,
            price: productData.price,
            preview: productData.preview
          };
          myCartData.push(myObj);
        }
      }
      window.localStorage.setItem("product-list", JSON.stringify(myCartData));
    
    }    
    addToCartBtn.addEventListener("click", function() {
      var productId = window.location.search.split("=")[1];
      var urlLink =
        "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId;
    
      function getDataForLocalStorage() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var productData = JSON.parse(this.responseText);
              addDataIntoList(productData);
            }
          }
        };
        http.open("GET", urlLink, true);
        http.send();
      }
      addCart1();
      getDataForLocalStorage();
    });