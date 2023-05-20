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
            this.gotoScene('intro')
        })   
      }
    update(){}
    }

///Intro
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
                this.gotoScene('level1')
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
        platforms.create(200, 200, 'pipe').setDisplaySize(400,10).refreshBody()
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
            this.board.setVelocityY(-300);
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
            `HURRY! IT'S TAKEN YOU: ${this.time * .001} seconds TO GET HERE!`,
            {
                font: "italic 20px Pacifico",
                color: "#ffffff",
            }
        )
    // Fade to black TIMED
    setTimeout(() => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.gotoScene('level2')
        })
    }, 5000);
    }
}

///Level 2
class level2 extends SkateScene {
    constructor() {
        super('level2');
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
        platforms.create(1000, 510, 'pipe').setDisplaySize(400,10).refreshBody()
            .setSize(400, 10, true);
        platforms.create(500, 375, 'pipe').setDisplaySize(400,10).refreshBody()
            .setSize(400, 10, true);
        platforms.create(0, 275, 'pipe').setDisplaySize(400,10).refreshBody()
            .setSize(400, 10, true);
        platforms.create(750, 200, 'pipe').setDisplaySize(600,10).refreshBody()
            .setSize(600, 10, true);
        platforms.create(550, 645, 'pipe').setDisplaySize(this.w,10).refreshBody()
            .setSize(this.w, 10, true);
        
        //Board
        this.board = this.physics.add.sprite(100, 500, 'board').setDisplaySize(600,250)
        .setSize(575, 250, true)
        //Tunnel    
        this.tunnel = this.physics.add.staticGroup();
        this.tunnel.create(1200, 100, 'tunnel').setDisplaySize(600, 300)
            .setSize(500, 350)
            .setAngle(180);
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
                if (board.body.touching.right && tunnel.body.touching.left)
                {
                    let levelTime = this.game.getTime();
                    this.recordTime(levelTime)
                    this.gotoScene('level2Sum');
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
            this.board.setVelocityY(-300);
        }
        
    }
}

///Level 2 Summary
class level2Sum extends SkateScene {
    constructor() {
        super('level2Sum');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('board', 'skateboard.png');
    }
    create() {
        this.sumText = this.add.text(
            300, 
            300,
            `IT'S BEEN: ${this.time * .001} seconds! QUICKLY, GET GOING!`,
            {
                font: "italic 20px Pacifico",
                color: "#ffffff",
            }
        )
    // Fade to black TIMED
    setTimeout(() => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.gotoScene('level3')
        })
    }, 5000);
    }
}

///Level 3
class level3 extends SkateScene {
    constructor() {
        super('level3');
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
        platforms.create(200, 170, 'pipe').setDisplaySize(600,10).refreshBody()
            .setSize(600, 10, true);
        platforms.create(900, 170, 'pipe').setDisplaySize(400,10).refreshBody()
            .setSize(400, 10, true);
        platforms.create(550, 645, 'pipe').setDisplaySize(this.w,10).refreshBody()
            .setSize(this.w, 10, true);
        
        //Board
        this.board = this.physics.add.sprite(100, 50, 'board').setDisplaySize(600,250)
        .setSize(575, 250, true)
        //Tunnel    
        this.tunnel = this.physics.add.staticGroup();
        this.tunnel.create(625, 700, 'tunnel').setDisplaySize(600, 300)
            .setSize(400, 370)
            .setAngle(270);
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
                if (board.body.touching.down && tunnel.body.touching.up)
                {
                    let levelTime = this.game.getTime();
                    this.recordTime(levelTime)
                    this.gotoScene('level3Sum');
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
            this.board.setVelocityY(-300);
        }
        
    }
}

///Level 3 Summary
class level3Sum extends SkateScene {
    constructor() {
        super('level3Sum')
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('board', 'skateboard.png');
    }
    create() {
        this.sumText = this.add.text(
            300, 
            300,
            'DID YOU MAKE IT IN TIME??',
            {
                font: "italic 20px Pacifico",
                color: "#ffffff",
            }
        )
        // Fade to black TIMED
    setTimeout(() => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.gotoScene('fin')
        })
    }, 5000);
    }
}

///End
class fin extends SkateScene {
    constructor() {
        super('fin');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('board', 'skateboard.png');
    }
    create(time) {
        this.sumText = this.add.text(
            450, 
            300,
            `GREAT JOB, YOU MADE IT IN: ${this.game.getTime() * .001} seconds!`,
            {
                font: "italic 20px Pacifico",
                color: "#ffffff",
            }
        )
        let board = this.add.image(-200, 500, 'board').setScale(.3);
        //Animation
        this.tweens.add({
            targets: board,
            x: 600,
            delay: 1500,
            duration: 3000,
            ease: 'Quad.easeOut',
        })
        this.tweens.add({
            targets: board,
            angle: 360*10,
            flipX: true,
            duration: 3000, 
            delay: 4300,
            ease: 'linear',
        }); 
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
                debug: false
            }
        },
        scene: [initial, intro, level1, level1Sum, level2, level2Sum, level3, level3Sum, fin],
    }
    let game = new Phaser.Game(config);
}