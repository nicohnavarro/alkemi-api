import express, { json } from "express";
import { join } from "path";
import { serve, setup } from "swagger-ui-express";
import morgan from "morgan";
import { port, api, swagger } from "../../config/index.js";
import swaggerDocument from "../swagger/swagger.json";
import authRoutes from "../../routes/auth.js";
import userRoutes from "../../routes/users.js";
import characterRoutes from "../../routes/characters.js";
import movieRoutes from "../../routes/movies.js";

export class ExpressServer {
  constructor() {
    this.app = express();
    this.port = port;
    this.basePath = api.prefix;

    this._middlewares();
    this._swaggerConfig();

    this._routes();

    this._notFound();
    this._errorHandler();

    console.log(this.basePath);
  }

  _middlewares() {
    this.app.use(json());
    this.app.use(morgan("tiny"));
  }

  _routes() {
    this.app.get("/", (req, res) => {
      res.send("<h2>Hello Alkemy!!</h2>");
    });


    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });

    this.app.get("/report", (req, res) => {
      res.sendFile(join(__dirname + "../../../../postman/report.html"));
    });

    this.app.use(`${this.basePath}/auth`, authRoutes);
    this.app.use(`${this.basePath}/users`, userRoutes);
    this.app.use(`${this.basePath}/characters`, characterRoutes);
    this.app.use(`${this.basePath}/movies`, movieRoutes);
  }

  _notFound() {
    this.app.use((req, res, next) => {
      const err = new Error("Not Found");
      err.status = 404;
      err.code = 404;
      next(err);
    });
  }

  _swaggerConfig() {
    this.app.use(swagger.path, serve, setup(swaggerDocument));
  }

  _errorHandler() {
    this.app.use((err, req, res, next) => {
      const code = err.code || 500;
      res.status(code);
      const body = {
        error: {
          code,
          message: err.message,
          detail: err.data,
        },
      };
      res.json(body);
    });
  }

  async start() {
    this.app.listen(this.port, (error) => {
      if (error) {
        _error(error);
        process.exit(1);
        return;
      }
    });
  }
}
