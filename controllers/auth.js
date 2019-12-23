const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.getLogin = (req,res,next)=>{
    res.render('auth/login',{
        title:'Login',
        path:'/login'
        
    })
}
exports.postLogin = (req,res,next)=>{
    console.log(req.body);
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password,user.password).then(match =>{
                // console.log(user);
                if(match){
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(()=>{
                        // res.redirect('/');
                        return res.send('Ok');
                    })
                }
                else{
                    // return res.redirect('/login');
                    return res.send('Invalid Password');
                }
            })
            .catch(err=>{
                console.log(err);
            })
            
        }
        else return res.send('Invalid Email');
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

exports.getSignup = (req,res,next)=>{
    res.render('auth/signup',{
        title:'Signup',
        path:'/signup'
        
    })
}
exports.postSignup = (req,res,next)=>{
    User.find({email: req.body.email})
        .then(user =>{
            if(user.length){
                console.log(user)
                return res.send('User with this Email Already Exists');
            }
            else{
                bcrypt.hash(req.body.password, 12).then(pass =>{
                    let user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: pass,
                        cart: {items:[],total:0}
                    })
                    user.save();
                    res.send('Ok');
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
}
