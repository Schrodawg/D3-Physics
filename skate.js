class SkateScene extends Phaser.Scene {

    init(data) {
        this.time = data.time || [];
        this.actualTime = data.actualTime || 0;
        console.log(this.time)
        
    }

    constructor(key) {
        super(key);
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

    }

    recordTime(levelTime) {
        this.time.push(levelTime);
        this.actualTime = 0;
        this.actualTime = this.time[0];
        this.time.push(this.actualTime);
        console.log('ActualTime: ', this.actualTime);
    }

    gotoScene(key) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start(key)
            })
        this.scene.start(key, { time: this.actualTime });
        };
}