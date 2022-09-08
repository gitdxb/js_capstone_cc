function CartItem(id,price,name,img){
    this.id = id;
    this.price = price;
    this.name = name;
    this.img = img; 
    this.quantity = 1;
    this.value = 0; 

    this.calSum = function() {
        this.value = this.price * this.quantity;
    }
}