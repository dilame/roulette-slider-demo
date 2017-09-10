import { Application } from 'backbone.marionette';
import RouletteSliderLayout from './roulette-slider-game/roulette-slider-game-layout.view';

const io = require('sails.io.js')(require('socket.io-client'));

export default Application.extend({
  io,
  region: '#main-region',
  onStart() {
    this.showView(new RouletteSliderLayout());
  },
});
