import $ from 'jquery';
import Application from './Application';

const app = new Application();
$(() => app.start());

export default app;
