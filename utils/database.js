const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
    MongoClient.connect('mongodb://localhost:27017/shop' ,{ useNewUrlParser: true })
        .then(client => {
            console.log('Connected..');
            _db = client.db();
            cb(client);
        })
        .catch(err => {
            console.log(err);
        })
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    else{
        throw 'No Database';
    }
}

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
// SmClUZoZb0VZW5s4