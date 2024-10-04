import { Server } from "azle";
import express from "express";
import router from "./routes";
import errorHandler from "./helpers/errorHandler";


export default Server(() => {
  const app = express();
  app.use(express.json());

  app.use(router)
  app.use(errorHandler)

  return app.listen();
});
