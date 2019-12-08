const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
    );

const getProductsFromFile = cb => {
    fs.readFile(p,(err,data)=>{
        if(err){
            return cb([]);
        }
        cb(JSON.parse(data)); 
    })
}


module.exports = class Product {
    constructor(id,t,d,p,img){
        this.id = id;
        this.title = t;
        this.img = img;
        this.desc = d;
        this.price = p;
    }

    save(){
        if(this.id){
            getProductsFromFile(products => {
                let existingProductIndex = products.findIndex(x=> x.id == this.id);
                let updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                    console.log(err);
                })
            })
        }
        else{
            this.id = parseInt(Math.random()*10000000).toString();
            getProductsFromFile(products => {
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err);
                })
            })
        }
    }

    static delete(id){
        getProductsFromFile(products=>{
            const index = products.findIndex(x => x.id == id);
            products.splice(index,1);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static getProductById(id,cb){
        getProductsFromFile(products => {
            let product = products.find(p=> p.id == id);
            cb(product);
        });
    }
}