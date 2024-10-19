document.getElementById('set-timer').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value || '0');
    const minutes = parseInt(document.getElementById('minutes').value || '0');
    const seconds = parseInt(document.getElementById('seconds').value || '0');

    // Validate if the input time is correct
    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please enter a valid time.");
        return;
    }

    const totalTime = (hours * 3600) + (minutes * 60) + seconds;
    createTimer(totalTime);
});

let timers = [];

function createTimer(duration) {
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-display');
    
    let timeLeft = duration;
    
    const timeDisplay = document.createElement('p');
    timeDisplay.textContent = formatTime(timeLeft);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => {
        clearInterval(interval);
        timerContainer.remove();
    });
    
    timerContainer.appendChild(timeDisplay);
    timerContainer.appendChild(deleteButton);
    
    document.getElementById('active-timers').appendChild(timerContainer);
    
    const interval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            timeDisplay.textContent = "Timer is up!";
            timerContainer.style.backgroundColor = "yellow";
            const alarm = new Audio('alarm.mp3');
            alarm.play();
        }
    }, 1000);
    
    timers.push(interval);
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
}
