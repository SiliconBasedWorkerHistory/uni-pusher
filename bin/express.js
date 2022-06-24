const express = require("express");
const app = express();

// app.use(express.json());
app.use(require("cors")());
app.use(require("compression")());
// app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(require("../middleware/json").jsonResponse);

app.use("/",express.static('public/index'))
app.use("/admin",express.static('public/admin'))
app.use("/sio-client",express.static('public/sio_client'))
app.use("/api",require("../router/router").router);

const httpServer = require("http").createServer(app);

module.exports = {app,httpServer};