const fs = require('fs').promises;
const path = require('path');
const http = require('http');

const devLinksFilePath = path.resolve(__dirname, './links-list.dev.txt');
const prodLinksFilePath = path.resolve(__dirname, './links-list.prod.txt');

const linksFilePath = process.env.NODE_ENV === 'production' ? prodLinksFilePath : devLinksFilePath;

async function printLinkByAlias(alias) {
    const linksFileContent = await fs.readFile(linksFilePath, 'utf-8');

    const links = linksFileContent
        .split('\n')  // rows to array
        .filter(str => !!str) // just boolean
        .map(row => row.split(': ')) // split alias from full link
        .reduce((acc, curr) => ({...acc, [curr[0]]: curr[1]}), {});

    return links[alias];
}

const server = http.createServer((request, response) => {
    console.log(request.url);

    const alias = request.url.slice(1);

    printLinkByAlias(alias).then(longLink => {
        if(!longLink) {
            response.statusCode = 404;
            return response.end('Not found');
        }

        if(process.env.NODE_ENV === 'production') {
            response.setHeader('location', longLink);
            response.statusCode = 302;

            response.end();
        } else {
            response.end(longLink);
        }
    });
});

server.listen(3000, () => console.log('Server has been started on port 3000'));
