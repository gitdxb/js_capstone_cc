/* -------------------------------- // Global ------------------------------- */
var productList = new ProductService();

function getProductList() {
  productList
    .getProductList()
    .then((result) => {
      // hien thi UI
      displayProductList(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getProductList();

function displayProductList(productArray) {
  var content = "";
  productArray.map(function (product) {
    content += `
        <div class="card">           
        <div class="top-bar">
            <i class="fab fa-apple"></i>
            <em class="stocks">${product.type}</em>
        </div>
        <div class="img-container">
            <img class="product-img" src="${product.img}" alt="">
            <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
        </div>
        <div class="details">
                <div class="name-fav">
                    <strong class="product-name">${product.name}</strong>
                    <button onclick="this.classList.toggle('fav')" class="heart">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            <div class="wrapper">
                 <h5> <span>Màn Hình:</span> ${product.screen}</h5>
                <h5><span>Camera Trước:</span> ${product.frontCamera}</h5>
                <h5><span>Camera Sau:</span> ${product.backCamera}</h5>
                <p>${product.desc}</p>
            </div>
            <div class="purchase">
                    <p class="product-price">Giá: $${product.price}</p>
                    <button class="add-btn"  onclick="addItem('${product.id}')">
                        Add <i class="fas fa-chevron-right"> </i>
                    </button>
            </div>
        </div>
    </div>   
    `;
  });
  document.getElementById("productArray").innerHTML = content;
}

/* ---------------------- // filer phone type by brand ---------------------- */
function selectPhoneBrand() {
  var phoneList = [];
  var option = document.getElementById("productBrand").value;
  productList
    .getProductList()
    .then(function (result) {
      var phoneArr = result.data;
      if (option == "Iphone") {
        for (var i = 0; i < phoneArr.length; i++) {
          if (phoneArr[i].type == "Iphone") {
            phoneList.push(phoneArr[i]);
            displayProductList(phoneList);
          }
        }
      } else if (option == "SamSung") {
        for (var i = 0; i < phoneArr.length; i++) {
          if (phoneArr[i].type == "Samsung") {
            phoneList.push(phoneArr[i]);
            displayProductList(phoneList);
          }
        }
      } else {
        getProductList();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

/* --------------------------- // add item to cart -------------------------- */
var cartArray = [];
function addItem(id) {
  productList
    .getProductDetail(id)
    .then((result) => {
      if (cartArray.some((item) => item.id === id)) {
        cartArray.map((item) => {
          if (item.id === id) {
            item.quantity += 1;
            item.calSum();
          }
        });
      } else {
        var cartItem = new CartItem(
          result.data.id,
          result.data.price,
          result.data.name,
          result.data.img
          );
          cartItem.calSum();
          cartArray.push(cartItem);
        }
      viewCart(cartArray);
    })
    .catch((error) => {
      console.log(error);
    });

  // Cart total items count
  itemCount = 1;
  for (let i = 0; i < cartArray.length; i++) {
    itemCount += cartArray[i].quantity;
  }
  CartItemsTotal(itemCount);
  setLocalStorage();
}

function viewCart(cartArray) {
  var content = "";
  cartArray.map(function (cartItem) {
    content += `
    <tr class="cart-items">
        <div class="cart-item">
            <td>
            <div>
                <img class="cart-img" src="${cartItem.img}" alt="">
            </div>
            </td>
            <td class="name">
                <strong>${cartItem.name}</strong>
            </td>
            <td>
                <span class="qty-change">
                <div>
                <button class="btn-qty" onclick="sub(${cartItem.id})"><i class="fas fa-chevron-left"></i></button>
                <p class="qty">${cartItem.quantity}</p>
                <button class="btn-qty" onclick="add(${cartItem.id})"><i class="fas fa-chevron-right"></i></button>
                </div></span>   
            </td>
            <td>
                <p class="price">$ ${cartItem.value}</p>
            </td>
            <td>
                <button onclick="removeItem('${cartItem.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </div>
    </tr>
        `;
  });
  document.getElementsByClassName("cart-items")[0].innerHTML = content;
  getCartSum(cartArray);
  setLocalStorage();
}

/* ------------------- // update cart total payable amout ------------------- */
function getCartSum (cartArray) {
  let sum = 0;
  cartArray.map((item) => {
    let { value } = item;
    sum += value;
  })
  document.querySelector(".total").innerHTML = sum;
}

/* --------------------------- // delete a product -------------------------- */
function removeItem(id) {
  
  cartArray.map((cartItem) => {
    if (id == cartItem.id) {
      
      const locateIndexPos = cartArray.findIndex(object => {
        return object.id === cartItem.id;
      })
      // delete that obj in cartArray
      cartArray.splice(locateIndexPos, 1);
      
      //update new Cart quantity on UI
      var currentCartQty = Number(document.querySelector(".total-qty").innerHTML);
      currentCartQty = currentCartQty - cartItem.quantity;
      CartItemsTotal(currentCartQty);

      //view updated cart on checkout UI
      viewCart(cartArray);
    } 
  });
  setLocalStorage();
}

/* ------------ // remove all and everything, no more shopping!!! ----------- */
function clearCart () {
  cartArray.splice(0, cartArray.length);
  viewCart(cartArray);
  CartItemsTotal(0);
  setLocalStorage();
}

/* ------------------ // counting total number in the cart ------------------ */
function CartItemsTotal(total) {
  document.getElementsByClassName("total-qty")[0].innerHTML = total;
}

/* ---------------------------- // local storage ---------------------------- */
function setLocalStorage() {
  localStorage.setItem("MobileList", JSON.stringify(cartArray));
  localStorage.setItem("TotalCart", JSON.stringify(document.querySelector(".total-qty").innerHTML));
}

function getLocalStorage() {
  if (localStorage.getItem("MobileList") != undefined) {
    cartArray = JSON.parse(localStorage.getItem("MobileList"));
  }
  if (localStorage.getItem("TotalCart") != undefined) {
    lastTotal = JSON.parse(localStorage.getItem("TotalCart"));
    CartItemsTotal(lastTotal);
  }

  viewCart(cartArray);
}
getLocalStorage();

/* ---------------------------- //side bar pop-up --------------------------- */
function sideNav(index) {
  var sideNav = document.getElementsByClassName("side-nav")[0];
  var cover = document.getElementsByClassName("cover")[0];
  if ((sideNav.style.right = index)) {
    sideNav.style.right = "0";
  } else {
    sideNav.style.right = "-100%";
  }
  if ((cover.style.display = index)) {
    cover.style.display = "block";
  } else {
    cover.style.display = "none";
  }
}

/* ---------------------------- // purchase page ---------------------------- */
function buy() {
  showPurchase();
  var content_name = "";
  var content_price = "";
  cartArray.map(function (cartItem) {
    content_name += `
        <span>${cartItem.quantity} x ${cartItem.name}</span>
    `;

    content_price += `
      <span>$${cartItem.value}</span>
    `
  });
  document.querySelector(".item-names").innerHTML = content_name;
  document.querySelector(".items-price").innerHTML = content_price;
  
  let total = document.querySelector(".total").innerHTML;
  document.querySelector(".pay").innerHTML = "$ " + total;

}

function showPurchase() {
  if (cartArray == '') {
    alert('Giỏ hàng đang trống, bạn không thể thanh toán');
    window.location.reload();
  }
  document.getElementsByClassName("side-nav")[0].style.display = "none";
  var cover = document.getElementsByClassName("purchase-cover")[0];
  document.getElementsByClassName("order-now")[0].style.display = "block";
  if (cover.style.display == "none") {
    cover.style.display = "block";
  } else {
    cover.style.display = "none";
  }
}

function cancelOrder() {
  document.getElementsByClassName("order-now")[0].style.display = "none";
  document.getElementsByClassName("purchase-cover")[0].style.display = "none";
  document.getElementsByClassName("invoice")[0].style.display = "none";
  window.location.reload();
}

/* ------------------------------ // payment ok ----------------------------- */
function order() {
  document.getElementsByClassName("invoice")[0].style.display = "none";
  document.querySelector(".pay-now").style.display = "block";
  // generate randome 3 digits order ID ^^
  var orderID =  Math.floor( Math.random()*999 ) + 100;
  document.querySelector("#order_id").innerHTML = orderID;

  let total = document.querySelector(".total").innerHTML;
  document.querySelector("#total_pay").innerHTML = "$ " + total;
}

function okay() {
  alert('Thank you for shopping with us!');
  window.location.reload();
  clearCart();
}

/* ------------------------- Quantity change in cart ------------------------ */
function sub (id){
  cartArray.map((item) => {
    if (item.id == id) {
      item.quantity -= 1;
      if (item.quantity == 0) {
        removeItem(item.id);
      }
      item.value = item.price * item.quantity;
    }
  })
  viewCart(cartArray);

  // Cart total items count
  itemCount = 0;
  for (let i = 0; i < cartArray.length; i++) {
    itemCount += cartArray[i].quantity;
  }
  CartItemsTotal(itemCount);
  setLocalStorage();
}

function add (id) {
  cartArray.map((item) => {
    if (item.id == id) {
      item.quantity += 1;
      item.value = item.price * item.quantity;
    }
  })
  viewCart(cartArray);

  // Cart total items count
  itemCount = 0;
  for (let i = 0; i < cartArray.length; i++) {
    itemCount += cartArray[i].quantity;
  }
  CartItemsTotal(itemCount);
  setLocalStorage();
}