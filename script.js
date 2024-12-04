const schedule = [
    { id: "timer1", start: "08:00", end: "08:40", label: "circle1" },
    { id: "timer2", start: "08:40", end: "09:38", label: "circle2" },
    { id: "timer3", start: "09:38", end: "10:36", label: "circle3" },
    { id: "timer4", start: "10:36", end: "10:51", label: "circle4" },
    { id: "timer5", start: "10:51", end: "11:49", label: "circle5" },
    { id: "timer6", start: "11:49", end: "12:47", label: "circle6" },
    { id: "timer7", start: "12:47", end: "13:47", label: "circle7" },
    { id: "timer8", start: "13:47", end: "14:45", label: "circle8" },
    { id: "timer9", start: "14:45", end: "15:43", label: "circle9" }
];

let currentTimerIndex = 0;

function startTimers() {
    // Loop through the schedule array
    schedule.forEach(({ id, start, end, label }, index) => {
        const timerElement = document.getElementById(id);
        const circleElement = document.getElementById(label);

        function updateTimer() {
            const now = new Date();
            const [startHour, startMinute] = start.split(":").map(Number);
            const [endHour, endMinute] = end.split(":").map(Number);

            const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
            const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);

            if (now >= startTime && now <= endTime) {
                // Calculate elapsed time in milliseconds
                const elapsedMs = now - startTime;
                const totalDuration = endTime - startTime; // Total duration of the class period
                const elapsedTimeRatio = elapsedMs / totalDuration; // Fraction of time elapsed

                // Calculate remaining time in minutes and seconds
                const remainingMs = endTime - now;
                const remainingMinutes = Math.floor(remainingMs / 1000 / 60); // Minutes left
                const remainingSeconds = Math.floor((remainingMs / 1000) % 60); // Seconds left

                // Update text countdown
                timerElement.querySelector(".time").textContent = `${remainingMinutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;

                // Update the circular timer (Green growing based on elapsed time)
                const ctx = circleElement.getContext("2d");
                const radius = circleElement.width / 2 - 5;
                const centerX = circleElement.width / 2;
                const centerY = circleElement.height / 2;

                // Calculate the angle to draw (based on elapsed time)
                const angle = 2 * Math.PI * elapsedTimeRatio;

                ctx.clearRect(0, 0, circleElement.width, circleElement.height); // Clear previous drawings

                // Draw the background circle
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = "#ccc"; // Light gray for background
                ctx.lineWidth = 5;
                ctx.stroke();

                // Draw the progress circle (Green expanding based on elapsed time)
                ctx.beginPath();
                ctx.arc(
                    centerX,
                    centerY,
                    radius,
                    -0.5 * Math.PI, // Start at the top (0 degrees)
                    angle - 0.5 * Math.PI // Expanding green based on elapsed time
                );
                ctx.strokeStyle = "#4caf50"; // Green color for progress
                ctx.lineWidth = 10;
                ctx.stroke();

                // If less than 1 minute left, flash text color for fun
                if (remainingMs <= 60000) {
                    timerElement.style.color = timerElement.style.color === "red" ? "black" : "red";
                }

                // Call updateTimer again after a second (real-time sync)
                setTimeout(updateTimer, 1000); // Update every second
            } else if (now > endTime) {
                // Timer is over, move to the next timer
                if (currentTimerIndex < schedule.length - 1) {
                    // Move to the next timer
                    currentTimerIndex++;

                    // Reset the green circle for the new timer
                    startTimers(); // This starts the next timer automatically
                }

                // Timer finished, stop the countdown and display "Time's Up!"
                timerElement.querySelector(".time").textContent = "Time's Up!";
                timerElement.style.color = "blue"; // Fun end state
            }
        }

        updateTimer(); // Start the timer for the current class
    });
}

// Start the timers on page load
startTimers();
