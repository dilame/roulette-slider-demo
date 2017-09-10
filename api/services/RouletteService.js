/* eslint-disable no-param-reassign */
const _ = require('lodash');

let bets = [];

const RouletteService = {
  bet(amount, color) {
    const name = _.uniqueId('user');
    const bet = { name, amount, color };
    bets.push(bet);
    sails.sockets.blast('bet', bet);
  },
  spin() {
    let color;
    const number = _.random(0, 14);
    const offset = _.random(0, 99) / 100;
    if (number === 0) color = 'green';
    else if (number <= 7) color = 'red';
    else color = 'black';
    sails.sockets.blast('spin', { number, offset });
    bets.forEach((bet) => {
      this.calculateWinAmount(bet, color);
      sails.sockets.blast(bet.name, bet);
    });
    bets = [];
  },
  calculateWinAmount(bet, color) {
    if (bet.color !== color) {
      bet.amount = 0;
      return;
    }
    if (['red', 'black'].includes(color)) bet.amount *= 2;
    else bet.amount *= 14;
  },
};

setInterval(() => RouletteService.spin(), 16000);

module.exports = RouletteService;
