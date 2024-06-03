import { UI } from "./ui.js";

export class Timer {
    constructor(duration, timeoutCallback) {
        this.duration = duration;
        this.timeoutCallback = timeoutCallback;
        this.timeId = null;
        this.circularProgressElement = document.querySelector(".circular-progress")
    }

    start() {
        let timeLeft = this.duration;
        UI.displayTimer(this.formatTime(timeLeft));

        if (this.timeId) clearInterval(this.timeId);

        this.timeId = setInterval(() => {
            timeLeft--;

            UI.displayTimer(this.formatTime(timeLeft));
            UI.circularProgress(this.circularProgressElement, timeLeft, this.duration)    
            if (timeLeft <= 0) {
                clearInterval(this.timeId);
                this.timeoutCallback();
            }

        }, 1000);
    }

    stop() {
        clearInterval(this.timeId);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
}