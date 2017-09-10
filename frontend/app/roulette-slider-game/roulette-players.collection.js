import Backbone from 'backbone';
import app from '../app';

export const RoulettePlayerModel = Backbone.Model.extend({
  initialize() {
    app.io.socket.on(this.get('name'), (data) => {
      this.set(data);
      app.io.socket.off(this.get('name'));
    });
  },
});

export const RoulettePlayersCollection = Backbone.Collection.extend({
  model: RoulettePlayerModel,
});

export default RoulettePlayersCollection;
