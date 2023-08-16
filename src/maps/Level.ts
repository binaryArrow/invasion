import Image = Phaser.GameObjects.Image;
import {Scene} from "phaser";
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;

export interface Level {
    scene: Scene
    background: Image
    platform: StaticGroup
}