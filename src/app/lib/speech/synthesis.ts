export class SpeechSynthesis
{
    private lang: string;
    private pitch: number;
    private rate: number;
    private text: string;
    private voice: any;
    private volume: number;
    private utterance: SpeechSynthesisUtterance;

    constructor() {
        this.utterance = new SpeechSynthesisUtterance();
        this.utterance.lang = 'en-US';
        this.utterance.pitch = 1;
        this.utterance.rate = 0.8;
        this.utterance.volume = 1;
    }

    speak(text: string) {
        if ('speechSynthesis' in window) {
            this.utterance.text = text;
            speechSynthesis.speak(this.utterance);
        }
    }
}
