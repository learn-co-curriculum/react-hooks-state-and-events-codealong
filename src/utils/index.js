let numbers = [];

export function randomNumber() {
  let number = null;
  while (number === null) {
    let nextNumber = Math.floor(Math.random() * 100) + 1;
    if (numbers.indexOf(nextNumber) === -1) {
      number = nextNumber;
      numbers.push(number);
    }
  }
  return number;
}
