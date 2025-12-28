const video = document.getElementById('video');
const resolutionSpan = document.getElementById('resolution');
const fpsSpan = document.getElementById('fps');

let lastTime = 0;
let frameCount = 0;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;

            // Calcular resolución cuando el video esté listo
            video.onloadedmetadata = function() {
                resolutionSpan.textContent = `Resolución: ${video.videoWidth}x${video.videoHeight}`;
            };

            // Calcular FPS
            function calculateFPS() {
                const now = performance.now();
                frameCount++;
                if (now - lastTime >= 1000) {
                    fpsSpan.textContent = `FPS: ${frameCount}`;
                    frameCount = 0;
                    lastTime = now;
                }
                requestAnimationFrame(calculateFPS);
            }
            requestAnimationFrame(calculateFPS);
        })
        .catch(function(error) {
            console.log("Error accessing camera: ", error);
            resolutionSpan.textContent = "Resolución: Error";
            fpsSpan.textContent = "FPS: Error";
        });
}