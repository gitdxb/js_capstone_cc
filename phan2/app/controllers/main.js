// global
var spService = new SanPhamService();
var validate = new Validation();

// get data API to display
function getProductList() {
  spService
    .getProductList()
    .then(function (result) {
      // thành công
      showTable(result.data);
    })
    .catch(function (error) {
      // thất bại
      console.log(error);
    });
}
getProductList();


// display API content to UI
function showTable(mangSP) {
  var content = "";
  var stt = 1; // Số thứ tự trên giao diện
  mangSP.map(function (sp) {
    content += `
            <tr>
                <td>${stt++}</td>
                <td>${sp.name}</td>
                <td>$${sp.price}</td>
                <td>${sp.screen}</td>
                <td>${sp.backCamera}</td>
                <td>${sp.frontCamera}</td>
                <td><img src="${sp.img}" style="width: 50px; height: 50px;" alt=""></td>
                <td>${sp.desc}</td>
                <td>${sp.type}</td>
                <td>
                    <button  onclick="getProductDetail('${sp.id}')"  class="btn btn-info" data-toggle="modal" data-target="#myModal"  >Xem</button>
                    <button class="btn btn-danger" onclick="deleteProduct('${
                      sp.id
                    }')">Xoá</button>

                </td>
            </tr>
        `;
  });
  document.querySelector("#tblDanhSachSP").innerHTML = content;
}
// adding button
function handleForm() {
  document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class="btn btn-primary" onclick="addProduct()">Add</button>
    `;
    var formELE = document.querySelectorAll("#myModal .form-control");
    for (var i = 0; i < formELE.length; i++) {
        formELE[i].value = "";
        
    }
}
document.querySelector("#btnThemSP").onclick = handleForm;

// adding new product
function addProduct() {
  var name = document.querySelector("#TenSP").value;
  var price = document.querySelector("#GiaSP").value;
  var screen = document.querySelector("#manHinhSP").value;
  var backCamera = document.querySelector("#camSauSP").value;
  var frontCamera = document.querySelector("#camTruocSP").value;
  var img = document.querySelector("#HinhSP").value;
  var desc = document.querySelector("#moTaSP").value;
  var type = document.querySelector("#loaiSP").value;

  // validate input
  var isValidInp = true;
  // validate product name
  isValidInp &= validate.checkEmpty(name, "tbName", "Thông tin chưa điền");
  // validate price
  isValidInp &= validate.checkEmpty(price, "tbPrice", "Thông tin chưa điền") && validate.checkPrice(price, "tbPrice", "Chỉ được nhập số");
  // validate screen
  isValidInp &= validate.checkEmpty(screen, "tbScreen", "Thông tin chưa điền") && validate.checkScreen(screen, "tbScreen", "Thông tin chưa đúng. VD: định dạng 'screen + số'");
  // validate camera
  isValidInp &= validate.checkEmpty(backCamera, "tbBackCamera", "Thông tin chưa điền");
  isValidInp &= validate.checkEmpty(frontCamera, "tbFrontCamera", "Thông tin chưa điền");
  // validate image
  isValidInp &= validate.checkEmpty(img, "tbImg", "Thông tin chưa điền");
  // validate desc and type
  isValidInp &= validate.checkEmpty(desc, "tbDesc", "Thông tin chưa điền");
  isValidInp &= validate.checkEmpty(type, "tbType", "Thông tin chưa điền") && validate.checkTextInput(type, "tbType", "Thông tin chưa đúng, chỉ điền chữ");

  if (isValidInp) {
    var sp = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);

    // Kết nối với API để truyền dữ liệu xuống BE
    spService
      .addProduct(sp)
      .then(function (result) {
        // thành công
        console.log("thành công: ", result);
        document.querySelector("#myModal .close").click();
        // Load lại table
        getProductList();
      })
      .catch(function (error) {
        // thất bại
        console.log(error);
      });
  }
 
}

// delete a product
function deleteProduct(id) {
  spService
    .deleteProduct(id)
    .then(function (result) {
      // thành công
      console.log(result);

      // load lại table
      getProductList();
    })
    .catch(function (error) {
      // thất bại
      console.log(error);
    });
}

// get a particular product from BE 
function getProductDetail(id) {
    spService.getProductDetail(id)
        .then(function (result) {
            var sp = result.data;
            document.querySelector("#TenSP").value = sp.name;
            document.querySelector("#GiaSP").value = sp.price;
            document.querySelector("#manHinhSP").value = sp.screen;
            document.querySelector("#camSauSP").value = sp.backCamera;
            document.querySelector("#camTruocSP").value = sp.frontCamera;
            document.querySelector("#HinhSP").value = sp.img;
            document.querySelector("#moTaSP").value = sp.desc;
            document.querySelector("#loaiSP").value = sp.type;

            //Thêm button Update khi click Xem => cb cho chức năng cập nhật
            document.querySelector("#myModal .modal-footer").innerHTML = `
            <button class="btn btn-primary" onclick="updateProduct('${sp.id}')" >Update</button>
        `;

        })
        .catch(function (error) {
          console.log(error);
        })
}


// update new product info and display to UI
function updateProduct(id) {
  var name = document.querySelector("#TenSP").value;
  var price = document.querySelector("#GiaSP").value;
  var screen = document.querySelector("#manHinhSP").value;
  var backCamera = document.querySelector("#camSauSP").value;
  var frontCamera = document.querySelector("#camTruocSP").value;
  var img = document.querySelector("#HinhSP").value;
  var desc = document.querySelector("#moTaSP").value;
  var type = document.querySelector("#loaiSP").value;

   // validate input
   var isValidInp = true;
   // validate product name
   isValidInp &= validate.checkEmpty(name, "tbName", "Thông tin chưa điền");
   // validate price
   isValidInp &= validate.checkEmpty(price, "tbPrice", "Thông tin chưa điền") && validate.checkPrice(price, "tbPrice", "Chỉ được nhập số");
   // validate screen
   isValidInp &= validate.checkEmpty(screen, "tbScreen", "Thông tin chưa điền") && validate.checkScreen(screen, "tbScreen", "Thông tin chưa đúng. VD: thử 'screen 12'");
   // validate camera
   isValidInp &= validate.checkEmpty(backCamera, "tbBackCamera", "Thông tin chưa điền");
   isValidInp &= validate.checkEmpty(frontCamera, "tbFrontCamera", "Thông tin chưa điền");
   // validate image
   isValidInp &= validate.checkEmpty(img, "tbImg", "Thông tin chưa điền");
   // validate desc and type
   isValidInp &= validate.checkEmpty(desc, "tbDesc", "Thông tin chưa điền");
   isValidInp &= validate.checkEmpty(type, "tbType", "Thông tin chưa điền") && validate.checkTextInput(type, "tbType", "Thông tin chưa đúng, chỉ điền chữ");

   if (isValidInp) {
    var spUpdate = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);
    spService.updateProduct(id, spUpdate).then(function(result){
    // thành công
    console.log("Update ok: ", result.data);
    document.querySelector('#myModal .close').click();
    getProductList();
    }).catch(function(error){
    // thất bại
    console.log(error);
    })

   }
  
}
