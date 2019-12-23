const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty:{
                type: Number,
                required: true
            }
        }],
        total:{
            type: Number
        }
    }
})

userSchema.methods.addToCart = function (prod) { 
    if(!this.cart){
            this.cart = {items:[],total:0};
        }
        console.log(this.cart);
        let existingIndex = this.cart.items.findIndex(x => x.productId.toString() === prod._id.toString() );
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
        this.cart = upCart;
        return this.save();
}

userSchema.methods.deleteFromCart = function(prod){
    if(!this.cart){
        this.cart = {items:[],total:0};
    }
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
    this.cart = upCart;
    return this.save();
}

module.exports = mongoose.model('User',userSchema);
