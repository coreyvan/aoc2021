"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Submarine = /** @class */ (function () {
    function Submarine() {
        this.depth = 0;
        this.distance = 0;
    }
    Submarine.prototype.navigate = function (commands) {
        var _this = this;
        commands.forEach(function (command) {
            switch (command.direction) {
                case "forward":
                    _this.distance += command.value;
                    break;
                case "down":
                    _this.depth += command.value;
                    break;
                case "up":
                    _this.depth -= command.value;
                    if (_this.depth < 0)
                        _this.depth = 0;
                    break;
            }
        });
    };
    Submarine.prototype.getFinal = function () {
        return this.depth * this.distance;
    };
    return Submarine;
}());
var processData = function (filename, callback) {
    fs.readFile(filename, function (err, bytes) {
        if (err)
            callback(err);
        var data = bytes
            .toString()
            .split("\n")
            .map(function (elem) {
            var com = elem.split(" ");
            return { direction: com[0], value: parseInt(com[1]) };
        });
        callback(null, data);
    });
};
function part1(err, commands) {
    if (err) {
        console.log(err);
        return;
    }
    var sub = new Submarine();
    sub.navigate(commands);
    console.log(sub.getFinal());
}
var AimedSubmarine = /** @class */ (function (_super) {
    __extends(AimedSubmarine, _super);
    function AimedSubmarine() {
        var _this = _super.call(this) || this;
        _this.aim = 0;
        return _this;
    }
    AimedSubmarine.prototype.navigate = function (commands) {
        var _this = this;
        commands.forEach(function (command) {
            switch (command.direction) {
                case "forward":
                    _this.distance += command.value;
                    _this.depth += _this.aim * command.value;
                    break;
                case "down":
                    _this.aim += command.value;
                    break;
                case "up":
                    _this.aim -= command.value;
                    break;
            }
        });
    };
    return AimedSubmarine;
}(Submarine));
var part2 = function (err, commands) {
    if (err) {
        console.log(err);
        return;
    }
    var sub = new AimedSubmarine();
    sub.navigate(commands);
    console.log(sub.getFinal());
};
processData("../../data/day2.txt", part1);
processData("../../data/day2.txt", part2);
