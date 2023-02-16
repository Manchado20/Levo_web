export class TimerSound
{
    private sound: any;

    constructor() {
        this.sound = new Audio();
        this.sound.src = '../../../assets/sounds/timer.wav'
    }

    play() {
        this.sound.load();
        this.sound.play();
    }

    pause() {
        this.sound.pause();
    }

    destroy() {
        this.sound.pause();
        this.sound = null;
    }
}
