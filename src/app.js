import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"));

    // All API routes live under /api
    app.use("/api", routes);

    // 404 + error handling
    app.use(notFound);
    app.use(errorHandler);
    
    return app;
};