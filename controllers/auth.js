
exports.getLogin = (req,res,next)=>{
    try{
        req.isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1];
    }
    catch{
        req.isLoggedIn = null;
    }
    res.render('auth/login',{
        title:'Login',
        path:'/login',
        isAuthenticated: req.isLoggedIn
    })
}
exports.postLogin = (req,res,next)=>{
    console.log(req.body);
    res.setHeader('Set-Cookie','isLoggedIn=true; Max-Age=10')
    res.redirect('/');
}