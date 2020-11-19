const http = require('http');
const fs = require('fs');
const log4js = require('log4js');
const pug = require('pug');


const logger = log4js.getLogger();
logger.level = 'debug';

http.createServer((req, res) => {
  if(req.url){
    if(req.url == '/team') {
      fs.readFile('./WWW/team.json', (err, data) => {
        if(err) {
          logger.warn(`NOT FOUND ${req.method} ${req.url}`);
          res.writeHead(404, {"Content-Type": "text/html"});
          res.write('NOT FOUND');
        } else {
          res.writeHead(200, { "Content-Type": "application/json"});
          res.write(data);
        }
        res.end();
      })
    }else {
      const file = req.url === '/' ? './WWW/view/landing.pug' : `./WWW${req.url}`;
      const pugFile = pug.renderFile(file, { name: 'Quack'});
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(pugFile);
      res.end();
    }
  }
}).listen(process.env.PORT || 4000);
