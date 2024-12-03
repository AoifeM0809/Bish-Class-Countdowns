const timers = [
    { start: "08:00", end: "08:40", elementId: "time1" },
    { start: "08:40", end: "09:38", elementId: "time2" },
    { start: "09:38", end: "10:36", elementId: "time3" },
    { start: "10:36", end: "10:51", elementId: "time4" },
    { start: "10:51", end: "11:49", elementId: "time5" },
    { start: "11:49", end: "12:47", elementId: "time6" },
    { start: "12:47", end: "13:47", elementId: "time7" },
    { start: "13:47", end: "14:45", elementId: "time8" },
    { start: "14:45", end: "15:43", elementId: "time9" }
];

// Adjust for daylight savings if applicable
function getLocalTime(hour, minute) {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    return date.getTime();
}

function updateCountdown() {
    const now = new Date().getTime();

    timers.forEach(timer => {
        const start = timer.start.split(":");
        const end = timer.end.split(":");
        const startTime = getLocalTime(parseInt(start[0]), parseInt(start[1]));
        const endTime = getLocalTime(parseInt(end[0]), parseInt(end[1]));

        let countdown;
        if (now < startTime) {
            countdown = `Starts in ${formatTime(startTime - now)}`;
        } else if (now >= startTime && now < endTime) {
            countdown = `Ends in ${formatTime(endTime - now)}`;
        } else {
            countdown = "Finished";
        }

        document.getElementById(timer.elementId).innerText = countdown;
    });
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
}

// Update every second
setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();
