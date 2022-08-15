function SanPhamService() {
  // Chứa các phương thức giao tiếp với API (restfulAPI: GET, POST, PUT, DELETE)
  // axios: truyền vào đối tượng chưa các thông tin kết nối API
  // method: phương thức giao tiếp
  // url: đường dẫn API
  // Trả về đối tượng promise (chứa các phương thức xử lý thành công -"then", thất bại - "catch")
  this.getProductList = function () {
    var promise = axios({
      method: "get",
      url: "https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products",
    });
    return promise;
  };

  this.addProduct = function (sp) {
    console.log("add service ", sp);
    // data: nhận vào kiểu đối tượng, chính là dữ liệu mới lưu vào BE
    return axios({
      method: "post",
      url: "https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products",
      data: sp,
    });
  };

  this.deleteProduct = function (id) {
    console.log("id xoá", id);
    // /Products/:id
    // vd: /Products/1
    return axios({
      method: "delete",
      url: `https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products/${id}`,
    });
  };

  // this.getProductDetail = function (id) {
  //   return axios({
  //     method: "GET",
  //     url: `https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products/${id}`,
  //   });
  // }
  this.getProductDetail = function(id){
    return axios({
        method: 'GET',
        url: `https://6065c01ab8fbbd001756734b.mockapi.io/Products/${id}`,
    });

}

  this.updateProduct = function (id, sp) {
    return axios({
      method: "put",
      url: `https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products/${id}`,
      data: sp
    });
  }
}
