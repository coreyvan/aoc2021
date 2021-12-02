"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs
    .readFileSync("../../data/day1.txt")
    .toString("utf8")
    .split("\n")
    .map(function (n) { return parseInt(n); });
function d1part1(data) {
    var count = 0;
    var last = data[0];
    data.shift();
    data.forEach(function (n) {
        var current = n;
        if (current > last) {
            count++;
        }
        last = current;
    });
    return count;
}
function d1part2(data) {
    var count = 0;
    var last = data[0] + data[1] + data[2];
    data.shift();
    for (var i = 0; i < data.length - 3; i++) {
        var current = data[i] + data[i + 1] + data[i + 2];
        if (current > last) {
            count++;
        }
        last = current;
    }
    return count;
}
console.log("part1: " + d1part1(input));
console.log("part2: " + d1part2(input));
