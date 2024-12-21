"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", function (socket) {
    // console.log("connection successful");
    // setInterval (() => {
    //   socket.send("hi there " + Math.random());
    // }, 1000)
    socket.on("message", (e) => {
        if (e.toString() == "ping") {
            socket.send("pong");
        }
        ;
    });
});
