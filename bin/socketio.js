const { httpServer } = require("./express");

const SocketIOServer = require("socket.io");
const io = SocketIOServer(httpServer, {
    cors: { origin: "*", credentials: false }
});
const { instrument } = require("@socket.io/admin-ui");
instrument(io, { auth: false });

const uuid = require("uuid");
const Client = require("../model/client");

io.engine.generateId = (req) => {
    return uuid.v4(); // must be unique across all Socket.IO servers
}


io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});


io.on("connection", (socket) => {
    console.log("new connection");
    // console.log("new connection",socket.conn.id);
    socket.join("havent-register");

    socket.on("disconnect", () => { });

    socket.conn.on("close", (reason) => { });

    socket.on("register", (d) => {
        console.log(d);
        socket.leave("havent-register");
        var cuuid = d.cuuid || null;

        // for debug
        // if (cuuid == "123") {
        //     socket.emit("register-result", { result: true });
        //     socket.join(`project-${cuuid}`);
        //     socket.join(`client-${cuuid}`);

        //     socket.emit("from-project-server", {
        //         event: "notify",
        //         data: {}
        //     })
        //     return;
        // }

        Client.findOne({ where: { uuid: cuuid } })
            .then(d => {
                if (d) {
                    socket.emit("register-result", { result: true });
                    socket.join(`project-${d.puuid}`);
                    socket.join(`client-${d.uuid}`);
                } else {
                    socket.emit("register-result", { result: false, reason: "client not found" });
                    socket.join("register-error");
                }

            }).catch(e => {
                console.log(e);
                socket.emit("register-result", { result: false, reason: "internal error" });
                socket.join("register-error");
            });

        // projectUUID 是 UniPusher 为单个项目提供的uuid
        // clientUUID 是 UniPusher 为单个客户端提供的uuid
        // 从客户端的视角来看：
        // 初始化时，先向服务器获取projectUUID和clientUUID，projectUUID也可以写死，问题不大
        // 服务器收到请求后，携带本地的projectUUID，向uni-pusher服务获取clientUUID
        // 理论上，客户端需要在本地保存服务器下发的clientUUID，不过中间增加一个虚拟层也不是不行，但是没必要

        // 推送时，服务器从本地存储的clientUUID入手，携带projectUUID和clientUUID及消息内容
    });

});

module.exports = { io }