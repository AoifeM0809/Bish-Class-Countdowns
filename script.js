const timers = [
    { id: "circle1", duration: 2400, label: "time1" }, // 40 minutes
    { id: "circle2", duration: 3480, label: "time2" }, // 58 minutes
    // Add more timers as needed
];

let currentTimerIndex = 0;

function startSequentialCountdown() {
    if (currentTimerIndex >= timers.length) return; // End if all timers are done

    const { id, duration, label } = timers[currentTimerIndex];
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2 - 5;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let remainingTime = duration;

    function drawCircle() {
        const progress = remainingTime / duration;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ccc"; // Background color
        ctx.lineWidth = 5;
        ctx.stroke();

        // Draw progress circle
        ctx.beginPath();
        ctx.arc(
            centerX,
            centerY,
            radius,
            -0.5 * Math.PI, // Start from the top
            (2 * Math.PI * progress) - 0.5 * Math.PI
        );
        ctx.strokeStyle = "#4caf50"; // Green progress color
        ctx.lineWidth = 5;
        ctx.stroke();

        // Update the text label
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        document.getElementById(label).innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        remainingTime--;

        if (remainingTime >= 0) {
            requestAnimationFrame(drawCircle); // Redraw every second
        } else {
            currentTimerIndex++; // Move to the next timer
            startSequentialCountdown(); // Start the next timer
        }
    }

    drawCircle(); // Start drawing
}

// Start the sequential countdown
startSequentialCountdown();
