export function initThemeToggle(buttonSelector = "#theme-toggle") {
  const btn = document.querySelector(buttonSelector);
  if (!btn) {
    console.warn(`Theme toggle button not found for selector: ${buttonSelector}`);
    return;
  }

  // Load saved or default theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Set initial emoji
  btn.textContent = savedTheme === "light" ? "🌙" : "☀️";

  // Add a class for animation (optional if user creates CSS)
  btn.classList.add("theme-toggle-emoji");

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";

    // Fade out
    btn.style.opacity = 0;

    setTimeout(() => {
      // Switch theme
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);

      // Update emoji
      btn.textContent = next === "light" ? "🌙" : "☀️";

      // Fade back in
      btn.style.opacity = 1;
    }, 300); // small delay for transition
  });
}
