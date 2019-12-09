const Product = require('../models/product')
const Cart = require('../models/cart')

// Exports ...

exports.getHome = (req,res)=>{
    Product.fetchAll(products =>{
        res.render('shop/index',{
            data: products,
            title: 'My Shop',
            path:'/'
        });
    })
}

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list',{
            data: products,
            title: 'Products',
            path:'/products'});
    });
}

exports.getProductDetail = (req,res) =>{
    id = req.params.productId;
    console.log(id);
    Product.getProductById(id, product =>{
        res.render('shop/product-detail',{
            data: product,
            title: product.title,
            path: '/product-detail'
        })
    })   
    
}

exports.postCart = (req,res) =>{
    const id = req.body.productId;
    Product.getProductById(id,product=>{
        Cart.addProduct(id,product.price);
    })
    res.redirect('/');
}


exports.getCart = (req,res) =>{
    Cart.getCart(cart=>{
        if(cart){
            Product.fetchAll(products=>{
                const cartProducts = [];
                for(product of products){
                    cartProduct = cart.products.find(prod => prod.id == product.id);
                    if(cartProduct){
                        cartProducts.push({productData : product, qty : cartProduct.qty})
                    }
                }
                // console.log(cartProducts);
                res.render('shop/cart',{
                    data: cartProducts,
                    totalPrice: cart.totalPrice,
                    title: 'Cart',
                    path:'/cart'
                });
            })
        }
    })
    
}

exports.getOrders = (req,res) =>{
    Product.fetchAll(products=>{
        res.render('shop/orders',{
            data: products,
            title: 'Orders',
            path:'/orders'
        });
    })
}

exports.checkout = (req,res) =>{
    res.render('shop/checkout',{
        // data: products,
        title: 'checkout',
        path:'/checkout'
    });
}

exports.addCart = (req,res) =>{
    const id = req.body.productId.split('p')[1];
    var price;
    Product.getProductById(id,product=>{
        price = product.price;
        Cart.addProduct(id,price, t=>{
            res.status(200).send(String(t));
        });
    })
    
}

exports.removeCart = (req,res) =>{
    const id = req.body.productId.split('p')[1];
    var price;
    Product.getProductById(id,product=>{
        price=product.price;
        Cart.deleteProduct(id,price, t=>{
            res.status(200).send(String(t));
        });
        
        
    })
    
}
