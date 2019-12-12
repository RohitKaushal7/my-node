const db = require('../utils/database')
module.exports = class Product {
    constructor(id,t,d,p,img){
        this.id = id;
        this.title = t;
        this.img = img;
        this.desc = d;
        this.price = p;
    }

    save(){
        return db.execute('INSERT INTO products (`title`, `desc`, `price`, `img`) VALUES (?,?,?,?)',[this.title,this.desc,this.price,this.img]);
        
    }

    static delete(id){
        
    }

    static fetchAll() {
        return db.execute('select * from products');
    }

    static getProductById(id){
        return db.execute('select * from products where products.id = ?',[id]);
    }
}