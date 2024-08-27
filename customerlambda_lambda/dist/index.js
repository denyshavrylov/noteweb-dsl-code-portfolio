"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const aws_serverless_express_1 = require("aws-serverless-express");
const express_1 = __importDefault(require("express"));
const customer_controller_1 = __importDefault(require("./controller/customer-controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Define routes and controllers
app.use('/customers', customer_controller_1.default);
// Function to list routes (for debugging purposes)
const listRoutes = (app) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) { // Routes registered directly on the app
            routes.push({
                path: middleware.route.path,
                methods: Object.keys(middleware.route.methods).join(', ').toUpperCase()
            });
        }
        else if (middleware.name === 'router') { // Routes registered on routers
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        path: handler.route.path,
                        methods: Object.keys(handler.route.methods).join(', ').toUpperCase()
                    });
                }
            });
        }
    });
    return routes;
};
const server = (0, aws_serverless_express_1.createServer)(app);
const handler = (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const routes = listRoutes(app);
    console.log('Available Routes:', routes);
    return (0, aws_serverless_express_1.proxy)(server, event, context, 'PROMISE').promise;
};
exports.handler = handler;
