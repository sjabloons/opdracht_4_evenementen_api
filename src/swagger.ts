import swaggerJSDoc from "swagger-jsdoc";
import { isProduction } from "./helpers";
import path from "path";
import { get } from "http";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Event API",
            version: "1.0.0",
            description:
                "API for managing events and their associated expenses",
        },
        servers: [
            process.env.NODE_ENV !== "production"
                ? {
                      url: "https://opdracht-4-evenementen-api.onrender.com/api/",
                      description: "Production server",
                  }
                : {
                      url: "http://localhost:3000/api/v1",
                      description: "Development server",
                  },
        ],
        components: {
            schemas: {
                Event: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        date: { type: "string", format: "date-time" },
                        location: { type: "string" },
                        description: { type: "string" },
                        isFree: { type: "boolean" },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
        tags: [
            {
                name: "Events",
                description: "Endpoints for managing events",
            },
        ],
    },
    apis: ["**/*.ts"],
};

export const specs = swaggerJSDoc(options);
