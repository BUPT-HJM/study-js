var app = require('express')();
var request = require('request');
var cheerio = require('cheerio');
var concat = require('concat-stream');
var zlib = require('zlib');
//request.debug = true;

//相关配置
var APP_CONF = {
    reverse_url: "https://www.baidu.com",
    port: 8000,
    cookie: "",
    debug: true
}
app.use('/', reverseController)

function reverseController(req, res) {
    debug({
        path: req.originalUrl,
        url: APP_CONF.reverse_url + req.originalUrl,
        method: req.method
    })
    var cookie = APP_CONF.cookie;
    // 反向代理链接
    var options = {
        url: APP_CONF.reverse_url + req.originalUrl,
        headers: {
            //cookie: APP_CONF.cookie
        }
    }
    var url = APP_CONF.reverse_url + req.originalUrl;
    var r = null;
    if (/POST|PUT/i.test(req.method)) { //假如是post／put请求
        r = request.post(Object.assign(options, { json: req.body }))
            .on('response', function(response) {
                // 响应相应post/put请求
            });
        req.pipe(r).pipe(res);
    } else {
        var mime = '';
        var isGzip = false;
        r = request(options)
            .on('response', function(response) {
                mime = response.headers['content-type'];
                if (response.headers['content-encoding'] == 'gzip') {
                    isGzip = true;
                }
                res.writeHead(response.statusCode, response.headers);
            });
        // req 可读流 ==传递chunk==> r 可写流 ==返回目标流传递chunk==> concat 可写流
        req.pipe(r).pipe(concat(function(body) {
            // 拦截内容，根据mime去处理不同body
            debug({
                mime: mime,
                divide: "========================="
            });
            if (mime && mime.indexOf("text/html;") !== -1) {
                if (isGzip) {
                    zlib.gunzip(body, function(err, decoded) {
                        var $ = cheerio.load(decoded.toString());
                        // html相关处理
                        // cheerio
                        body = $.html();
                    });
                } else {
                    var $ = cheerio.load(decoded.toString());
                    // html相关处理
                    // cheerio
                    body = $.html();
                }
            }
            res.end(body);
        }));
    }
}

function debug(obj) {
    if (APP_CONF.debug) {
        for (var i in obj) {
            console.log(i + ":", obj[i]);
        }
    }
}

var server = app.listen(APP_CONF.port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});