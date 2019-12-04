const path = require('path')
const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')

const rootDir = path.dirname(process.mainModule.filename);

const router = express.Router()

router.use(bodyParser.urlencoded({extended:false}));

router.get('/add',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add.html'))
})

router.post('/adding',(req,res) => {
    console.log(req.body);
    fs.writeFile(path.join(rootDir,'msg.txt'), req.body.title, (err) => {
        res.redirect('/')
    })
})

exports.router = router;