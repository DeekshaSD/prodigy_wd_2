// script.js
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        startPauseButton.textContent = 'Start';
    } else {
        interval = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateTimeDisplay();
    startPauseButton.textContent = 'Start';
    isRunning = false;
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
});

function updateTime() {
    milliseconds += 1;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    updateTimeDisplay();
}

function updateTimeDisplay() {
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
