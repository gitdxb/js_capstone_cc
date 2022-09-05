function SanPhamService() {
  this.getProductList = function () {
    var promise = axios({
      method: "get",
      url: "https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products",
    });
    return promise;
  };

  this.addProduct = function (sp) {
    return axios({
      method: "post",
      url: "https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products",
      data: sp,
    });
  };

  this.deleteProduct = function (id) {
    return axios({
      method: "delete",
      url: `https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products/${id}`,
    });
  };

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
