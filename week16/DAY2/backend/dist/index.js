"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a, _b, _c, _d, _e;
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            const currentUserRoom = (_a = allSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            for (let i = 0; i < allSockets.length; i++) {
                if (((_b = allSockets[i]) === null || _b === void 0 ? void 0 : _b.room) == currentUserRoom) {
                    (_d = (_c = allSockets[i]) === null || _c === void 0 ? void 0 : _c.socket) === null || _d === void 0 ? void 0 : _d.send((_e = parsedMessage === null || parsedMessage === void 0 ? void 0 : parsedMessage.payload) === null || _e === void 0 ? void 0 : _e.message);
                }
            }
        }
    });
});
