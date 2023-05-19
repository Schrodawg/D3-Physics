///SCENE 0
class initial extends Phaser.Scene {
    constructor() {
        super('');
    }
    preload(){}
    create() {}
    update(){}
    }

window.onload = function(){
    let config = {
        type: Phaser.WEBGL,
        autoCenter: true,
        width: 800,
        height: 600,
        scene: [],
        audio: {
            disableWebAudio: true
        }
    }
    let game = new Phaser.Game(config);
}