import helmet from "helmet";
import multiCores from "./multi-cores";
import { EventEmitter } from "events";
import * as db from "./common/db";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv-flow").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const i18n = require("./common/i18n");
const Constants = require("./common/constants");
const { response } = require("./common/utils");


const mediator = new EventEmitter();
const app = express();
app.use(i18n.init);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware setup
app.use(helmet());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "apidoc")));

// Configure CORS handling
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma"
  );
  next();
});

// Handling CORS pre-flight requests
app.options("*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma"
  );
  res.sendStatus(200);
});

// Continue with other middleware
multiCores(app, mediator);

mediator.once("boot.ready", async (server) => {
  console.log("SERVER BOOT READY");
  db.connect();

  // JWT configuration
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: Constants.JWTSecret,
  };

  app.use(passport.initialize());

 
  // Routes setup
  app.use(require("./routes"));

  // Catch 404 and forward to error handler
  app.use(function (req, res, next) {
    return res.status(404).jsonp(response(false, {}, "Api not found"));
  });

  // Error handler
  app.use(function (err, req, res, next) {
    console.log(err);
    return res.status(500).jsonp(response(false, {}, err.message));
  });
});

module.exports = app;
