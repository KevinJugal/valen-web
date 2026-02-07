const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popupOverlay = document.getElementById("popupOverlay");
const popupTemplate = document.getElementById("popupTemplate");
const popupMessage = document.getElementById("popupMessage");
const popupClose = document.getElementById("popupClose");

let step = 0;
let isPopupOpen = false;
let confettiInterval = null; // For continuous effect

const questions = [
  "Do you like surprises? 😊",
  "Do you enjoy spending time with me? 💕",
  "Do I make you smile at least a little bit? 😏",
  "Do you already have a Valentine this year? 💘",
  "Would you like to be my Valentine? 🥹"
];

// Show popup with message
function showPopup(text) {
  if (isPopupOpen) return;
  isPopupOpen = true;
  
  popupMessage.textContent = text;
  popupOverlay.classList.add("active");
  popupTemplate.classList.remove("hidden");
  popupTemplate.classList.add("active");
}

// Close popup
function closePopup() {
  isPopupOpen = false;
  popupOverlay.classList.remove("active");
  popupTemplate.classList.remove("active");
  setTimeout(() => popupTemplate.classList.add("hidden"), 400);
}

// CRACKING SCREEN - Only for second-to-last YES
function crackingScreen() {
  for (let i = 0; i < 25; i++) {
    const crack = document.createElement("div");
    crack.style.cssText = `
      position: fixed; width: ${3 + Math.random() * 5}px; height: ${3 + Math.random() * 5}px;
      background: linear-gradient(45deg, rgba(255,0,0,0.9), rgba(255,100,100,0.7));
      border-radius: 50%; left: 50%; top: 50%; pointer-events: none; z-index: 1000;
    `;
    document.body.appendChild(crack);
    
    const angle = (Math.random() * Math.PI * 2);
    const distance = 40 + i * 10;
    
    setTimeout(() => {
      crack.animate([
        { transform: `translate(-50%, -50%) scale(1.2)`, opacity: 1, boxShadow: "0 0 20px rgba(255,0,0,0.8)" },
        { 
          transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
          opacity: 0, boxShadow: "0 0 0px transparent"
        }
      ], { 
        duration: 1000 + i * 40, 
        easing: "ease-out",
        delay: i * 15 
      }).onfinish = () => crack.remove();
    }, i * 10);
  }
  
  // Dramatic screen shake
  document.body.style.animation = "shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2";
  setTimeout(() => document.body.style.animation = "", 1200);
}

// CONTINUOUS CONFETTI + HEARTS - Only for final YES
function continuousCelebration() {
  // Start endless celebration
  confettiInterval = setInterval(() => {
    // Hearts burst from center
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = ["💖", "💕", "💗", "💝", "🌸"][Math.floor(Math.random() * 5)];
      heart.style.cssText = `
        position: fixed; font-size: 1.8rem; left: 50%; top: 50%;
        pointer-events: none; z-index: 999;
      `;
      document.body.appendChild(heart);
      
      const angle = (i / 8) * Math.PI * 2;
      heart.animate([
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        { 
          transform: `translate(-50%, -50%) translate(${Math.cos(angle) * 180}px, ${Math.sin(angle) * 180 - 120}px) scale(0.7)`,
          opacity: 0 
        }
      ], { duration: 2000, easing: "ease-out" }).onfinish = () => heart.remove();
    }
    
    // Continuous confetti rain
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: fixed; width: 12px; height: 12px; border-radius: 3px;
        background: ${['#ff6b9d', '#ffd166', '#06d6a0', '#118ab2', '#ff9ff3', '#feca57'][Math.floor(Math.random() * 6)]};
        left: ${Math.random() * 100}vw; top: -20px; pointer-events: none; z-index: 999;
      `;
      document.body.appendChild(confetti);
      
      confetti.animate([
        { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${(Math.random() - 0.5) * 300}px, ${window.innerHeight + 60}px) rotate(1080deg)`,
          opacity: 0
        }
      ], { duration: 4000, easing: "ease-out" }).onfinish = () => confetti.remove();
    }
  }, 800); // New burst every 800ms
  
  // Stop after 8 seconds of continuous celebration
  setTimeout(() => {
    if (confettiInterval) {
      clearInterval(confettiInterval);
      confettiInterval = null;
    }
  }, 8000);
}

// Shake animation (add to head if not exists)
if (!document.querySelector('style[data-shake]')) {
  const style = document.createElement('style');
  style.setAttribute('data-shake', 'true');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
      20%, 40%, 60%, 80% { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(style);
}

// BULLETPROOF No button
function makeRunAway(button, event) {
  const safePositions = [
    { x: "20%", y: "20%" }, { x: "70%", y: "20%" }, { x: "20%", y: "60%" },
    { x: "70%", y: "60%" }, { x: "40%", y: "10%" }, { x: "60%", y: "10%" },
    { x: "40%", y: "80%" }, { x: "60%", y: "80%" }, { x: "10%", y: "40%" },
    { x: "85%", y: "40%" }, { x: "30%", y: "30%" }, { x: "65%", y: "65%" }
  ];
  
  const pos = safePositions[Math.floor(Math.random() * safePositions.length)];
  
  button.style.position = "fixed";
  button.style.left = pos.x;
  button.style.top = pos.y;
  button.style.zIndex = "9999";
  button.style.transform = "none";
}

// Event listeners
popupClose.addEventListener("click", closePopup);
popupOverlay.addEventListener("click", closePopup);

function setQuestion(text) {
  questionEl.textContent = text;
}

setQuestion(questions[0]);

// YES BUTTON LOGIC
yesBtn.addEventListener("click", () => {
  if (isPopupOpen) return;

  // Early questions - no special effects
  if (step < questions.length - 2) {
    step++;
    setQuestion(questions[step]);
    return;
  }

  // SECOND-TO-LAST: "Do you already have a Valentine?" → CRACKING SCREEN
  if (step === questions.length - 2) {
    crackingScreen();
    showPopup("Aww, then someone is very lucky already. 💔");
    return;
  }

  // LAST QUESTION: "Would you like to be my Valentine?" → CONTINUOUS CELEBRATION
  if (step === questions.length - 1) {
    continuousCelebration();
    showPopup("Yay! You just made my day! 💖\nSee you on Valentine's Day! 🥰");
  }
});

// NO BUTTON LOGIC
noBtn.addEventListener("click", (e) => {
  if (isPopupOpen) return;

  if (step < questions.length - 2) {
    showPopup("Okay, honest answer. I still like you. 😅");
    return;
  }

  if (step === questions.length - 2) {
    showPopup("So maybe I have a chance then… 🤭");
    setTimeout(() => {
      closePopup();
      step = questions.length - 1;
      setQuestion(questions[step]);
    }, 1500);
    return;
  }

  if (step === questions.length - 1) {
    makeRunAway(noBtn, e);
  }
});

noBtn.addEventListener("mouseover", (e) => {
  if (step === questions.length - 1 && !isPopupOpen) {
    makeRunAway(noBtn, e);
  }
});
