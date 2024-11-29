document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer");
    const timerContainer = document.getElementById("timer-container");
    const messageContainer = document.getElementById("message-container");
    const content = document.getElementById("content");
  
    const images = [
      "https://via.placeholder.com/300x200?text=Image+1",
      "https://via.placeholder.com/300x200?text=Image+2",
      "https://via.placeholder.com/300x200?text=Image+3",
      "https://via.placeholder.com/300x200?text=Image+4",
      "https://via.placeholder.com/300x200?text=Image+5"
    ];
  
    const videos = [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://www.w3schools.com/html/movie.mp4",
      "https://www.w3schools.com/html/horse.mp4"
    ];
  
    const postIts = [
      "Keep shining, Virginia! 🌟",
      "You are one of a kind! 😄",
      "Laugh often, love much, live well! 💖",
      "No one can stop you now! 🙌",
      "Always stay awesome! 💪"
    ];
  
    const messages = [
      { type: "text", content: "You are amazing, Virginia! 🌟" },
      { type: "text", content: "Don't forget to keep shining, no matter what! 💪" },
      { type: "image", content: images[Math.floor(Math.random() * images.length)] },
      { type: "video", content: videos[Math.floor(Math.random() * videos.length)] },
      { type: "post-it", content: postIts[Math.floor(Math.random() * postIts.length)] }
    ];
  
    let countdown = 10;
    const positions = [
      { top: '5%', left: '50%' },  // Top Center
      { top: '85%', left: '5%' },  // Bottom Left
      { top: '50%', left: '5%' },  // Center Left
      { top: '5%', left: '90%' },  // Top Right
      { top: '50%', left: '90%' },  // Center Right
      { top: '85%', left: '90%' },  // Bottom Right
    ];
  
    let shiftOffset = 0;
  
    // Countdown logic
    const timerInterval = setInterval(() => {
      countdown--;
      timerElement.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(timerInterval);
        timerContainer.classList.add("hidden");
        messageContainer.classList.remove("hidden");
        displayMessages();
      }
    }, 1000);
  
    function displayMessages() {
      let index = 0;
      const totalMessages = messages.length;
  
      const interval = setInterval(() => {
        const message = messages[index];
        const messageElement = document.createElement("div");
        messageElement.className = "message";
  
        // Get position for the current message
        const position = positions[index % positions.length];
  
        // Shift position for the repeat cycle
        messageElement.style.top = `${parseInt(position.top) + shiftOffset}%`;
        messageElement.style.left = `${parseInt(position.left) + shiftOffset}%`;
  
        if (message.type === "text") {
          messageElement.textContent = message.content;
        } else if (message.type === "image") {
          const img = document.createElement("img");
          img.src = message.content;
          img.alt = "Birthday Photo";
          img.style.maxWidth = "100%";  // Ensure images don't overflow the container
          messageElement.appendChild(img);
        } else if (message.type === "video") {
          const video = document.createElement("video");
          video.src = message.content;
          video.controls = true;
          video.style.maxWidth = "100%";  // Ensure videos don't overflow the container
          messageElement.appendChild(video);
        } else if (message.type === "post-it") {
          const postIt = document.createElement("div");
          postIt.className = "post-it";
          postIt.textContent = message.content;
          messageElement.appendChild(postIt);
        }
  
        content.appendChild(messageElement);
  
        // Update index and shift offset after full sequence
        index++;
        if (index >= totalMessages) {
          clearInterval(interval);
          shiftOffset += 10; // Shift the positions by 10px for the next round
          if (shiftOffset >= 30) {
            shiftOffset = 0; // Reset after a few shifts to avoid overflow
          }
          showFinalMessage();
        }
      }, 1000); // Display each message every second
    }
  
    function showFinalMessage() {
      const finalMessage = document.createElement("h1");
      finalMessage.className = "final-message";
      finalMessage.textContent = "🎉 Happy Birthday, Virginia! 🎉";
      content.appendChild(finalMessage);
    }
  });
  