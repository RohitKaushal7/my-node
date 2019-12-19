const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const admin = require('./routes/admin')
const shop = require('./routes/shop')
const errorController = require('./controllers/error.js')

const mongoConnect = require('./utils/database').mongoConnect;

const User = require('./models/user');

const app = express();

app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))
app.use((req,res,next)=>{
    User.findUserById('5dfb0e86e3b9162b2a7032c5')
        .then(user=>{
            // console.log(user);
            req.user = new User(user.name,user.email,user.cart,user._id);
            next();
        })
        .catch(err=>{
            console.log(err);
        })
})

app.use(admin.router);
app.use(shop.router);

app.use('/', errorController.get404)


mongoConnect( client =>{
    app.listen(3000,()=>{
        console.log('runnning at localhost:3000'); 
    })    
});