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
    
    Product.getProductById(id)
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
    const product = new Product(req.body.title,req.body.desc,req.body.price,req.body.img,null,req.user._id);
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
    const product = new Product(req.body.title,req.body.desc,req.body.price,req.body.img,req.body.productId,req.user._id);
    product.save()
        .then(()=>{
            console.log('UPDATED product')
        })
        .catch(err=>{
            console.log(err);
        })
    res.redirect('/admin-products');
}

exports.deleteProduct = (req,res) => {
    console.log(req.body);
    Product.delete(req.body.productId);
    res.redirect('/admin-products')
    
}


exports.getAdminProducts = (req,res) => {
    Product.fetchAll()
        .then( products =>{
            res.render('admin/products',{
                data: products,
                title:'Admin Product',
                path:'/admin-products'
            })
        })
    
}