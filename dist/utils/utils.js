"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.parseBody = void 0;
const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(JSON.parse(body));
        });
    });
};
exports.parseBody = parseBody;
const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};
exports.sendResponse = sendResponse;
