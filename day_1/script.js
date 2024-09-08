window.addEventListener("DOMContentLoaded", () => {
    const keyboard = document.getElementById("keyboard");
    const canvas = document.querySelector("#waves canvas");
    const ctx = canvas.getContext("2d");
  
    let audioCtx; // Declare audioCtx without initializing
    let analyser;
    let bufferLength;
    let dataArray;
  
    const keys = [
      { name: "A", code: 65, sound: "Bass", audio: null },
      { name: "S", code: 83, sound: "Crash", audio: null },
      { name: "D", code: 68, sound: "Kick", audio: null },
      { name: "F", code: 70, sound: "Minor", audio: null },
      { name: "G", code: 71, sound: "Hat", audio: null },
      { name: "H", code: 72, sound: "Phonk", audio: null },
      { name: "J", code: 74, sound: "Synth", audio: null },
    ];
  
    keys.forEach((key) => {
      const element = document.createElement("div");
      element.setAttribute("data-key", key.code);
      element.setAttribute("title", `Press ${key.name}`);
      element.classList.add("key");
  
      element.addEventListener("transitionend", remove_active);
  
      const text = document.createElement("p");
      text.textContent = key.name;
  
      const span = document.createElement("span");
      span.textContent = key.sound.toUpperCase();
  
      element.append(text);
      element.append(span);
      keyboard.append(element);
  
      // Attach audio to the key
      key.audio = document.querySelector(`audio[data-key="${key.code}"]`);
    });
  
    document.addEventListener("keydown", handle_keydown);
  
    function handle_keydown(e) {
      const key = keys.find(k => k.code === e.keyCode);
      if (!key || !key.audio) return;
  
      // Initialize AudioContext after user gesture
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048; // Size of the FFT (Fast Fourier Transform)
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
  
        // Connect audio elements to the analyser and the audio context
        keys.forEach((key) => {
          const source = audioCtx.createMediaElementSource(key.audio);
          source.connect(analyser);
          source.connect(audioCtx.destination);
        });
      }
  
      if (audioCtx.state === 'suspended') {
        audioCtx.resume(); // Resume AudioContext on user interaction
      }
  
      key.audio.currentTime = 0;
      key.audio.play();
      document.querySelector(`.key[data-key="${e.keyCode}"]`).classList.add("playing");
  
      drawWaves(); // Start drawing the waves
    }
  
    function drawWaves() {
      if (!audioCtx || audioCtx.state !== 'running') return;
  
      requestAnimationFrame(drawWaves);
      analyser.getByteTimeDomainData(dataArray);
  
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#2563eb"; // Color for the wave
      ctx.beginPath();
  
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
  
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
  
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
  
        x += sliceWidth;
      }
  
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }
  
    function remove_active(e) {
      e.target.classList.remove("playing");
    }
  });