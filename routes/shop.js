const path = require('path')

const express = require('express')

const rootDir = path.dirname(process.mainModule.filename);

const router = express.Router()

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','shop.html'))
})

exports.router = router;