 import { initRecommendationEngine } from "/JS/JS-lib/Page/Recommendation/recommendation-engine.js";
    initRecommendationEngine({
        csvUrl: "/Database/placeholder-data3.csv",   // your CSV file
        mountPoint: "rec-engine-root",
        limit: 6                        // 3 x 2 grid
    });