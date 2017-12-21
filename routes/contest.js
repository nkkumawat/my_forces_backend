var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var JsonArray = [];
var JsonArray1 = [];
var bothContest = [];
router.get('/',function(req , res , next){
    var url = 'http://codeforces.com/contests';
    request(url, function(error, response, html){
        if(!error){
            JsonArray = [];
            JsonArray1 = [];
            var $ = cheerio.load(html);
            var contestName, startDate , contestCode;
            var table1 = $('table').children().eq(0);
            $(table1).filter(function(){
                var data = $(this);
                var length = data.children().eq(1).children().length;
                console.log(length);
                for(var i =0 ; i < length - 2 ; i++) {
                    contestName = data.children().eq(i+1).children().eq(0).text();
                    startDate = data.children().eq(i+1).children().eq(2).text();
                    contestCode = data.children().eq(i+1).attr("data-contestid");
                    var json = { contestName : contestName, startDate : startDate , contestCode: contestCode};
                    JsonArray.push(json);
                }
            });
            bothContest.push(JsonArray);
            var table2 = $('table').children().eq(1);
            $(table2).filter(function(){
                var data = $(this);
                var length = data.children().length;
                console.log(length);
                for(var i = 0 ; i < length - 2 ; i++) {
                    contestName = data.children().eq(i+1).children().eq(0).text();
                    startDate = data.children().eq(i+1).children().eq(2).text();
                    contestCode = data.children().eq(i+1).attr("data-contestid");
                    var json = { contestName : contestName, startDate : startDate , contestCode: contestCode};
                    JsonArray1.push(json);
                }
            });
            bothContest.push(JsonArray1);
            next();
        }
    });
    
}, function(req, res, next) {
    res.send(bothContest);
    res.end();
});
module.exports = router;
