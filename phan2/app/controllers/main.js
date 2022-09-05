// global
var spService = new SanPhamService();

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

function showTable(mangSP) {
  var content = "";
  var stt = 1; // Số thứ tự trên giao diện
  mangSP.map(function (sp) {
    content += `
            <tr>
                <td>${stt++}</td>
                <td>${sp.name}</td>
                <td>${sp.price}</td>
                <td>${sp.screen}</td>
                <td>${sp.backCamera}</td>
                <td>${sp.frontCamera}</td>
                <td>${sp.img}</td>
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
        //console.log(formELE[i].value);
        formELE[i].value = "";
        
    }
}
document.querySelector("#btnThemSP").onclick = handleForm;

function addProduct() {
  var name = document.querySelector("#TenSP").value;
  var price = document.querySelector("#GiaSP").value;
  var screen = document.querySelector("#manHinhSP").value;
  var backCamera = document.querySelector("#camSauSP").value;
  var frontCamera = document.querySelector("#camTruocSP").value;
  var img = document.querySelector("#HinhSP").value;
  var desc = document.querySelector("#moTaSP").value;
  var type = document.querySelector("#loaiSP").value;

  var sp = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);
  console.log(sp);

  // Kết nối với API để truyền dữ liệu xuống BE
  spService
    .addProduct(sp)
    .then(function (result) {
      // thành công
      console.log(result);

      // Tắt popup form
      // onclick => thêm sư kiện click
      // click() gọi sự kiện click đang có sẵn của thẻ (thư viện, code được tạo ra sẵn ở dự án)
      document.querySelector("#myModal .close").click();
      // Load lại table
      getProductList();
    })
    .catch(function (error) {
      // thất bại
      console.log(error);
    });
}

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

function getProductDetail(id) {
    console.log(id);

    spService.getProductDetail(id)
        .then(function (result) {
            // console.log(result);
            console.log(result.data);
            var sp = result.data;
            document.querySelector("#TenSP").value = sp.name;
            document.querySelector("#GiaSP").value = result.data.price;
            document.querySelector("#manHinhSP").value = result.data.screen;
            document.querySelector("#camSauSP").value = result.data.backCamera;
            document.querySelector("#camTruocSP").value = result.data.frontCamera;
            document.querySelector("#HinhSP").value = result.data.img;
            document.querySelector("#moTaSP").value = result.data.desc;
            document.querySelector("#loaiSP").value = result.data.type;

            //Thêm button Update khi click Xem => cb cho chức năng cập nhật
            document.querySelector("#myModal .modal-footer").innerHTML = `
            <button class="btn btn-primary" onclick="updateProduct('${result.data.id}')" >Update</button>
        `;

        })
        .catch(function (error) {
            console.log(error);
        })
}

function updateProduct(id) {
  var name = document.querySelector("#TenSP").value;
  var price = document.querySelector("#GiaSP").value;
  var screen = document.querySelector("#manHinhSP").value;
  var backCamera = document.querySelector("#camSauSP").value;
  var frontCamera = document.querySelector("#camTruocSP").value;
  var img = document.querySelector("#HinhSP").value;
  var desc = document.querySelector("#moTaSP").value;
  var type = document.querySelector("#loaiSP").value;

  var spUpdate = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);
  console.log(spUpdate);
  spService.updateProduct(id, spUpdate).then(function(result){
    // thành công
    console.log(result);
    document.querySelector('#myModal .close').click();
    getProductList();
  }).catch(function(error){
    // thất bại
    console.log(error);
  })
}
