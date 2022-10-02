const linkService = require('../services/links');

async function addAlias(request, response, next) {
    try {
        const { link, alias } = request.body;

        await linkService.addAlias(link, alias);

        return response.send({status: 'success'});
    } catch(err) {
        next(err);
    }
}

module.exports = { addAlias };
