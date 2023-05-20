///SCENE 0
class initial extends SkateScene {
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
class intro extends SkateScene {
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
        }, 9000);
    }
    update(){}
    }

///Level 1
class level1 extends SkateScene {
    constructor() {
        super('level1');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('board', 'skateboard.png');
        this.load.image('pipe', 'pipe.png');
        this.load.image('tunnel', 'tunnel.png');
    }
    create(time) {
        //Canvas size
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        //Pipes
        const platforms = this.physics.add.staticGroup();
        platforms.create(230, 200, 'pipe').setDisplaySize(400,10).refreshBody()
            .setSize(400, 10, true);
        platforms.create(550, 645, 'pipe').setDisplaySize(this.w,10).refreshBody()
            .setSize(this.w, 10, true);
        
        //Board
        this.board = this.physics.add.sprite(100, 0, 'board').setDisplaySize(600,250)
        .setSize(575, 250, true)
        //Tunnel    
        this.tunnel = this.physics.add.staticGroup();
        this.tunnel.create(100, 500, 'tunnel').setDisplaySize(600, 300)
            .setSize(200, 400)
        //Physics
        this.board.setBounce(0.2);
        this.board.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.board, platforms);
        this.physics.add.collider(
            this.board,
            this.tunnel, 
            (board, tunnel) =>
            {
                if (board.body.touching.left && tunnel.body.touching.right)
                {
                    let levelTime = this.game.getTime();
                    this.recordTime(levelTime)
                    this.gotoScene('level1Sum');
                }
            });
      }
    update() {
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.board.setVelocityX(-160);
        }
        else if (right.isDown)
        {
            this.board.setVelocityX(160);
        }
        else
        {
            this.board.setVelocityX(0);
        }

        if (up.isDown && this.board.body.touching.down)
        {
            this.board.setVelocityY(-330);
        }
        
    }
}

///Level 1 Summary
class level1Sum extends SkateScene {
    constructor() {
        super('level1Sum');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('board', 'skateboard.png');
    }
    create() {
        this.sumText = this.add.text(
            300, 
            300,
            `YOU BEAT THAT IN: ${this.time * .001} seconds!`,
            {
                font: "italic 20px Pacifico",
                color: "#ffffff",
            }
        )
    }
}


window.onload = function(){
    let config = {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        backgroundColor: 0x000000,
        type: Phaser.WEBGL,
        width: 1920*.6,
        height: 1080*.6,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: true
            }
        },
        scene: [level1, level1Sum],
    }
    let game = new Phaser.Game(config);
}