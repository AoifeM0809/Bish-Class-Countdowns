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

function startTimers() {
    schedule.forEach(({ id, start, end, label }) => {
        const timerElement = document.getElementById(id);
        const circleElement = document.getElementById(label);

        function updateTimer() {
            const now = new Date();
            const [startHour, startMinute] = start.split(":").map(Number);
            const [endHour, endMinute] = end.split(":").map(Number);
            const startTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                startHour,
                startMinute
            );
            const endTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                endHour,
                endMinute
            );

            if (now >= startTime && now <= endTime) {
                // Calculate remaining time
                const remainingMs = endTime - now;
                const minutes = Math.floor((remainingMs / 1000 / 60) % 60);
                const seconds = Math.floor((remainingMs / 1000) % 60);

                // Update text countdown
                timerElement.querySelector(".time").textContent =
                    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

                // Update circular timer
                const ctx = circleElement.getContext("2d");
                const radius = circleElement.width / 2 - 5;
                const centerX = circleElement.width / 2;
                const centerY = circleElement.height / 2;
                const progress = remainingMs / (endTime - startTime);

                ctx.clearRect(0, 0, circleElement.width, circleElement.height);

                // Draw background circle
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = "#ccc";
                ctx.lineWidth = 5;
                ctx.stroke();

                // Draw progress circle
                ctx.beginPath();
                ctx.arc(
                    centerX,
                    centerY,
                    radius,
                    -0.5 * Math.PI,
                    2 * Math.PI * progress - 0.5 * Math.PI
                );
                ctx.strokeStyle = "#4caf50";
                ctx.lineWidth = 5;
                ctx.stroke();

                // Flash fun animation when time is below 1 minute
                if (remainingMs <= 60000) {
                    timerElement.style.color = timerElement.style.color === "red" ? "black" : "red";
                }

                requestAnimationFrame(updateTimer);
            } else if (now > endTime) {
                // Timer is over
                timerElement.querySelector(".time").textContent = "Time's Up!";
                timerElement.style.color = "blue"; // Fun end state
            }
        }

        updateTimer();
    });
}

// Start the timers
startTimers();
