module.exports.routes = {

  '/': {
    view: 'homepage',
  },
  'post /api/v1/bet': 'RouletteController.bet',
};
