import fs = require("fs");

type command = {
  direction: string;
  value: number;
};

class Submarine {
  depth: number = 0;
  distance: number = 0;
  navigate(commands: command[]): void {
    commands.forEach((command) => {
      switch (command.direction) {
        case "forward":
          this.distance += command.value;
          break;
        case "down":
          this.depth += command.value;
          break;
        case "up":
          this.depth -= command.value;
          if (this.depth < 0) this.depth = 0;
          break;
      }
    });
  }
  getFinal(): number {
    return this.depth * this.distance;
  }
}

class AimedSubmarine extends Submarine {
  aim: number = 0;
  constructor() {
    super();
  }
  navigate(commands: command[]) {
    commands.forEach((command) => {
      switch (command.direction) {
        case "forward":
          this.distance += command.value;
          this.depth += this.aim * command.value;
          break;
        case "down":
          this.aim += command.value;
          break;
        case "up":
          this.aim -= command.value;
          break;
      }
    });
  }
}

let processData = (
  filename: string,
  callback: (err: any, data?: command[]) => void
) => {
  fs.readFile(filename, (err: any, bytes: Buffer) => {
    if (err) callback(err);
    let data: command[] = bytes
      .toString()
      .split("\n")
      .map((elem) => {
        let com = elem.split(" ");
        return { direction: com[0], value: parseInt(com[1]) };
      });
    callback(null, data);
  });
};

function part1(err: any, commands: command[]) {
  if (err) {
    console.log(err);
    return;
  }

  let sub = new Submarine();
  sub.navigate(commands);
  console.assert(
    sub.getFinal() === 1524750,
    "part1 was incorrect, should be 1524750"
  );
}

let part2 = (err: any, commands: command[]) => {
  if (err) {
    console.log(err);
    return;
  }

  let sub = new AimedSubmarine();
  sub.navigate(commands);
  console.assert(
    sub.getFinal() === 1592426537,
    "part2 was incorrect, should be 1592426537"
  );
};

processData("../../data/day2.txt", part1);
processData("../../data/day2.txt", part2);

export {};
