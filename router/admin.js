const express = require("express");
const router = express.Router();

const Project = require("../model/project");
const Client = require("../model/client");
const User = require("../model/user");

router.post("/users",(req,res,next)=>{
    User.findAll().then(d=>{
        res.json200(d);
    }).catch(e=>{
        console.log(e);
        res.json500(e)
    });
});

router.post("/user/new",(req,res,next)=>{
    let username = "Hallen"
    let password = "atyfsdk"
    User.create({username,password}).then(_=>{
        res.json200()
    }).catch(e=>{
        console.log(e);
        res.json500(e)
    });
});

router.post("/projects",(req,res,next)=>{
    Project.findAll().then(d=>{
        res.json200(d)
    }).catch(e=>{
        console.log(e);
        res.json500(e)
    });
});

router.post("/clients",(req,res,next)=>{
    Client.findAll().then(d=>{
        res.json200(d)
    }).catch(e=>{
        console.log(e);
        res.json500(e)
    });
})

router.post("/project/new",(req,res,next)=>{
    let label = req.body.label || "label";
    let note = req.body.note || "note";
    Project.create({label,note}).then(d=>{
        res.json200(d)
    }).catch(e=>{
        console.log(e);
        res.json500(e);
    })
})

router.post("/client/new",(req,res,next)=>{
    let label = req.body.label || "label";
    let note = req.body.note || "note";
    let puuid = req.body.puuid;

    Client.create({puuid,label,note}).then(d=>{
        res.json200(d);
    }).catch(e=>{
        console.log(e);
        res.json500(e);
    })
})

module.exports = {router}