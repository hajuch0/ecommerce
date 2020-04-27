//Cambiar los product id por el row id

const { toAddCartService , toRemoveCartService , toUpdateCartService , calculatePrice , convertToString} = require('../mappers/index');
const validator = require('validator');

class Cart{
    #__cart__ = [];
    #__totalPrice__ = 0;

    constructor(){
    }

    //Getters
    async getCart(){
        return this.#__cart__;
    }

    async getTotalPrice(){
        return this.#__totalPrice__;
    }

    //Setterts
    async setCart(product , code){
        if(code){
            this.#__cart__.push(product);
        }else{
            return null;
        }
    }

    async setTotalPrice(price , condition , code){
        if(code){
            switch(condition){
                case 'sum':
                    this.#__totalPrice__ += price;
                    break;
                case 'update':
                    this.#__totalPrice__ += price;
                    break;
                case 'remove':
                    this.#__totalPrice__ -= price;
                    break;
            }
        }else{
            return null;
        }
    }

    //Size
    async getSize(){
        let cart = await this.getCart();
        return cart.length;
    }

    //Exists
    async exists(id){
        let cart = await this.getCart();

        var exists = false;
        var product;

        for (let i = 0; i < cart.length; i++) {
            if(cart[i].productId === id){
                exists = true;
                product = cart[i]
            }
        }
        
        return { exists , product };
    }

    //Methods
    async store(product){

        var toString = {    
            Id      : product.productId ,
            Name    : product.productName ,
            Price   : product.price ,
            Quantity: product.quantity 
        };         

        const { _Id_ , _Name_ , _Price_ , _Quantity_ } = await convertToString(toString);
        
        var {exists} = await this.exists(product.productId);
        
        try{

            var productId_validator = !validator.isEmpty(_Id_) && validator.isNumeric(_Id_,{no_symbols:true}) && validator.isLength(_Id_,{min:0,max:6});

            var productName_validator = !validator.isEmpty(_Name_) && validator.isAlpha(_Name_) && validator.isLength(_Name_,{min:0,max:16});

            var productPrice_validator = !validator.isEmpty(_Price_) && validator.isNumeric(_Price_,{no_symbols:true}) && validator.isLength(_Price_,{min:0,max:7});

            var productQuantity_validator = !validator.isEmpty(_Quantity_) && validator.isNumeric(_Quantity_,{no_symbols:true}) && validator.isLength(_Quantity_,{min:0,max:4});
   
            if(!productId_validator || !productName_validator || !productPrice_validator ||!productQuantity_validator || exists){

                throw new Error('Uppss! Something was wrong, please verify your data!');

            }else{

                const { Product , Statement_ } = await toAddCartService(product);

                const price_ = await calculatePrice(Product);

                await this.setCart(Product , Statement_.verify_);

                await this.setTotalPrice(price_ , Statement_.condition_, Statement_.verify_);

            }

            return true;

        }catch(e){

            console.log(e.message);

        }
    }

    async remove(id){
        const Statement_ = await toRemoveCartService();

        var { exists , product } = await this.exists(id);

        let cart = await this.getCart();

        let i = 0;

        if(!exists){

            throw new Error('Upss! item doesn,t exists please verify your data!');

        }

        while(i < cart.length){

            if(cart[i].id === product.id){

                cart.splice(i , 1);

            }else{

                i++;

            }
        }

        const price_ = await calculatePrice(product);

        await this.setTotalPrice(price_ , Statement_.condition_ , Statement_.verify_);

        return true;
    }

    async update(product){
        
        try{

            var {exists , product} = await this.exists(Product.productId);

            if(!exists){
                 
                throw new Error('Upss!! something wrong verify the data to update');

            }

            var toString = {    
                Id      : product.productId ,
                Quantity: product.quantity 
            };

            const { _Id_ , _Quantity_ } = await convertToString(toString);

            var productId_validator = !validator.isEmpty(_Id_) && validator.isNumeric(_Id_,{no_symbols:true}) && validator.isLength(_Id_,{min:0,max:6});

            var productQuantity_validator = !validator.isEmpty(_Quantity_) && validator.isNumeric(_Quantity_,{no_symbols:true}) && validator.isLength(_Quantity_,{min:0,max:4});
   
            if(!productId_validator || !productQuantity_validator){

                throw new Error('Uppss! Something was wrong, please verify your data!');

            }

            const { Product , Statement_ } = await toUpdateCartService(product);

            if(Product.quantity < 1){
                throw new Error('Upss! can be less than 0 items, can remove it :) !!!');
            }

            let _Quantity_ = Product.quantity - cart[i].quantity;

            product.quantity = Product.quantity;
    
            let productToUpdate = {
                quantity: _Quantity_,
                price   : product.price
            }
    
            const _price_ = await calculatePrice(productToUpdate);
    
            await this.setTotalPrice(_price_ , Statement_.condition_ , Statement_.verify_);

            return true;

        }catch(e){

            return e.message;

        }
    }
}

const a = new Cart();
async function main(){
    //await a.store({productName:'silla',productId:1,price:50,quantity:1});

    //const f = await a.store({productName:'asdff',productId:25,price:50,quantity:1});

    //await a.remove(1);
    await a.store({productName:'sillha',productId:3,price:50,quantity:1});
    await a.store({productName:'sillha',productId:5,price:50,quantity:1});
    await a.store({productName:'sillha',productId:8,price:50,quantity:1});
    //const f = await a.store({productName:'silla',productId:5,price:50,quantity:1});
    //await a.update({productId:2 , quantity:25});
    const w = await a.remove(5);
    //await a.update({productId:2 , quantity:1});
    //await a.update({productId:5 , quantity:25});
    const s = await a.getCart();
    console.log(w);
    console.log(s);
    
}
main();
module.exports = Cart;