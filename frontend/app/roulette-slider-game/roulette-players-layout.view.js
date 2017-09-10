import { View, CollectionView } from 'backbone.marionette';
import Radio from 'backbone.radio';
import { RoulettePlayersCollection } from './roulette-players.collection';
import layoutTemplate from './roulette-players-layout.ejs';
import playerTemplate from './roulette-player.ejs';
import app from '../app';

const rouletteChannel = Radio.channel('roulette');

const PlayerView = View.extend({
  initialize() {
    this.listenTo(rouletteChannel, 'spin:end', this.refresh);
  },
  refresh() {
    this.$('span').html(this.model.get('amount'));
  },
  template: playerTemplate,
});

const PlayersCollectionView = CollectionView.extend({
  childView: PlayerView,
});

export default View.extend({
  regions: {
    red: '.red-region',
    green: '.green-region',
    black: '.black-region',
  },
  template: layoutTemplate,
  initialize() {
    this.redCollection = new RoulettePlayersCollection();
    this.greenCollection = new RoulettePlayersCollection();
    this.blackCollection = new RoulettePlayersCollection();
    app.io.socket.on('bet', (bet) => {
      this[`${bet.color}Collection`].add(bet);
    });
    this.listenTo(rouletteChannel, 'spin:end', () => setTimeout(() => this.clearTable(), 4000));
  },
  clearTable() {
    this.redCollection.reset();
    this.greenCollection.reset();
    this.blackCollection.reset();
  },
  onRender() {
    this.showChildView('red', new PlayersCollectionView({ collection: this.redCollection }));
    this.showChildView('green', new PlayersCollectionView({ collection: this.greenCollection }));
    this.showChildView('black', new PlayersCollectionView({ collection: this.blackCollection }));
  },
});
