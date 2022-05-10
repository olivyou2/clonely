/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

import { buildTargets } from '../constants';
import APIManager from '../network/APIManager';
import NetworkManager from '../network/NetworkManager';

export class MainScene extends Phaser.Scene {
  networkManager: NetworkManager;

  accessToken: string;

  playerObject: Phaser.GameObjects.Image;

  leftKeyObj:Phaser.Input.Keyboard.Key;

  rightKeyObj:Phaser.Input.Keyboard.Key;

  upKeyObj:Phaser.Input.Keyboard.Key;

  downKeyObj:Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: 'MainScene',
    });

    this.networkManager = new NetworkManager();

    const getReady = async () => {
      const newUserId = 'asdf';
      const passwordId = 'asdf';

      try {
        await APIManager.createUser(newUserId, passwordId);
      } catch {
        console.log('already exists account');
      }

      this.accessToken = await APIManager.loginUser(newUserId, passwordId);
    };

    getReady().then(async () => {
      await this.networkManager.connectRequest(this.accessToken);

      this.playerObject = this.add.image(this.scale.width / 2, this.scale.height / 2, 'phaser3_cli');
    });
  }

  update(time: number, delta: number): void {
    if (this.playerObject) {
      let moved = false;
      if (this.leftKeyObj.isDown) {
        this.playerObject.setX(this.playerObject.x - 10);
        moved = true;
      }
      if (this.rightKeyObj.isDown) {
        this.playerObject.setX(this.playerObject.x + 10);
        moved = true;
      }
      if (this.upKeyObj.isDown) {
        this.playerObject.setY(this.playerObject.y - 10);
        moved = true;
      }
      if (this.downKeyObj.isDown) {
        this.playerObject.setY(this.playerObject.y + 10);
        moved = true;
      }

      if (moved) {
        this.networkManager.move(this.playerObject.x, this.playerObject.y);
      }
    }
  }

  init() {
    this.leftKeyObj = this.input.keyboard.addKey('left');
    this.rightKeyObj = this.input.keyboard.addKey('right');
    this.upKeyObj = this.input.keyboard.addKey('up');
    this.downKeyObj = this.input.keyboard.addKey('down');
  }

  create(): void {
  }
}
