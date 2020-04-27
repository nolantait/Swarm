// Import our modules.
import './components';
import './scenes';
import './systems';
import Game from './game';

// Initialise our application.
Crafty.init(Game.width(), Game.height(), document.getElementById('app'));

// Enter the loading scene.
Crafty.scene('loading');
