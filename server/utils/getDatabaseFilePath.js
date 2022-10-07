const path = require('path');

function getDatabaseFilePath () {
    return process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../db/links-list.prod.json')
        : path.resolve(__dirname, '../db/links-list.dev.json');
}

module.exports = { getDatabaseFilePath };
