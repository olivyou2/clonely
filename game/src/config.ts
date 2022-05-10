import { Bootloader } from './Bootloader';
import { MainScene } from './scenes/MainScene';

export const CONFIG: any = {
    title: 'clonely',
    version: '0.0.1',
    type: Phaser.AUTO,
    backgroundColor: '#22a6b3',
    scale: {
        parent: 'phaser_container',
        width: 1280,
        height: 720,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 500
            }
        }
    },
    scene: [
        Bootloader,
        MainScene
    ]
};
