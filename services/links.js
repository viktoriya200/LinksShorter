const path = require('path');
const fs = require('fs/promises');
const { BadRequestError } = require('../modules/error');

const devLinksFilePath = path.resolve(__dirname, './../db/links-list.dev.json');
const prodLinksFilePath = path.resolve(__dirname, './../db/links-list.prod.json');

const linksFilePath = process.env.NODE_ENV === 'production' ? prodLinksFilePath : devLinksFilePath;

async function getByAlias(alias) {
    const links = require(linksFilePath);

    return links[alias];
}

async function addAlias(alias, link) {
    const links = require(linksFilePath);

    if(links[alias]) {
        throw new BadRequestError('alias-already-exists');
    }

    links[alias] = link;

    await fs.writeFile(linksFilePath, JSON.stringify(links, null, 2), 'utf-8');

    return links[alias];
}

module.exports = { getByAlias, addAlias };
