const express = require("express");
const router = express.Router();


const Project = require("../model/project");


router.get("/list",(req,res,next)=>{
    Project.findAll().then(d=>{
        res.json200(d);
    }).catch(e=>{
        res.json500();
        console.log(e);
    });
});

module.exports = {router};