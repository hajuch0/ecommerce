//const ShoppingCart = require('../model/ShoppingCart');
var uniqid = require('uniqid');

module.exports = {
    async toAddCartService(product){
        const {productName , productId , price , quantity} = product;
        const id = uniqid();
        condition_ = 'sum';
        verify_ = true;
        let Product = {id , productName , productId , price , quantity};
        let Statement_ = { condition_ , verify_ };
        return { Product , Statement_ };
    },
    async toRemoveCartService(){
        let condition_ = 'remove';  
        let verify_ = true;
        let Statement_ = { condition_ , verify_ };
        return Statement_;
    },
    async toUpdateCartService(product){
        let condition_ = 'update';
        let verify_ = true;
        let Statement_ = { condition_ , verify_ };
        
        const { productId , quantity } = product;
        let Product = { productId , quantity };
        
        return { Product , Statement_ };
    },
    async calculatePrice(product){
        let price = product.quantity * product.price;
        return price;
    },
    async convertToString(data){
        let _Id_ = String(data.Id);
        let _Name_ = String(data.Name);
        let _Price_ = String(data.Price);
        let _Quantity_ = String(data.Quantity);
        return {_Id_ , _Name_ , _Price_ , _Quantity_};
    },
    async toDbCart(cart){
    }
}