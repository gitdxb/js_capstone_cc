// global
var spService = new SanPhamService();

function getProductList() {
  spService
    .getProductList()
    .then(function (result) {
      // thành công
      console.log(result);
      console.log(result.data);

      // hien thi len table
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
                <td>${sp.tenSP}</td>
                <td>${sp.gia}</td>
                <td>${sp.hinhAnh}</td>
                <td>${sp.moTa}</td>
                <td>
                    <button  onclick="getProductDetail('${
                      sp.id
                    }')"  class="btn btn-info" data-toggle="modal" data-target="#myModal"  >Xem</button>
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

  // Clear nội dung khi bấm nut xem, rồi bấm thêm mới
  // khi dùng hàm reset() => chỉ dùng được với thẻ form
  var formELE = document.querySelectorAll("#myModal .form-control");
  //console.log(formELE);
  // map() : chỉ dùng với mảng
  // formELE = NodeList => dùng for
  for (var i = 0; i < formELE.length; i++) {
    //console.log(formELE[i].value);
    formELE[i].value = ""; // xoá toàn bộ nội dung sau khi "xem" rồi " thêm mới"
  }
}
document.querySelector("#btnThemSP").onclick = handleForm;

function addProduct() {
  var tenSP = document.querySelector("#TenSP").value;
  var gia = document.querySelector("#GiaSP").value;
  var hinhAnh = document.querySelector("#HinhSP").value;
  var moTa = document.querySelector("#moTaSP").value;

  var sp = new SanPham(tenSP, gia, hinhAnh, moTa);
  console.log(sp);

  // Kết nối với API để truyền dữ liệu xuống BE

  // Fetch API: dựa Promise => dễ xài hơn promise
  // phải dùng 2 lần then() mới lấy đc data
  // fetch(url, {chứa các khai báo phương thức})
  // body: JSON.stringify(data) => dữ liệu đẩy xuống BE
  fetch("https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sp),
  })
    .then(function (response) {
      console.log('response',response);
      return response.json();
    })
    .then(function (data) {
      // kết quả cuối cùng được trả về từ BE
      // xử lý thành công
      console.log('data' ,data);
      document.querySelector('#myModal .close').click();
      getProductList();
    })
    .catch(function (error) {
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

  spService
    .getProductDetail(id)
    .then(function (result) {
      // console.log(result);
      console.log(result.data);
      var sp = result.data;
      document.querySelector("#TenSP").value = sp.tenSP;
      document.querySelector("#GiaSP").value = result.data.gia;
      document.querySelector("#HinhSP").value = result.data.hinhAnh;
      document.querySelector("#moTaSP").value = result.data.moTa;

      //Thêm button Update khi click Xem => cb cho chức năng cập nhật
      document.querySelector("#myModal .modal-footer").innerHTML = `
            <button class="btn btn-primary" onclick="updateProduct('${result.data.id}')" >Update</button>
        `;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateProduct(id) {
  var tenSP = document.querySelector("#TenSP").value;
  var gia = document.querySelector("#GiaSP").value;
  var hinhAnh = document.querySelector("#HinhSP").value;
  var moTa = document.querySelector("#moTaSP").value;

  var spUpdate = new SanPham(tenSP, gia, hinhAnh, moTa);
  console.log(spUpdate);
  spService
    .updateProduct(id, spUpdate)
    .then(function (result) {
      // thành công
      console.log(result);
      document.querySelector("#myModal .close").click();
      getProductList();
    })
    .catch(function (error) {
      // thất bại
      console.log(error);
    });
}
