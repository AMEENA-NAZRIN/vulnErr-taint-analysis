// ================= FILE PREVIEW =================

function previewFile() {
  const fileInput = document.getElementById("file");
  const previewBox = document.getElementById("filePreview");

  if (!fileInput.files.length) {
    previewBox.textContent = "No file selected.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    previewBox.textContent = e.target.result.substring(0, 2000);
  };
  reader.readAsText(fileInput.files[0]);
}

// ================= THEME TOGGLE =================

// ================= THEME TOGGLE =================

function updateThemeIcon() {
  const toggleBtn = document.getElementById("themeToggle");

  if (!toggleBtn) return;

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀︎";  // show sun when dark mode active
  } else {
    toggleBtn.textContent = "⏾⋆.˚";  // show moon when light mode active
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  const currentTheme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";

  localStorage.setItem("theme", currentTheme);

  updateThemeIcon();
}

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  updateThemeIcon();
});


// ================= ANALYZE =================

function analyze() {
  const fileInput = document.getElementById("file");
  const resultBox = document.getElementById("result");
  const suggestionsBox = document.getElementById("suggestions");

  if (!fileInput.files.length) {
    showToast("Select a file first.");
    return;
  }

  resultBox.textContent = "Analyzing...";
  suggestionsBox.innerHTML = "";

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  const userId = localStorage.getItem("user_id");
  formData.append("user_id", userId);

  fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    console.log("Response:", data);

    resultBox.textContent = JSON.stringify({
      status: data.status,
      severity: data.severity,
      message: data.message
    }, null, 2);

    // ✅ THIS IS THE IMPORTANT FIX
    suggestionsBox.innerHTML =
      data.ai_suggestions || "<p>No suggestions needed.</p>";

    showToast("Analysis completed.");
  })
  .catch(() => showToast("Error during analysis."));
}


// ================= DOWNLOAD REPORT =================

function downloadReport() {
  const fileInput = document.getElementById("file");

  if (!fileInput.files.length) {
    showToast("Select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  const userId = localStorage.getItem("user_id");
formData.append("user_id", userId);

  fetch("http://127.0.0.1:5000/download-report", {
    method: "POST",
    body: formData
  })
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "VulnERR_Report.pdf";
    a.click();
    showToast("Report downloaded.");
  })
  .catch(() => showToast("Error generating report."));
}

// ================= TOAST =================

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ================= LOGOUT =================

function logout() {
  localStorage.removeItem("vulnerr_logged_in");
  window.location.href = "login.html";
}
function signup() {
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  fetch("http://127.0.0.1:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      alert("Signup successful!");
      window.location.href = "login.html";
    } else {
      alert(data.error);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Signup failed.");
  });
}
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);

      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert(data.error);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Login failed.");
  });
}
