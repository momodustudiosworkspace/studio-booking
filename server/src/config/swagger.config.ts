import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Momodu studios booking API",
            version: "1.0.0",
            description:"API documentation for booking app"
        },
        servers: [{ url: 'http://localhost:5000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat:"JWT"
                }
            }
        },
        security: [{ bearerAuth:[]}],
    },
    apis:["src/routes/*.ts"],
}

export const swaggerOpenapiSpecification = swaggerJSDoc(options)

export default swaggerOpenapiSpecification