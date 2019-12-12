const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const admin = require('./routes/admin')
const shop = require('./routes/shop')
const errorController = require('./controllers/error.js')

const app = express();

const db = require('./utils/database');

// db.execute('select * from products').then(result=> {console.log(result)}).catch(err=>{console.log(err);})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

// app.set('view engine','pug')
app.set('view engine','ejs')
app.set('views','views')

app.use(admin.router);
app.use(shop.router);

app.use('/', errorController.get404)

app.listen(3000,()=>{
    console.log('runnning at localhost:3000'); 
})