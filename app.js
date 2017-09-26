var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('home');
});

app.get('/s', function(req, res){
    var movie = req.query.movie;
    var page = req.query.page;
    var url = 'http://www.omdbapi.com/?s=' + movie + '&apikey=thewdb'; 
    request(url + '&page=' + page , function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            if(data.Response == "False"){
                res.redirect('/');
            }else{
                res.render('page', {data: data, url:url, movie:movie, page:page});    
            }
            
        }
    });
});

