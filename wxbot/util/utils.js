"use strict";
exports.__esModule = true;
exports.Utils = void 0;
var Utils = (function () {
    function Utils() {
    }
    Utils.format = function (date) {
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = '00' + ':';
        var s = '00';
        return Y + M + D + h + m + s;
    };
    Utils.sleep = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
    return Utils;
}());
exports.Utils = Utils;
