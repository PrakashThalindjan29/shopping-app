var cardContainer = document.getElementById("cart-item-container");
var totalAmount = document.getElementById("total-amount");
var numberOfItem = document.getElementById("number-of-item");

var myLocalStorageData = JSON.parse(
  window.localStorage.getItem("product-list")
);

function createItemOnCheckOut(iPreview, iName, iCount, iPrice) {
  var item = document.createElement("div");
  item.setAttribute("class", "item");

  var itemImg = document.createElement("img");
  itemImg.src = iPreview;

  var itemDetail = document.createElement("div");
  itemDetail.setAttribute("class", "detail");

  var itemName = document.createElement("h3");
  var itemNameText = document.createTextNode(iName);
  itemName.appendChild(itemNameText);

  var itemCount = document.createElement("p");
  itemCountText = document.createTextNode("x" + iCount);
  itemCount.appendChild(itemCountText);

  var itemPrice = document.createElement("p");
  var itemPriceText = document.createTextNode("Amount: " + iCount * iPrice);
  itemPrice.appendChild(itemPriceText);

  itemDetail.appendChild(itemName);
  itemDetail.appendChild(itemCount);
  itemDetail.appendChild(itemPrice);

  item.appendChild(itemImg);
  item.appendChild(itemDetail);

  return item;
}

for (var z = 0; z < myLocalStorageData.length; z++) {
  cardContainer.append(
    createItemOnCheckOut(
      myLocalStorageData[z].preview,
      myLocalStorageData[z].title,
      myLocalStorageData[z].count,
      myLocalStorageData[z].price
    )
  );
}
var cost = 0;
var counter = 0;

for (var y = 0; y < myLocalStorageData.length; y++) {
  counter += myLocalStorageData[y].count;
  console.log(counter);
  cost +=
    parseInt(myLocalStorageData[y].count) *
    parseInt(myLocalStorageData[y].price);
  console.log(cost);
}
totalAmount.innerHTML = cost;
numberOfItem.innerHTML = counter;

var placeOrder = document.getElementById("place-order");

placeOrder.addEventListener("click", function() {
  myLocalStorageData = window.localStorage.removeItem("product-list");
  cartC = window.localStorage.setItem("cart-count", "0");
  var cost = 0;
  for (var i = 0; i < myLocalStorageData.length; i++) {
    counter += myLocalStorageData[i].count;
  }
  totalAmount.innerHTML = cost;
  numberOfItem.innerHTML = counter;
});

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