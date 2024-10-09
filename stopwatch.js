let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds')
};

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

function startTimer() {
    isRunning = true;
    startStopBtn.textContent = 'Stop';
    startStopBtn.style.backgroundColor = '#dc3545';
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
}

function stopTimer() {
    isRunning = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    // Note: Not resetting the display here to keep the last time shown
}

function updateDisplay() {
    const time = Date.now() - startTime;
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    display.hours.textContent = hours.toString().padStart(2, '0');
    display.minutes.textContent = minutes.toString().padStart(2, '0');
    display.seconds.textContent = seconds.toString().padStart(2, '0');
    display.milliseconds.textContent = milliseconds.toString().padStart(2, '0');
}

function addLap() {
    const li = document.createElement('li');
    li.textContent = `${display.hours.textContent}:${display.minutes.textContent}:${display.seconds.textContent}.${display.milliseconds.textContent}`;
    lapsList.appendChild(li);
}
