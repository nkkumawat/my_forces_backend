var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var JsonArray = [];
var bothContest = [];
router.get('/',function(req , res , next){
    const id = req.query.id;
    var url = 'http://codeforces.com/contest/'+id;
    request(url, function(error, response, html){
        if(!error){
            JsonArray = [];
            var $ = cheerio.load(html);
            var problemCode, problemName;
            var table1 = $('table.problems');
            $(table1).filter(function(){
                var data = $(this);
                var length = data.children().eq(0).children().length;
                for(var i =0 ; i < length - 1 ; i++) {
                    problemCode = data.children().eq(0).children().eq(i+1).children().eq(0).text();
                    problemName = data.children().eq(0).children().eq(i+1).children().eq(1).text().replace("standard input/output" , "").replace("256 MB\n" , "");
                    var json = { problemCode : problemCode, problemName : problemName};
                    JsonArray.push(json);
                }
                // bothContest.push(JsonArray);
            });
            next();
        }
    });
    
}, function(req, res, next) {
    res.send(JsonArray);
    res.end();
});
module.exports = router;
