const mongodb = require('mongodb')
const getDb = require('../utils/database').getDb;

class Product {
    constructor(title,desc,price,img,id,userId){
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.img = img;
        this._id = id ? mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save(){
        const db = getDb();
        if(this._id){
            return db.collection('products').updateOne({_id : this._id},{$set: this});    
        }
        return db.collection('products').insertOne(this);
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray();
    }

    static getProductById(id){
        const db = getDb();
        return db.collection('products').find({_id : mongodb.ObjectId(id)}).next();
    }

    static delete(id){
        const db = getDb();
        return db.collection('products').remove({_id : mongodb.ObjectId(id)});
    }
}

module.exports = Product;