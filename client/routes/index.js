'use strict'; // 不允許鬆散的程式碼

module.exports = function(router){
    router.get('/', function(req, res){
        res.render('pages/main/index'); 
    });
    
    router.get('/about', function(req, res){
        res.render('pages/main/about'); 
    });
    
    router.get('/donate', function(req, res){
        res.render('pages/main/donate'); 
    });
    
};
