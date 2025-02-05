// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const comments = [];
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    // console.log(pathname, query);
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
            if (err) {
                res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/add') {
        fs.readFile(path.join(__dirname, 'add.html'), 'utf-8', (err, data) => {
            if (err) {
                res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/api/comments') {
        if (req.method === 'POST') {
            let str = '';
            req.on('data', (chunk) => {
                str += chunk;
            });
            req.on('end', () => {
                const comment = qs.parse(str);
                comment.time = new Date();
                comments.push(comment);
                res.writeHead(301, {
                    Location: '/'
                });
                res.end();
            });
        } else {
            res.end(JSON.stringify(comments));
        }
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', (err, data) => {
            if (err) {
                res.end('404 Not Found');
            }
            res.end(data);
        });
    }
});

server.listen(8080, () => {
    console.log('Server is running at http://