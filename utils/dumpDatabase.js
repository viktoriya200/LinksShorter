const path = require('path');
const CronJob = require('cron').CronJob;
const { compressFile } = require('../utils/compressFile');
const { getDatabaseFilePath } = require('../utils/getDatabaseFilePath');

const linksFilePath = getDatabaseFilePath();

function dumpDatabase() {
    new CronJob('59 23 * * *', () => {
        compressFile(linksFilePath, path.resolve(__dirname, '../db/dumps'), 'db-dump.json');
        console.log('Database was created');
    },
    null,
    true
    );
}

module.exports = { dumpDatabase };
