import { View } from 'backbone.marionette';
import RouletteView from './roulette.view';
import BetView from './roulette-bet.view';
import PlayersView from './roulette-players-layout.view';
import template from './roulette-slider-game-layout.ejs';
import './roulette-slider-game.scss';

export default View.extend({
  className: 'roulette-slider-game',
  regions: {
    slider: '.slider-region',
    bet: '.bet-region',
    players: '.players-region',
  },
  onRender() {
    this.showChildView('slider', new RouletteView());
    this.showChildView('bet', new BetView());
    this.showChildView('players', new PlayersView());
  },
  onChildSpinEnd() {

  },
  template,
});
