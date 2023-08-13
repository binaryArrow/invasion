import Image = Phaser.GameObjects.Image;
import {Scene} from "phaser";

export interface Level {
    scene: Scene
    background: Image
}