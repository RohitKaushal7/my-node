const Product = require('../models/product')
const Order = require('../models/order')

// Exports ...

exports.getHome = (req,res)=>{
    Product.find()
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
    Product.find()
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
    Product.findById(id)
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
    Product.findById(id)
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
req.user.populate('cart.items.productId').execPopulate()
    .then(user=>{
        // console.log(user.cart.items)
        res.render('shop/cart',{
            data: user.cart.items,
            totalPrice: req.user.cart.total,
            title: 'Cart',
            path:'/cart'
        });
    
    })
    
}

exports.getOrders = (req,res) =>{
    Order.find({'user':req.user._id}).populate(`user cart.items.productId`)
    .then(orders=>{
        console.log(orders)
        res.render('shop/orders',{
            orders: orders,
            title: 'Orders',
            path:'/orders'
        });
    })
}

exports.checkout = (req,res) =>{
    let order = new Order({
        cart: req.user.cart,
        user: req.user
    });
    order.save().then(result=>{
        req.user.cart = {items:[],total:0};
        req.user.save();
    })
    res.render('shop/checkout',{
        // data: products,
        title: 'checkout',
        path:'/checkout'
    });
}

exports.addCart = (req,res) =>{
    const id = req.body.productId.split('p')[1];
    var price;
    Product.findById(id)
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
    Product.findById(id)
    .then(product => {
        price = product.price;
        req.user.deleteFromCart(product)
            .then(result =>{
                res.status(200).send(String(req.user.cart.total));    
            })
    })
}
