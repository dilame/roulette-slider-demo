/* global Image */
import { View } from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from './roulette.ejs';
import app from '../app';
import numberToPositionMap from './roulette-number-position-map';

const rouletteChannel = Radio.channel('roulette');


export default View.extend({
  spriteImageUrl: '/images/roulette-slides/sprite.png',
  loopsPerSpin: 5, // Количество полных оборотов за один запуск вращения
  cellWidthPx: 78, // Ширина ячейки в пикселях
  spriteImageWidthPx: 0, // Ширина полного спрайта в пискелях
  positionMultiplier: -1, // Множитель позиции. Определяет направление анимации.
  currentPositionX: 0, // Текущая реальная позиция спрайта по X
  ui: {
    slider: '.roulette-slider',
  },
  triggers: {
    'transitionend @ui.slider': 'spin:end',
  },
  events: {
    'transitionend @ui.slider': 'spinEnd',
  },
  initialize() {
    const spriteImage = new Image();
    spriteImage.onload = () => {
      this.spriteImageWidthPx = spriteImage.width; // Записываем реальную ширину спрайта
    };
    spriteImage.src = this.spriteImageUrl;
  },
  onRender() {
    app.io.socket.on('spin', ({ number, offset }) => this.spin(numberToPositionMap[number], offset));
  },
  /**
   * Вращает рулетку до заданной позиции. Позиция != число в ячейке.
   * @param {Number} position - Номер позиции ячейки в спрайте
   * @param {Number} cellOffset - Сдвиг внутри ячейки
   */
  spin(position, cellOffset) {
    rouletteChannel.trigger('spin:start');
    const spinsShiftX = this.loopsPerSpin * this.spriteImageWidthPx;
    let wantedPositionX = position * this.cellWidthPx * this.positionMultiplier * -1;
    const boxCenterPositionX = this.getUI('slider').innerWidth() / 2;
    wantedPositionX += spinsShiftX;
    wantedPositionX -= this.cellWidthPx * cellOffset * this.positionMultiplier;
    wantedPositionX *= this.positionMultiplier; // Задаём направление вращения
    wantedPositionX += boxCenterPositionX; // Ставим нужную ячейку в центр бокса
    this.currentPositionX = Math.ceil(wantedPositionX);
    this.getUI('slider')
      .addClass('roulette-slider-animate')
      .css('background-position', `${this.currentPositionX}px`);
  },
  spinEnd() {
    this.resetSliderBackground();
    rouletteChannel.trigger('spin:end');
  },
  // Незаметно меняет позицию background-image на ближайшее к нулю число
  resetSliderBackground() {
    this.currentPositionX = Math.abs(this.currentPositionX) % this.spriteImageWidthPx || 0;
    this.currentPositionX *= this.positionMultiplier;
    this.getUI('slider')
      .removeClass('roulette-slider-animate')
      .css('background-position', `${this.currentPositionX}px`);
  },
  template,
});
