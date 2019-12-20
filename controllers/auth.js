const User = require('../models/user')

exports.getLogin = (req,res,next)=>{
    res.render('auth/login',{
        title:'Login',
        path:'/login',
        isAuthenticated: req.session.isLoggedIn
    })
}
exports.postLogin = (req,res,next)=>{
    console.log(req.body);
    User.findById('5dfb73ce34b67f155b5ab878')
        .then(user => {
            console.log(user);
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(()=>{
                res.redirect('/');
            })
        })
        .catch(err=>{
            console.log(err)
        })
    
}

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        res.redirect('/')
    })
}