// ============================
// Recommendation Engine Module
// ============================

export async function initRecommendationEngine(config) {
    const { csvUrl, mountPoint, limit = 6 } = config;

    const mount = document.getElementById(mountPoint);
    if (!mount) return console.error("Rec Engine mount point missing:", mountPoint);

    // Inject HTML template safely into mount
    mount.innerHTML = `
        <section id="rec-engine-wrapper">
            <main id="rec-engine-cards"></main>

                <template id="rec-engine-template">
                    <a class="rec-card" data-key="url" target="_self">
                        <img data-key="image" alt="Article Image" />
                        <h2 data-key="title"></h2>
                        <p data-key="description"></p>
                        <span class="tag" data-key="tag"></span>
                    </a>
                </template>
            <div style="text-align:center;margin:20px;">
                <button id="rec-engine-shuffle">Shuffle</button>
            </div>
        </section>
    `;

    // CACHE ELEMENTS
    const cardsContainer = mount.querySelector("#rec-engine-cards");
    const template = mount.querySelector("#rec-engine-template");

    // LOAD + PARSE CSV
    let allData = await fetchCSV(csvUrl);

    // MAIN RENDER FUNCTION
    function renderCards() {
        const selected = pickWeightedRandom(allData, limit);
        cardsContainer.innerHTML = ""; // clear

        selected.forEach(item => {
            if (!item.title && !item.image) return; // hide full card

            const clone = template.content.cloneNode(true);
            fillCard(clone, item);
            cardsContainer.appendChild(clone);
        });
    }

    // Shuffle button
    mount.querySelector("#rec-engine-shuffle")
        .addEventListener("click", renderCards);

    // Display initially
    renderCards();
}

// ============================
// CSV Loader
// ============================
async function fetchCSV(url) {
    const res = await fetch(url);
    const text = await res.text();
    return parseCSV(text);
}

function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines.shift().split(",").map(h => h.trim());

    return lines.map(line => {
        const parts = line.split(",").map(p => p.trim());
        const obj = {};
        headers.forEach((h, i) => (obj[h] = parts[i] ?? ""));
        return obj;
    }).filter(row => row.title || row.image);
}

// ============================
// Fill card + hide empty fields
// ============================
function fillCard(clone, data) {
    const nodes = clone.querySelectorAll("[data-key]");

    nodes.forEach(node => {
        const key = node.dataset.key;
        const value = data[key];

    
      // Handle the whole-card <a> URL binding
        if (node.tagName === "A" && key === "url") {
            if (value) node.href = value;
            else node.removeAttribute("href"); // disable click if no URL
            return;
        }

        if (!value) {
            node.remove(); // hide missing fields
            return;
        }

        if (node.tagName === "IMG") node.src = value;
        else node.textContent = value;
    });
}

// ============================
// Weighted Random (Recent Bias)
// ============================
function pickWeightedRandom(list, count) {
    const now = new Date();

    // Weight: newer dates = higher weight
    const weighted = list.flatMap(item => {
        const date = new Date(item.date);
        const diffDays = (now - date) / (1000 * 60 * 60 * 24);

        // Weight: items from last 14 days get multiplied more
        let weight =
            diffDays < 3 ? 8 :
            diffDays < 7 ? 5 :
            diffDays < 14 ? 3 :
            diffDays < 30 ? 2 :
            1;

        return Array(weight).fill(item);
    });

    // Shuffle and pick
    return shuffle(weighted).slice(0, count);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
