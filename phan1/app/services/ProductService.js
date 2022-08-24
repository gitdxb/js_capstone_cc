function ProductService() {
    this.productList = [];

    // Trả về đối tượng promise 
    this.getProductList = function () {
        return axios({
            method: "get",
            url: "https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products",
        });
    };

    // Thêm product
    this.addProduct = function (product) {
        return axios({
            method: "post",
            url: "https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products",
            data: product,
        });
    };

    // Cập nhật product
    this.updateProduct = function (product, id) {
        return axios({
            method: "put",
            url: `https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products/${id}`,
            data: product,
        });
    };

    this.deleteProduct = function (id) {
        console.log("id xoá", id);
        return axios({
            method: "delete",
            url: `https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products/${id}`,
        });
    };

    // Lấy thông tin product theo ID
    this.getProductDetail = function (id) {
        return axios({
            method: "get",
            url: `https://62e6a9370e5d74566aeacabb.mockapi.io/api/cc/v1/Products/${id}`,
        });
    };
}