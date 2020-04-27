const { Node } = require('./node');
class linkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    async add(data){
        if(this.exists(data)){
            throw new Error('Existing Data');
        }

        const newNode = new Node(data , null);

        if(!this.head){
            this.head = newNode;
        }else{

            let current = this.head;
            
            while(current._next){
                current = current._next;
            };
        
            current._next = newNode;

        }

        this.size++;

        return newNode._data;
    }

    async removeData(id){
        let current = this.head;
        let previous = null;
        
        while(current){
            if(current._data.id == id){
                if(!previous){
                    this.head = current._next;
                } else {
                    previous._next = current._next;
                }
                this.size--;
                return current._data;
            }
            previous = current;
            current = current._next;
        }

        return null;
    }

    async updateData(product){
        let current = this.head;
        
        while(current){
            if(current._data.productId == product.productId){
                current._data.quantity = product.quantity;
                current._data.total = current._data.quantity * current._data.price;
                return current._data;
            }
            current = current._next;
        }
        return null;
    }
    
    exists(data){
        let exist = false;

        let current = this.head;

        while(current){
            if(current._data.productId == data.productId){
                exist = true;
            }
            current = current._next;
        }

        return exist;
    }

    getSize(){
        return this.size;
    }
}

module.exports = { linkedList };