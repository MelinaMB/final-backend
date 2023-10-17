import express from "express";
import { productsRouter } from './routes/products.routers.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from "./routes/views.router.js";
import { cartViewRouter } from './routes/cartView.router.js';
import { messagesRouter } from "./routes/messages.router.js";
import { __dirname, connectMongo } from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from 'connect-mongo';
import { iniPassport } from "./config/passport.config.js";
import passport from "passport";
import { sessionsRouter } from "./routes/session.router.js";
import config from "./config/config.js";
import { userRouter } from "./routes/users.router.js";
import {userDTO} from './DAO/DTO/user.dto.js'
import { ticketRouter } from "./routes/ticket.router.js";
import errorHandler from "./middlewares/error.js";
import { addLogger } from "./utils/logger.js";
import 'express-async-errors';

// -------------------swagger--------------------------------

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

// ----------------------------------------------------
console.log(config);

const app = express();
const port = config.port || 8080;

app.use(addLogger);
app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) 
app.get("/loggerTest", (req, res) => {
  try {
    req.logger.debug(' mensaje de debug.');
    req.logger.http(' mensaje HTTP.');
    req.logger.info(' mensaje de información.');
    req.logger.warn(' mensaje de advertencia.');
    req.logger.error(' mensaje de error.');
    req.logger.fatal('mensaje fatal');

    res.status(200).json({ status: 'success', msg: 'mensajes de logger' });
  } catch (error) {
    req.logger.error(error);
    res.status(404).json({ message: "no mensajes de logger" });
  }
});

//----------------------- express-----------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", path.join(__dirname, "views"));
// --------------------------------------------------

// session se guarda en mongo
app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://melinambustos:jq7wYzhXfWRZtGpe@backend-coder.rpukb6t.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 1000000 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);
// ---------------------------------

// todo lo de passport
iniPassport();
app.use(passport.initialize());
app.use(passport.session());
// -----------------------------

// ------------swagger-------------------------------
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion",
      description: "Este proyecto es un e-commerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
// -----------------------------------------------------------------

// --------------------rutas------------------------------
app.use("/api/products", productsRouter);
app.use("/api/cartView", cartViewRouter);
app.use("/api/ticket", ticketRouter)
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/test-chat", messagesRouter);
app.use('/api/user', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use("/api/session/current", (req, res) => {
  const informacionUser = new userDTO(req.session.user);
   res.status(200).json({ user: informacionUser});
});
// --------------------------------------------------------

// --------------------------------------------------------
app.get('/', (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "no esta la ruta!!!",
    data: {},
  });
});

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

connectMongo();


app.use(errorHandler);