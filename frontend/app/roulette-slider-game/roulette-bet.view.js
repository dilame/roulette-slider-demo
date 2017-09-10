import { View } from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from './roulette-bet.ejs';
import app from '../app';

const rouletteChannel = Radio.channel('roulette');

export default View.extend({
  initialize() {
    this.listenTo(rouletteChannel, 'spin:start', this.refresh);
  },
  ui: {
    amount: '[name="amount"]',
    color: '[name="color"]',
  },
  events: {
    'click button.bet': 'bet',
  },
  bet() {
    app.io.socket.post('/api/v1/bet', {
      amount: this.getUI('amount').val(),
      color: this.getUI('color').filter(':checked').val(),
    });
  },
  refresh() {
    this.getUI('amount').val('');
    this.getUI('color').prop('checked', false);
  },
  template,
});
