var slidePosition = 1;
SlideShow(slidePosition);

function plusSlides(n) {
    SlideShow(slidePosition += n);
}

function currentSlide(n) {
    SlideShow(slidePosition = n);
}

function SlideShow(n) {
    var i;
    var slides = document.getElementsByClassName("Containers");
    var circles = document.getElementsByClassName("dots");
    if (n > slides.length) { slidePosition = 1 }
    if (n < 1) { slidePosition = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < circles.length; i++) {
        circles[i].className = circles[i].className.replace(" enable", "");
    }
    slides[slidePosition - 1].style.display = "block";
    circles[slidePosition - 1].className += " enable";
    
}

var slidePosition = 0;
SlideShow();

function SlideShow() {
  var i;
  var slides = document.querySelectorAll(".Containers");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slidePosition++;
  if (slidePosition > slides.length) {slidePosition = 1}
  slides[slidePosition-1].style.display = "block";
  setTimeout(SlideShow, 4000); 
} 

var clothingCards = document.getElementById("clothingCards");
var accessoriesCards = document.getElementById("accessoriesCards");

function createItemCard(id, preview, name, brand, price) {
  var cardElement = document.createElement("div");
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", id);


  var cardLink = document.createElement("a");
  cardLink.href = "file:///E:/shopping%20app/product.html/aa.html?product_id="+ id;

  var imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img"); 

 
  var newImgElement = document.createElement("img");
  newImgElement.src = preview;

  imgContainer.appendChild(newImgElement);

  var deatils = document.createElement("div");
  deatils.setAttribute("class", "details");

  var newTitleElement = document.createElement("h3");
  var newName = document.createTextNode(name);

  newTitleElement.appendChild(newName);
  deatils.appendChild(newTitleElement);

  var newBrandElement = document.createElement("h4");
  var newBrand = document.createTextNode(brand);

  newBrandElement.appendChild(newBrand);
  deatils.appendChild(newBrandElement);

  var newPriceElement = document.createElement("h5");
  var newPriceText = document.createTextNode("Rs ");
  var newPrice = document.createTextNode(price);
  newPriceElement.appendChild(newPriceText);

  newPriceElement.appendChild(newPrice);
  deatils.appendChild(newPriceElement);

  cardLink.appendChild(imgContainer);
  cardLink.appendChild(deatils);

  cardElement.appendChild(cardLink);
  /*if(id==1){
  
    cardLink.href = "https://shoplane.netlify.app/product.html?product_id=1";


  }if(id==2){
    cardLink.href = "https://shoplane.netlify.app/product.html?product_id=1";
  
  }
  if(id==3){
    cardLink.href=" https://stackoverflow.com/questions/58350350/how-to-create-an-array-from-a-tag-input";
  }*/
  return cardElement;
  
}

// ---------------- Request Data & Create Cards On Home Page -------

function getCardsData() {
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function(data) {
    var responseData = data;
    for (var i = 0; i < responseData.length; i++) {
      if (responseData[i].isAccessory === false) {
        clothingCards.append(
          createItemCard(
            responseData[i].id,
            responseData[i].preview,
            responseData[i].name,
            responseData[i].brand,
            responseData[i].price
          )
        );
      } else {
        accessoriesCards.append(
          createItemCard(
            responseData[i].id,
            responseData[i].preview,
            responseData[i].name,
            responseData[i].brand,
            responseData[i].price
          )
        );
      }
    }
  });
}
getCardsData();

var addToCartBtn = document.getElementById("add-to-cart");
var cart = document.getElementById("cart-count");
var myCartData = [];
var cartIntialValue;


function addCart1(){
    if (window.localStorage.getItem("cart-count") === null) {
        cartIntialValue = 0;
      } else {
        cartIntialValue = JSON.parse(window.localStorage.getItem("cart-count"));
      }
      window.localStorage.setItem("cart-count", cartCurrentValue);
      cart.innerHTML = window.localStorage.getItem("cart-count");
    }
    cart.innerHTML = window.localStorage.getItem("cart-count");
    addCart1();


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
      addCart1();
      getDataForLocalStorage();
    
    


/*
var addToCartBtn = document.getElementById("cart");
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
    addCart1();*/