import { readFile } from "fs";

let processData = (
  filename: string,
  callback: (err: any, data?: string[]) => void
) => {
  readFile(filename, (err: any, bytes: Buffer) => {
    if (err) callback(err);
    let data: string[] = bytes.toString().split("\n");
    callback(null, data);
  });
};

class Submarine {
  gamma: string;
  epsilon: string;
  calculatePowerRates(commands: string[]): void {
    if (commands.length === 0) return;

    // get width of commands
    let width = commands[0].length;

    // init gamma and epsilon to be the same width as the commands
    this.gamma = "0".repeat(width);
    this.epsilon = "1".repeat(width);

    let gammaChars = [...this.gamma];
    let epsilonChars = [...this.epsilon];

    // counts contains the number of set bits at each position
    let counts: number[] = new Array(width).fill(0);

    commands.forEach((s) => {
      let n = parseInt(s, 2);
      for (var i = 0; i < width; i++) {
        let shifted = n >> i;
        let add = shifted & 1;
        counts[width - i - 1] += add;
      }
    });

    for (let i = 0; i < counts.length; i++) {
      if (counts[i] > commands.length / 2) {
        gammaChars[i] = "1";
        epsilonChars[i] = "0";
      }
    }

    this.gamma = gammaChars.join("");
    this.epsilon = epsilonChars.join("");
  }
}

function part1(err: any, commands: string[]) {
  if (err) {
    console.log(err);
    return;
  }

  let sub = new Submarine();
  sub.calculatePowerRates(commands);
  console.assert(sub.gamma === "100111011000");
  console.assert(sub.epsilon === "011000100111");
  console.log(parseInt(sub.gamma, 2) * parseInt(sub.epsilon, 2));
}

let part2 = (err: any, commands: string[]) => {
  if (err) {
    console.log(err);
    return;
  }

  let oxygenRating = findRating(commands, "oxygen", commands[0].length - 1);
  let co2Rating = findRating(commands, "co2", commands[0].length - 1);

  console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));
};

function findRating(commands: string[], rating: string, bit: number): string {
  if (commands.length === 1) return commands[0];

  switch (rating) {
    case "oxygen":
      return findRating(reduceOxygen(commands, bit), rating, bit - 1);
    case "co2":
      return findRating(reduceCO2(commands, bit), rating, bit - 1);
    default:
      throw Error("unknown rating");
  }
}

function reduceOxygen(commands: string[], bit: number): string[] {
  let ones = new Array();
  let zeroes = new Array();

  commands.forEach((c) => {
    let n = parseInt(c, 2);
    let shifted = n >> bit;
    if (shifted & 1) {
      ones.push(c);
      return;
    }
    zeroes.push(c);
  });

  if (ones.length >= zeroes.length) {
    return ones;
  }

  return zeroes;
}

function reduceCO2(commands: string[], bit: number): string[] {
  let ones = new Array();
  let zeroes = new Array();

  commands.forEach((c) => {
    let n = parseInt(c, 2);
    let shifted = n >> bit;
    if (shifted & 1) {
      ones.push(c);
      return;
    }
    zeroes.push(c);
  });

  if (ones.length < zeroes.length) {
    return ones;
  }

  return zeroes;
}

export const day3 = {
  yieldPart1: (filename) => {
    processData(filename, part1);
  },
  yieldPart2: (filename) => {
    processData(filename, part2);
  },
};
