// articleLoader.js

export function initArticles(csvUrl, containerId = "home-articles", templateId = "row-template", loadMoreBtnId = "load-more") {
    const ROWS_PER_LOAD = 20; // 4 cards x 5 rows

    let allData = [];
    let currentIndex = 0;

    async function loadCSV(url) {
        const res = await fetch(url);
        const csvText = await res.text();
        return parseCSV(csvText);
    }

    function parseCSV(text) {
        const lines = text.trim().split("\n");
        const headers = lines.shift().split(",").map(h => h.trim());

        return lines.map(line => {
            const values = line.split(",").map(v => v.trim());
            let obj = {};
            headers.forEach((h, i) => obj[h] = values[i] || "");
            return obj;
        });
    }

    function renderNextRows() {
        const container = document.getElementById(containerId);
        const template = document.getElementById(templateId);
        const loadMoreBtn = document.getElementById(loadMoreBtnId);

        const slice = allData.slice(currentIndex, currentIndex + ROWS_PER_LOAD);

        slice.forEach(item => {
            if (!item.title && !item.description && !item.image && !item.tag) return;

            const card = template.content.cloneNode(true);
            const cardEl = card.querySelector(".card");

            // Title
            const titleEl = cardEl.querySelector("[data-key='title']");
            if (item.title) titleEl.textContent = item.title;
            else titleEl.remove();

            // Description
            const descEl = cardEl.querySelector("[data-key='description']");
            if (item.description) descEl.textContent = item.description;
            else descEl.remove();

            // Image
            const imgEl = cardEl.querySelector("[data-key='image']");
            if (item.image) imgEl.src = item.image;
            else imgEl.remove();

            // Tag
            const tagEl = cardEl.querySelector("[data-key='tag']");
            if (item.tag) tagEl.textContent = item.tag;
            else tagEl.remove();

            // Clickable card
            if (item.url) {
                const link = document.createElement("a");
                link.href = item.url;
                link.target = "_blank";
                link.style.textDecoration = "none";
                link.style.color = "inherit";
                link.appendChild(cardEl);
                container.appendChild(link);
            } else {
                container.appendChild(cardEl);
            }
        });

        currentIndex += ROWS_PER_LOAD;

        if (currentIndex >= allData.length) {
            loadMoreBtn.style.display = "none";
        }
    }

    async function start() {
        const loadMoreBtn = document.getElementById(loadMoreBtnId);

        allData = await loadCSV(csvUrl);

        // Sort by date
        allData.sort((a, b) => new Date(b.date) - new Date(a.date));

        // First batch
        renderNextRows();

        // Show Load More Button
        if (allData.length > ROWS_PER_LOAD) {
            loadMoreBtn.style.display = "inline-block";
        }

        // Click handler
        loadMoreBtn.addEventListener("click", renderNextRows);
    }

    // Start loader
    start();
}
