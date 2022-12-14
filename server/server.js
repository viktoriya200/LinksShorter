const path = require('path')

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { resolveAlias } = require('./controllers/resolveAlias');
const { addAlias } = require('./controllers/addAlias');
const { notFound } = require('./middlewares/notFound');
const { urlLogger } = require('./middlewares/urlLogger');
const { errorHandler } = require('./middlewares/errorHandler');
const { accessLogs } = require('./middlewares/accessLogs');
const { dumpDatabase } = require('./utils/dumpDatabase');
const { monitorProcess } = require('./utils/monitorProcess');
const { secure } = require('./middlewares/security');

const app = express();

secure(app);

app.use(express.json());

app.use(urlLogger);

app.use(accessLogs(true)); // write to file
app.use(accessLogs()); // write to console

app.get('/:alias', resolveAlias);
app.post('/alias', addAlias);

app.use(
    process.env.NODE_ENV === 'production'
        ? express.static(path.resolve(__dirname, '../client/dist'))
        : createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log('Server has been started on port 3000'));

dumpDatabase();
monitorProcess();
