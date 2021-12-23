"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var cors_1 = __importDefault(require("cors"));
var router_1 = require("./router");
var config_1 = __importDefault(require("./config"));
var app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((0, cors_1["default"])());
app.use('/api/v1', router_1.router);
app.use(function (err, req, res, next) {
    console.log(err.stack);
});
app.listen(config_1["default"].PORT, function () { return console.log('Web服务开启中，请稍后...'); });
