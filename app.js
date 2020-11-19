const http = require('http');
const fs = require('fs');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'debug';

http.createServer((req, res) => {
  if(req.url){
    const file = req.url === '/' ? './WWW/index.html' : `./WWW${req.url}`;
    fs.readFile(file, (err, data) => {
      if(err) {
        logger.warn(`NOT FOUND ${req.method} ${req.url}`);
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write('NOT FOUND');
      } else {
        logger.info(`OK ${req.method} ${req.url}`);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
      }
    });
  }
}).listen(4000);
