"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var processData = function (filename, callback) {
    fs.readFile(filename, function (err, bytes) {
        if (err)
            callback(err, null);
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
var part1 = function (err, commands) {
    if (err) {
        console.log(err);
        return;
    }
    var depth = 0;
    var distance = 0;
    commands.forEach(function (command) {
        switch (command.direction) {
            case "forward":
                distance += command.value;
                break;
            case "down":
                depth += command.value;
                break;
            case "up":
                depth -= command.value;
                if (depth < 0)
                    depth = 0;
                break;
        }
    });
    console.log(depth * distance);
};
var part2 = function (err, commands) {
    if (err) {
        console.log(err);
        return;
    }
    var depth = 0;
    var distance = 0;
    var aim = 0;
    commands.forEach(function (command) {
        switch (command.direction) {
            case "forward":
                distance += command.value;
                depth += aim * command.value;
                break;
            case "down":
                aim += command.value;
                break;
            case "up":
                aim -= command.value;
                break;
        }
    });
    console.log(depth * distance);
};
processData("../../data/day2.txt", part1);
processData("../../data/day2.txt", part2);
