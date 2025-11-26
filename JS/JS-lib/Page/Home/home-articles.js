// --- CSV → Array Converter ---
export async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();

    const rows = text.trim().split("\n");
    const headers = rows.shift().split(",");

    return rows.map(row => {
        const values = row.split(",");
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim() || "");
        return obj;
    });
}

// --- Main Loader Function ---
export async function loadHomeCards(csvUrl, containerSelector, limit = 4) {
    try {
        const data = await fetchCSV(csvUrl);
        const container = document.querySelector(containerSelector);

        container.innerHTML = ""; // clear existing

        for (let i = 0; i < limit; i++) {
            const item = data[i];

            // If no row → skip creating card
            if (!item) continue;

            // Create card wrapper
            const card = document.createElement("a");
            card.className = "home-card card-link";
            card.href = item.link || "#"; // fallback

            // Build inner HTML with conditional fields
            card.innerHTML = `
                ${item.image ? `<img src="${item.image}" alt="${item.title || ''}">` : ""}
                ${item.title ? `<h3>${item.title}</h3>` : ""}
                ${item.description ? `<p>${item.description}</p>` : ""}
            `;

            container.appendChild(card);
        }

        // If no cards were added → hide entire section
        if (container.children.length === 0) {
            container.style.display = "none";
        }

    } catch (err) {
        console.error("Error loading home cards:", err);
    }
}
