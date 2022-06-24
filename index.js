const config = require("./config");

const sequelize = require("./bin/sequelize");


const { app, httpServer } = require("./bin/express");
const { io } = require("./bin/socketio");

const Project = require("./model/project");
const Client = require("./model/client");

// 供 项目服务器 创建新的 client
app.post("/new-client",(req,res,next)=>{
    let puuid = req.body.puuid;
    let ppass = res.body.ppass;

    Project.findOne({where:{uuid:puuid,pass:ppass}}).then(d=>{
        if(d){
            Client.create({puuid}).then(d=>{
                res.json200(d);
            }).catch(e=>{
                res.json500(e);
                console.log("api project new-client",e);
            });
        }else{
            res.json400();
        }
    }).catch(e=>{
        res.json500(e);
        console.log("api project new-client",e);
    });
});

app.post("/api/project/push/client", (req, res, next) => {
    let cuuid = req.body.cuuid;
    let event = req.body.event || "message" ;
    let data = req.body.data || { a: "aaa" };

    if (cuuid && event && data) {
        io.of("/").to(`client-${cuuid}`)
        .emit("from-project-server",{
            event,data
        });
        res.json200();
    }else{
        res.json400();
    }
});
app.post("/api/project/push/project",(req,res,next)=>{
    let puuid = req.body.puuid;
    let event = req.body.event || "message";
    let data = req.body.data;

    if (puuid && event && data) {
        io.of("/").to(`project-${puuid}`)
        .emit("from-project-server",{
            event,data
        });
        res.json200();
    }else{
        res.json400();
    }
});


httpServer.listen(config.port, (err) => {
    if (err) {
        console.log("httpServer.listen", err);
    }
    config.hosts.forEach((host) => {
        console.log(`http://${host}:${config.port}`);
    });
});