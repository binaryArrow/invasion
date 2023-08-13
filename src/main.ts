import './styles.css'
import {Game} from 'phaser';
import {GameScene} from "./scenes/GameScene.ts";

const config = {
    type: Phaser.AUTO,
    parent: 'game-canvas',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 20 },
            // debug: true
        }
    },
    backgroundColor:0xbababa,
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [
        GameScene
    ]
}

new Game(config);