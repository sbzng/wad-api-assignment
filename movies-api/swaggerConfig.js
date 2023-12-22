const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for movie app', 
      version: '1.0.0', 
      description: 'movie web api', 
    },
    servers: [
      {
        url: 'http://localhost:8080', 
        description: 'Development server',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./api/**/*.js'], 
  };
  
  const swaggerSpec = require('swagger-jsdoc')(options);
  
  module.exports = swaggerSpec;