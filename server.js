const express = require('express');

const { resolveAlias } = require('./controllers/resolveAlias');
const { addAlias } = require('./controllers/addAlias');
const { notFound } = require('./middlewares/notFound');
const { urlLogger } = require('./middlewares/urlLogger');
const { errorHandler } = require('./middlewares/errorHandler');
const { accessLogs } = require('./middlewares/accessLogs');

const app = express();
app.use(express.json());

app.use(urlLogger);

app.use(accessLogs(true)); // write to file
app.use(accessLogs()); // write to console

app.get('/:alias', resolveAlias);
app.post('/alias', addAlias);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log('Server has been started on port 3000'));
