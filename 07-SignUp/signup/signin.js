/*
    index.js
    Homework7 signup
    Binnan Xu 17343131
*/

// top-down

var http = require('http');
var urlTool = require('url');
var queryString = require('querystring');
var jade = require('jade');
var fs = require('fs');
var validator = require('./validator'); // from validator.js sharing - relative path

var users = {};

http.createServer(function(req, res) {
    switch(req.url) {
        case '/validator.js':
            sendFile(res, 'validator.js', 'text/javascript');
            break;
        case '/signup.js':
            sendFile(res, 'signup.js', 'text/javascript');
            break;
        case '/style.css':
            sendFile(res, 'style.css', 'text/css');
            break;
        default:
            req.method === 'POST' ? registerUser(req, res) : sendHtml(req, res);
    }
}).listen(8000);

console.log("Signup server is listening at 8000");

function sendFile(res, filepath, mine) {
    res.writeHead(200, {"Content-Type": mine});
    res.end(fs.readFileSync(filepath));
}

function registerUser(req, res) {
    req.on('data', function(chunk) {
        try {
            var user = parseUser(chunk.toString());
            checkUser(user);
            users[user.username] = user;
            res.writeHead(301, {Location: '?username=' + user.username});
            res.end();
        }
        catch (error) {
            console.warn("register error: ", error);
            showSignup(res, user, error);
        }
    });
}

function checkUser(user) {
    var errorMsgs = [];
    for (var key in user) {
        if (!validator.isFieldValid(key, user[key])) errorMsgs.push(validator.form[key].errorMsg);
        if (!validator.isAttrValueUnique(users, user, key)) errorMsgs.push(
            "Sorry, this " + key + " is already taken."
        );
    }
    if (errorMsgs.length > 0) throw new Error(errorMsgs.join('<br />Error: '));
}

function parseUser(msg) {
    params = msg.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
    var user = {username: params[1], sid: params[2], phone: params[3], 
                email: decodeURIComponent(params[4])};  // urldecode @ -> %40
    console.log("user parsed is: ", user);
    return user;
}

function sendHtml(req, res) {
    var username = parseUsername(req);
    if (!username || !isRegisteredUser(username)) {
        showSignup(res, {username: username}, null);
    }
    else {
        showDetail(res, users[username]);
    }
}

function parseUsername(req) {
    return queryString.parse(urlTool.parse(req.url).query).username;
}

function isRegisteredUser(username) {
    return !!users[username];
}

function showSignup(res, user, error) {
    // return "<!DOCTYPE html>"
    // tool: HTML Template Engine Jade
    // res.writeHead(200, {"Content-Type": "text/html"});   - don't repeat yourself
    // res.end(jade.renderFile('signup.jade'));
    // var html = jade.renderFile('signup.jade');
    // console.log("html", html);
    // res.end(html);
    showHtml(res, 'signup.jade', {user: user, error: error});
}

function showDetail(res, user) {
    // res.writeHead(200, {"Content-Type": "text/html"});   - don't repeat yourself
    // res.end(jade.renderFile('detail.jade', user));
    showHtml(res, 'detail.jade', user);
}

// - the way to not-repeating-yourself
function showHtml(res, template, data) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(jade.renderFile(template, data));
}