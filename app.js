const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session); 

const admin = require('./routes/admin')
const shop = require('./routes/shop')
const auth = require('./routes/auth')
const errorController = require('./controllers/error.js')

const MONGO_URI = 'mongodb://localhost:27017/shop';

const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: 'sessions'

})

app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use((req,res,next)=>{
    if(req.session.user){
        User.findById(req.session.user._id) //'5dfb73ce34b67f155b5ab878'
        .then(user=>{
            console.log(user);
            req.user = user;
            next();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else{
        console.log('NO USER')
        next();
    }
})

app.use(admin.router);
app.use(shop.router);
app.use(auth);

app.use('/', errorController.get404)


mongoose.connect(MONGO_URI).then(result=>{

    User.findOne().then(user=>{
        if(!user){
            const user = new User({
                name: "Rohit Kaushal",
                email: "rohitkk252550@gmail.com",
                cart:{
                    items:[],
                    total:0
                }
            })
            user.save();
        }
    })
    app.listen(3000,()=>{
        console.log('running at localhost:3000');
    })
}).catch(err=>{
    console.log(err)
})