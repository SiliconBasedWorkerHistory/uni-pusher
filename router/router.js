const router = require("express").Router()

const project = require("./project").router
const admin = require("./admin").router


router.use("/admin",admin)
// router.use("/admin",admin)

module.exports = {router}