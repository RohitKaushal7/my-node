const path = require('path')
const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session); 
const csrf = require('csurf')
const morgan = require('morgan')

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

const csrfProtection = csrf();

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
        User.findById(req.session.user._id)
        .then(user=>{
            // console.log(user);
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


app.use(csrfProtection);

const logFileStream = fs.createWriteStream(path.join(__dirname,"access.log"),{flags: 'a'});
app.use(morgan('combined',{stream: logFileStream}))

app.use((req,res,next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    res.locals.user = req.user || null;

    next();
})

app.use(admin.router);
app.use(shop.router);
app.use(auth);

app.use('/', errorController.get404)


mongoose.connect(MONGO_URI).then(result=>{
    app.listen(3000,()=>{
        console.log('running at localhost:3000');
    })
}).catch(err=>{
    console.log(err)
})