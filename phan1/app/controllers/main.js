// Global
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

// filer phone type by brand
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

// add item to cart
/**
 * Cho phép người dùng chọn sản phẩm bỏ vào giỏ hàng
Gợi ý: - tạo một mảng giỏ hàng - cart (biến global), mảng cart sẽ chứa các đối tượng cartItem
 */
var cartArray = [];
// add to cart
function addItem(id) {
  productList
    .getProductDetail(id)
    .then((result) => {
      console.log(result.data);
      if (cartArray.some((item) => item.id === id)) {
        cartArray.map((item) => {
          if (item.id === id) {
            item.quantity += 1;
          }
        });
      } else {
        var cartItem = new CartItem(
          result.data.id,
          result.data.price,
          result.data.name,
          result.data.img
        );
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
    console.log("something is here: ", itemCount);
  }
  CartItemsTotal(itemCount);
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
                <button class="btn-qty" onclick="qtyChange(this,'sub')"><i class="fas fa-chevron-left"></i></button>
                <p class="qty">${cartItem.quantity}</p>
                <button class="btn-qty" onclick="qtyChange(this,'add')"><i class="fas fa-chevron-right"></i></button>
                </div></span>   
            </td>
            <td>
                <p class="price">$ ${cartItem.price}</p>
            </td>
            <td>
                <button onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
            </td>
        </div>
    </tr>
        `;
  });
  document.getElementsByClassName("cart-items")[0].innerHTML = content;
}

// counting total number in the cart
function CartItemsTotal(total) {
  document.getElementsByClassName("total-qty")[0].innerHTML = total;
}
//side bar pop-up
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
