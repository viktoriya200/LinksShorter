const { getByAlias } = require('../services/links.js');

async function resolveAlias(request, response, next) {
    const { alias } = request.params;

    console.log(alias);

    const longLink = await getByAlias(alias);
    if(!longLink) next();

    if(process.env.NODE_ENV === 'production') {
        response.redirect(302, longLink);
    } else {
        response.send(longLink);
    }

}

module.exports = { resolveAlias };
