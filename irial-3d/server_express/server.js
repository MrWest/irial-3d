const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
var sslRedirect = require('heroku-ssl-redirect');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const sendFile = (res, filePath) => res.sendFile(filePath, { root: __dirname });

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());
    // enable ssl redirect
    server.use(sslRedirect());

    server.use(function forceLiveDomain(req, res, next) {
      // Don't allow user to hit Heroku now that we have a domain
      var host = req.get('Host');
      if (host === 'vinalestravelernext.herokuapp.com') {
        return res.redirect(301, 'https://vinalestraveler.com');
      }
      if (host === 'www.vinalestraveler.com') {
        return res.redirect(301, 'https://vinalestraveler.com' + req.originalUrl);
      }
      return next();
    });

    server.get('*', (req, res) => {
      if ('/robots.txt' === req.url) {
        return sendFile(res, 'robots.txt')
      }
      if ('/robots_ssl.txt' === req.url) {
        return sendFile(res, 'robots_ssl.txt')
      }
      if ('/sitemap.xml' === req.url) {
        return sendFile(res, 'sitemap.xml')
      }
      if ('/.htaccess' === req.url) {
        return sendFile(res, '.htaccess')
      }
      if ('/google5fd3023c14aaaed0.html' === req.url) {
        return sendFile(res, 'google5fd3023c14aaaed0.html')
      }
      

      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });