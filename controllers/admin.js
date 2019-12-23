const Product = require('../models/product')

exports.getAddPage = (req,res,next)=>{
    res.render('admin/edit-product',{
        product:null,
        editing: false,
        title:'Add Product',
        path:'/add-product'
        
    })
}

exports.getEditPage = (req,res,next)=>{
    id = req.params.productId;
    console.log(id);
    
    Product.findById(id)
        .then( product=>{
            res.render('admin/edit-product',{
                product: product,
                editing: true,
                title:'Edit Product',
                path:'/add-product'
                
            })
    })
}


exports.postProduct = (req,res) => {
    // console.log(req.body);
    const product = new Product({title: req.body.title,desc: req.body.desc,price: req.body.price, img: req.body.img, userId: req.user});
    product.save()
        .then((result)=>{
            res.redirect('/');
            console.log('Product Added');
        })
        .catch(err=>{
            console.log(err);
        })
    
}

exports.postEditProduct = (req,res) => {
    // console.log(req.body);
    Product.findOne({_id:req.body.productId, userId: req.user._id})
        .then(product=>{
            if(product){
                product.title = req.body.title;
                product.desc = req.body.desc;
                product.price = req.body.price;
                product.img = req.body.img;
                product.save().then(()=>{
                    console.log('UPDATED product')
                })
                .catch(err=>{
                    console.log(err);
                });
            }
        })
            
    res.redirect('/admin-products');
}

exports.deleteProduct = (req,res) => {
    // console.log(req.body);
    Product.deleteOne({_id: req.body.productId, userId: req.user._id}).then(result=>{
        console.log('DELETED..!')
    });
    res.redirect('/admin-products')
    
}


exports.getAdminProducts = (req,res) => {
    Product.find({userId: req.user._id})
        .then( products =>{
            res.render('admin/products',{
                data: products,
                title:'Admin Product',
                path:'/admin-products'
                
            })
        })
    
}