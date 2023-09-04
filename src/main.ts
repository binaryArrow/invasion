import './styles.css'
import {Game} from 'phaser';
import {GameScene} from "./scenes/GameScene.ts";
import {GameOverScene} from "./scenes/GameOverScene.ts";
import {WinScreen} from "./scenes/WinScreen.ts";

const config = {
    type: Phaser.AUTO,
    backgroundColor:0xbababa,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 50 },
            //debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-canvas',
        width: 1600,
        height: 800,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        GameScene,
        GameOverScene,
        WinScreen
    ]
}

new Game(config);
