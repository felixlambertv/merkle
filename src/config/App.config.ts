import { db } from "../database/Sqlite";
import express from "express";
import bindRoutes from "../router/BaseRouter.router";

const app = express();
app.use(express.json());

//binding routes to express app
app.use(bindRoutes(db));

export default app;
