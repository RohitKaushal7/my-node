const Product = require('../models/product')
const Cart = require('../models/cart')

// Exports ...

exports.getHome = (req,res)=>{
    Product.fetchAll()
        .then(products =>{
            res.render('shop/index',{
                data: products,
                title: 'My Shop',
                path:'/'});
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getProducts = (req,res,next)=>{
    Product.fetchAll()
        .then(products =>{
            res.render('shop/index',{
                data: products,
                title: 'My Shop',
                path:'/'});
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getProductDetail = (req,res) =>{
    id = req.params.productId;
    console.log(id);
    Product.getProductById(id)
        .then( product => {
            console.log(product);
            res.render('shop/product-detail',{
                data: product,
                title: product.title,
                path: '/product-detail'
        })
    })
    .catch(err => {
        console.log(err);
    })    
}

exports.postCart = (req,res) =>{
    const id = req.body.productId;
    Product.getProductById(id)
    .then( product=> {
        return req.user.addToCart(product);
    })
    .then(result=>{
        console.log('Added to Cart')
    })
    .catch(err=>{
        console.log(err);
    })
    res.redirect('/');
}


exports.getCart = (req,res) =>{
req.user.getCart()
    .then(cartProducts=>{
        res.render('shop/cart',{
            data: cartProducts,
            totalPrice: req.user.cart.total,
            title: 'Cart',
            path:'/cart'
        });
    
    })
    
}

exports.getOrders = (req,res) =>{
    req.user.getOrders()
    .then(orders=>{
        res.render('shop/orders',{
            orders: orders,
            title: 'Orders',
            path:'/orders'
        });
    })
}

exports.checkout = (req,res) =>{
    req.user.addOrder();
    res.render('shop/checkout',{
        // data: products,
        title: 'checkout',
        path:'/checkout'
    });
}

exports.addCart = (req,res) =>{
    const id = req.body.productId.split('p')[1];
    var price;
    Product.getProductById(id)
    .then(product => {
        price = product.price;
        req.user.addToCart(product)
            .then(result =>{
                res.status(200).send(String(req.user.cart.total));    
            })
    })
}

exports.removeCart = (req,res) =>{
    const id = req.body.productId.split('p')[1];
    var price;
    Product.getProductById(id)
    .then(product => {
        price = product.price;
        req.user.deleteFromCart(product)
            .then(result =>{
                res.status(200).send(String(req.user.cart.total));    
            })
    })
}
