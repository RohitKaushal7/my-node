const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
    );

module.exports = class Cart {
    static addProduct(id,price,cb){
        // fetch the previous cart
        fs.readFile(p,(err,data)=>{
            var cart = {products:[],totalPrice:0};
            if(!err){
                cart = JSON.parse(data);
            }
            // find if it is an existing product
            var existingProductIndex = cart.products.findIndex(x=> x.id == id);
            var existingProduct = cart.products[existingProductIndex];

            if(existingProduct){
                var updatedProduct = {...existingProduct};
                updatedProduct.qty++;
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = {id: id, qty:1};
                cart.products = [...cart.products,updatedProduct];
            }
            cart.totalPrice=Number(cart.totalPrice)+Number(price);

            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })


        })
    }

    static deleteProduct(id,price,cb){
        fs.readFile(p,(err,data)=>{
            if(!err){
                var cart = JSON.parse(data);
                var index = cart.products.findIndex(x=> x.id == id);
                if(cart.products[index].qty>1){
                    cart.products[index].qty--;
                }
                else{
                    cart.products.splice(index,1);
                }
                cart.totalPrice = Number(cart.totalPrice) - Number(price);
                fs.writeFile(p,JSON.stringify(cart),err=>{
                    console.log(err);
                })
            }
        })
    }

    static getCart(cb){
        fs.readFile(p,(err,data)=>{
            if(err){
                cb(null)
            }
            else{
                cb(JSON.parse(data))
            }
        })
    }
}