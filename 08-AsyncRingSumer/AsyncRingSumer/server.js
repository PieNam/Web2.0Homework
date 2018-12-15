// 许滨楠 17343131
// Homework 8 Async Ring Menu
// server.js

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = 3000;

// query the extensionname of a file and determined the type
function getMimeType(pathName) {
    var extensionType = {
        ".html" : "text/html",
        ".js" : "application/javascript",
        ".css" : "text/css",
        ".jpg" : "image/jpg",
        ".gif" : "image/gif",
        ".png" : "image/png"
    }
    return extensionType[path.extname(pathName)];
}

http.createServer(function(req, res) {
    var pathName = url.parse(req.url).pathname;
    var mimeType = getMimeType(pathName);
    if (!!mimeType) {
        pageHandler(req, res, pathName);
    }
    else {
        ajaxHandler(req, res);
    }
}).listen(port, function() {
    console.log("Asynchronous Ring Sumer server is listening at " + port);
});

function pageHandler(req, res, pathName) {
    var filePath = __dirname + pathName;
    var mimeType = getMimeType(pathName);
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, function(e, data) {
            if (e) {
                res.writeHead(500); // 500 for Internal Server Error
                res.end();
            }
            else {
                res.setHeader("Content-Length", data.length);
                res.setHeader("Content-Type", mimeType);
                res.statusCode = 200;
                res.end(data);
            }
        })
    }
    else {
        res.writeHead(500);
        res.end();
    }
}

function getRandomNumber(limit) {
    return Math.round(Math.random() * limit);
}

function ajaxHandler(req, res) {
    var random_time = 1000 + getRandomNumber(2000);
    var random_num = 1 + getRandomNumber(9);
    setTimeout(function() {
        res.writeHead(200, {"Contetn-Type" : "text/plain"});
        res.end("" + random_num);
    }, random_time);
}