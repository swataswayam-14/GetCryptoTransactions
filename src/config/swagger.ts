import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Crypto API',
      version: '1.0.0',
      description: 'API for fetching crypto transactions and Ethereum price',
      contact: {
        name: 'Your Name',
        email: 'your-email@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/**/*.ts']
};

export const swaggerSetup = swaggerUi.setup(swaggerJsDoc(swaggerOptions));
export { swaggerUi };
