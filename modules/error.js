class BaseError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

class BadRequestError extends BaseError {
    constructor(message) {
        super(400, message);
    }
}

class notFoundError extends BaseError {
    constructor(message) {
        super(404, message);
    }
}

module.exports = { BadRequestError, notFoundError };
