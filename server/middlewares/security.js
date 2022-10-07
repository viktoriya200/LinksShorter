const { disablePoweredBy } = require('./disablePoweredBy');

const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const slowDown = require('express-slow-down');

function secure(app) {
    app.use(disablePoweredBy);

    app.use(
        cors({
            origin: ['https://example.ru', 'http://localhost:3000/'],
        })
    );

    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: [
                    "'self'",
                    "'unsafe-inline'",
                    'https://cdn.jsdelivr.net',
                ]
            }
        })
    );

    const limiter = rateLimiter({
        windowMs: 1 * 60 * 1000,
        max: 120,  // limit 120 requests in minute from IP
    });

    const speedLimiter = slowDown({
        windowMs: 1 * 60 * 1000,
        delayAfter: 100,  // allow 100 requests in minute
        delayMs: 1000, // add 1000ms to each request above 100,
    });

    app.use(limiter);
    app.use(speedLimiter);
}

module.exports = { secure };
