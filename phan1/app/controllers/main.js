// Global
var productList = new ProductService();

function getProductList(){
    productList.getProductList()
    .then((result) => {
        // thanh cong
        console.table(result.data);
        
        // hien thi UI
        displayProductList(result.data);
    })
    .catch((error) => {
        console.log(error);
    });
}
getProductList();

function displayProductList(productArray){
    var content = "";
    productArray.map(function(product){
        content += `
        <div class="card">           
        <div class="top-bar">
            <span class="fa-brands fa-aws"></span>
            <h2 class="title-product"><a href="">${product.type}</a></h2>
        </div>
        <div class="img-container">
            <img src="${product.img}">
        </div>
        <div class="details">
            <div class="top-content">
                <div class="name-product">
                    <strong class="s-name">${product.name}</strong>
                    <button class="btn-heart" id="heart">
                        <i class=" fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="wrapper">
                 <h5> <span>Màng Hình:</span> ${product.screen}</h5>
                <h5><span>Camera Trước:</span> ${product.frontCamera}</h5>
                <h5><span>Camera Sau:</span> ${product.backCamera}</h5>
                <p class="desc-product">${product.desc}</p>
            </div>
            <div class="price">
                    <h3 class="price-product">Giá: $${product.price}</h3>
                    <div class="price-end">
                        <button class="btn-add"  onclick="getProductPhone('${product.id}')">
                          ADD <i class="fas fa-chevron-right"> </i>
                        </button>
                    </div>
            </div>
        </div>
    </div>   
    `
    });
    document.getElementById("cart").innerHTML = content;
}