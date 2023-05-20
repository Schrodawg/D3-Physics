///SCENE 0
class initial extends Phaser.Scene {
    constructor() {
        super('intial');
    }
    preload(){}
    create() {
        //Canvas size
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        //
        const startButton = this.add.text(this.w * .45, this.h * .45, 'Click Here?', { fill: '#ffffff' })
          .setInteractive()
          .on('pointerdown', () => {
            this.scene.start('intro')
        })   
      }
    update(){}
    }

///SCENE 1
class intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('board', 'skateboard.png');
    }
    create() {
        //Canvas size
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        //Title text
        let menuText = this.add.text(
            this.w * .37, this.h * .40,
            "SK8 D8",
            {
                font: "italic 100px Pacifico",
                color: "#ffffff",
            }
        );
        //Skateboard
        let board = this.add.image(-200, this.h * .28, 'board').setScale(.3);
        //Border
        let border = this.add.graphics();
        border.fillStyle(0xffffff);
        border.fillRect(0, 220, this.w, 10);
        border.fillRect(0, 400, this.w, 10);
        //Animation
        this.tweens.add({
            targets: board,
            x: this.w * .5,
            delay: 1500,
            duration: 3000,
            ease: 'Quad.easeOut',
        })
        this.tweens.add({
            targets: board,
            y: this.h * .23,
            angle: -45,
            yoyo: true,
            flipX: true,
            duration: 500, 
            delay: 4300,
            ease: 'linear',
        });
        this.tweens.add({
            targets: board,
            x: this.w * 1.2,
            delay: 4900,
            duration: 3000,
            ease: 'Quad.easeIn',
        })  
        /// Fade to black
        setTimeout(() => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level1')
            })
        }, 8000);
    }
    update(){}
    }

///Level 1
class level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }
    preload(){}
    create() {
        //Canvas size
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        //
        const startButton = this.add.text(this.w * .45, this.h * .45, 'Click Here?', { fill: '#ffffff' })
          .setInteractive()
          .on('pointerdown', () => {
            this.scene.start('intro')
        })   
      }
    update(){}
    }





window.onload = function(){
    let config = {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        backgroundColor: 0x000000,
        type: Phaser.WEBGL,
        width: 1920*.6,
        height: 1080*.6,
        scene: [intro],
    }
    let game = new Phaser.Game(config);
}