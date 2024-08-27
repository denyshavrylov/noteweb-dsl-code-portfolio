import dotenv from 'dotenv';
dotenv.config();

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import express from 'express';
import ProductController from './controller/product-controller';

const app = express();
app.use(express.json());

// Define routes and controllers
app.use('/products', ProductController);

// Function to list routes (for debugging purposes)
const listRoutes = (app: any) => {
  const routes: any[] = [];
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) { // Routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods).join(', ').toUpperCase()
      });
    } else if (middleware.name === 'router') { // Routes registered on routers
      middleware.handle.stack.forEach((handler: any) => {
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

const server = createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const routes = listRoutes(app);
  console.log('Available Routes:', routes);
  return proxy(server, event, context, 'PROMISE').promise;
};

