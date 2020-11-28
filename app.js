const http = require('http');
const fs = require('fs');
const log4js = require('log4js');
const pug = require('pug');
const team = require('./WWW/team.json');

const logger = log4js.getLogger();
logger.level = 'debug';

http.createServer((req, res) => {
  if (req.url) {
    if (req.url == '/about') {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(team));
      res.end();
    } else if (req.url.split('.').pop() == 'png') {
      try {
        fs.readFile(`./WWW/assets${req.url}`, (err, data) => {
          if (err) {
            logger.warn(`NOT FOUND ${req.method} ${req.url}`);
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write('NOT FOUND');
          } else {
            res.writeHead(200, { "Content-Type": "image/png" });
            res.write(data);
          }
          res.end();
        })
      } catch (e) {
        logger.warn(`NOT FOUND ${req.method} ${req.url}`);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write('NOT FOUND');
        res.end();
      }
    } else if (req.url.split('.').pop() == 'jpg') {
      try {
        fs.readFile(`./WWW/assets${req.url}`, (err, data) => {
          if (err) {
            logger.warn(`NOT FOUND ${req.method} ${req.url}`);
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write('NOT FOUND');
          } else {
            res.writeHead(200, { "Content-Type": "image/jpg" });
            res.write(data);
          }
          res.end();
        })
      } catch (e) {
        logger.warn(`NOT FOUND ${req.method} ${req.url}`);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write('NOT FOUND');
        res.end();
      }
    } else if (req.url.split('.').pop() == 'pdf') {
      try {
        fs.readFile(`./WWW/assets${req.url}`, (err, data) => {
          if (err) {
            logger.warn(`NOT FOUND ${req.method} ${req.url}`);
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write('NOT FOUND');
          } else {
            res.writeHead(200, { "Content-Type": "application/pdf" });
            res.write(data);
          }
          res.end();
        })
      } catch (e) {
        logger.warn(`NOT FOUND ${req.method} ${req.url}`);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write('NOT FOUND');
        res.end();
      }
    } else {
      let pugFile;
      const lastChar = req.url.substr(req.url.length - 1);
      if (lastChar >= '0' && lastChar <= '9') {
        const file = './WWW/view/profile.pug';
        pugFile = pug.renderFile(file, { teammate: team.equipo[parseInt(lastChar)] });

      } else {
        const file = './WWW/view/landing.pug';
        pugFile = pug.renderFile(file, { team: team.equipo });
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(pugFile);
      res.end();
    }
  }
}).listen(process.env.PORT || 4000);
