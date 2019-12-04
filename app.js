const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const admin = require('./routes/admin')
const shop = require('./routes/shop')
// const routes = require('./routes')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use(admin.router);
app.use(shop.router);

app.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404error.html'))
})
app.listen(3000)