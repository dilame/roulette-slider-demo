/**
 * BetController
 *
 * @description :: Server-side logic for managing bets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  bet(req, res) {
    const amount = req.param('amount');
    const color = req.param('color');
    sails.services.rouletteservice.bet(amount, color);
    res.send();
  },
};
