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
    
    Product.getProductById(id, product=>{
        res.render('admin/edit-product',{
            product: product,
            editing: true,
            title:'Edit Product',
            path:'/add-product'
        })
    })
}


exports.postProduct = (req,res) => {
    console.log(req.body);
    const product = new Product(null,req.body.title,req.body.desc,req.body.price,req.body.img);
    product.save()
        .then(()=>{
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
    
}

exports.postEditProduct = (req,res) => {
    console.log(req.body);

    const product = new Product(req.body.productId,req.body.title,req.body.desc,req.body.price,req.body.img);
    product.save();
    res.redirect('/');
}

exports.deleteProduct = (req,res) => {
    console.log(req.body);
    Product.delete(req.body.productId);
    res.redirect('/admin-products')
    
}


exports.getAdminProducts = (req,res) => {
    Product.fetchAll(products =>{
        res.render('admin/products',{
            data: products,
            title:'Admin Product',
            path:'/admin-products'
        })
    })
    
}