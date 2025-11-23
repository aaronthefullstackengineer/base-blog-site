export function loadNavbarGlass() {
    const btn = document.getElementById("hamburger-btn");
    const nav = document.getElementById("nav-links");

    if (btn && nav) {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            nav.classList.toggle("open");
        });
    }
}
