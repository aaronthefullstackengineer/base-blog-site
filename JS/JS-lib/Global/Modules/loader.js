export function loadModule(targetId, filePath) {
    const el = document.getElementById(targetId);
    if (!el) {
        console.warn(`Module target #${targetId} not found`);
        return;
    }

    return fetch(filePath)
        .then(res => res.text())
        .then(html => {
            el.innerHTML = html;
        })
        .catch(err => console.error(`Error loading ${filePath}:`, err));
}
