const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class User {
    constructor(uname,email,cart,id){
        this.name = uname;
        // this.password = pass;
        this.email = email;
        this.cart = cart; // {items: [{prod},{}],total: Num}
        this._id = id ? mongodb.ObjectId(id) : null;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findUserById(id){
        const db = getDb();
        return db.collection('users').findOne({_id: mongodb.ObjectId(id)});
    }

    addToCart(prod){
        if(!this.cart){
            this.cart = {items:[],total:0};
        }
        console.log(mongodb.ObjectId(prod._id));
        console.log(this.cart);
        let existingIndex = this.cart.items.findIndex(x => x.productId.toString() === prod._id.toString() );
        console.log(existingIndex);
        let upCart;
        if(existingIndex != -1){
            this.cart.items[existingIndex].qty++;
            this.cart.total= Number(this.cart.total) + Number(prod.price);
            upCart = this.cart;
        }
        else{
            let upTotal = Number(this.cart.total) + Number(prod.price);
            upCart = {items:[...this.cart.items,{productId:prod._id,qty:1}],total: upTotal};
        }
        const db = getDb();
        return db.collection('users').updateOne({_id: this._id},{$set:{cart: upCart}});
    }

    deleteFromCart(prod){
        if(!this.cart){
            this.cart = {items:[],total:0};
        }
        const db = getDb();

        console.log(mongodb.ObjectId(prod._id));
        console.log(this.cart);
        let existingIndex = this.cart.items.findIndex(x => x.productId.toString() === prod._id.toString() );
        console.log(existingIndex);
        let upCart;
        if(existingIndex != -1){
            this.cart.items[existingIndex].qty--;
            this.cart.total= Number(this.cart.total) - Number(prod.price);
            upCart = this.cart;
        }
        if(this.cart.items[existingIndex].qty <= 0){
            upCart.items.splice(existingIndex,1);
        }
        return db.collection('users').updateOne({_id: this._id},{$set:{cart: upCart}});
    }

    getCart(){
        const db = getDb();

        let pIds = this.cart.items.map(x=> x.productId);
        return db.collection('products').find({_id: {$in: pIds}}).toArray()
            .then(products=>{
                return products.map(x => {
                    return {
                        ...x,
                        qty: this.cart.items.find(y => x._id.toString() == y.productId.toString()).qty
                    }
                })
            })

    }

    addOrder(){
        const db = getDb();
        this.getCart()
            .then( products=>{
                let order = {products: products,user: {_id: this._id, name: this.name}};
                return db.collection('orders').insertOne(order);
            })
            .then(result =>{
                this.cart = {items:[],total:0};
                return db.collection('users').updateOne({_id: this._id},{$set:{cart: this.cart}});
            })

    }

    getOrders(){
        const db = getDb();
        return db.collection('orders').find({'user._id': mongodb.ObjectId(this._id) }).toArray();
    }
}

module.exports = User;