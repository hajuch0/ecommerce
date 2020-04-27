const { attributes } = require('structure');
 
const ShoppingCart = attributes({
  id : {
    type: String
  },

  productId: {
    type: Number
  },

  productName: {
      type: String
  },

  price: {
    type: Number,
  },

  quantity: {
    type: Number
  }
})(
  class ShoppingCart {
    totalPrice() {
      //return `Hello ${this.name}`;
      return this.price*this.quantity;
    }
  }
);
 
module.exports = ShoppingCart;
