function disablePoweredBy(request, response, next) {
    response.removeHeader('X-Powered-By'); // hide that we use express

    next();
}

module.exports = { disablePoweredBy };
