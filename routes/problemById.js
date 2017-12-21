var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var JsonArray = [];
/* GET home page. */
router.get('/', function(req, res, next) {
    const contest = req.query.cId;
    const problem = req.query.pId;
    url = 'http://codeforces.com/problemset/problem/'+contest+'/'+problem;
    console.log(url);
    request(url, function(error, response, html){
        if(!error){
          JsonArray = [];
            var $ = cheerio.load(html);
            var title, statement,input , output ,  exampleInput , exampleOutput;
            var json = { title : "",
                          statement : "",
                          input : "" ,
                          output : "" ,
                          exampleInput: "",
                          exampleOutput: ""
                      };
            $('.problem-statement').filter(function(){
                var data = $(this);
                title = data.children().eq(0).children().eq(0).text();
                statement = data.children().eq(1).text();
                input = data.children().eq(2).text();
                output = data.children().eq(3).text();
                exampleInput = data.children().eq(4).children().eq(1).children().eq(0).children().eq(1).html();
                exampleOutput = data.children().eq(4).children().eq(1).children().eq(1).children().eq(1).html();
                json.title = title;
                json.statement = statement;
                json.input = input;
                json.output = output;
                json.exampleInput = exampleInput;
                json.exampleOutput = exampleOutput;
                JsonArray.push(json);
                next();
            });
        }
    });
},
  function(req, res, next) {
    res.send(JsonArray);
    res.end();
  });

module.exports = router;
