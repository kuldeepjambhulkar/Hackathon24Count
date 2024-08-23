document.getElementById('startButton').addEventListener('click', function() {
    const countdownContainer = document.getElementById('countdownContainer');
    const messageContainer = document.getElementById('messageContainer');
    const startButton = document.getElementById('startButton');
    const hackathonContainer = document.getElementById('hackathonContainer');
    hackathonContainer.style.visibility = 'hidden'; // Hide hackathon container
    const countdown = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    
    startButton.style.display = 'none'; // Hide start button
    // messageContainer.textContent = 'Start Counting'; // Display message

    let index = 0;
    let interval = setInterval(() => {
        if (index < countdown.length) {
            countdownContainer.textContent = countdown[index];
            index++;
        } else {
            clearInterval(interval);
            countdownContainer.textContent = '';
            messageContainer.textContent = 'Hack Time Begins... Now!';
            startConfetti();
            
            // Show message for 2 seconds before starting the 24-hour countdown
            setTimeout(() => {
                messageContainer.textContent = '';
                hackathonContainer.style.visibility = 'visible'; // Show hackathon container

                startCountdown(); // Start 24-hour countdown
            }, 1000);
        }
    }, 1000); // 1 second delay
});

function startCountdown() {
    let countdownTime = 24 * 60 * 60; // 24 hours in seconds
    const countdownContainer = document.getElementById('countdownContainer');

    setInterval(() => {
        if (countdownTime > 0) {
            countdownTime--;
            let hours = Math.floor(countdownTime / 3600);
            let minutes = Math.floor((countdownTime % 3600) / 60);
            let seconds = countdownTime % 60;
            countdownContainer.innerHTML = `
                <div class="time-unit">
                    <div>${hours.toString().padStart(2, '0')}</div>
                    <div>Hours</div>
                </div>
                <div class="time-unit">
                    <div>${minutes.toString().padStart(2, '0')}</div>
                    <div>Minutes</div>
                </div>
                <div class="time-unit">
                    <div>${seconds.toString().padStart(2, '0')}</div>
                    <div>Seconds</div>
                </div>
            `;
        } else {
            countdownContainer.innerHTML = `
                <div class="time-unit">
                    <div>00</div>
                    <div>Hours</div>
                </div>
                <div class="time-unit">
                    <div>00</div>
                    <div>Minutes</div>
                </div>
                <div class="time-unit">
                    <div>00</div>
                    <div>Seconds</div>
                </div>
            `;
        }
    }, 1000);
}

function startConfetti() {
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiInstance = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    // Firework style confetti
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 720, ticks: 60, zIndex: 0 }; // Increased spread

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 100 * (timeLeft / duration); // Increased particle count
        // since particles fall down, start a bit higher than random
        confettiInstance({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0, 1), y: randomInRange(0, 1) } // Random position on the screen
        });
        confettiInstance({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0, 1), y: randomInRange(0, 1) } // Random position on the screen
        });
    }, 250);

    // Additional confetti style
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            confettiInstance({
                particleCount: randomInRange(300, 1000), // Random particle count between 300 and 1000
                spread: randomInRange(200, 800), // Random spread between 200 and 800
                duration: randomInRange(3000, 7000), // Random duration between 3000 and 7000 milliseconds (3 to 7 seconds)
                origin: { x: randomInRange(0, 1), y: randomInRange(0, 1) } // Random position on the screen
            });
        }, i * 1000); // Adjust the interval between bursts (2 seconds in this case)
    }
}