"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
function handleError(err, res) {
    console.error(err);
    if (err instanceof Error) {
        res.status(500).send(err.message);
    }
    else {
        res.status(500).send('An unexpected error occurred');
    }
}
