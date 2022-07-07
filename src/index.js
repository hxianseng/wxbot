"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = require("./router");
var config_1 = __importDefault(require("./conf/config"));
var wechaty_1 = require("wechaty");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])());
app.use('/api/v1', router_1.router);
app.use(function (err, req, res, next) {
    console.log(err.stack);
});
app.listen(config_1["default"].PORT, '0.0.0.0', function () { return wechaty_1.log.info('服务开启中，请稍后...'); });
