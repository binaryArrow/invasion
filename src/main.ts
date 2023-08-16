import './styles.css'
import {Game} from 'phaser';
import {GameScene} from "./scenes/GameScene.ts";

const config = {
    type: Phaser.AUTO,
    parent: 'game-canvas',
    width: window.innerWidth,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 50 },
            //debug: true
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