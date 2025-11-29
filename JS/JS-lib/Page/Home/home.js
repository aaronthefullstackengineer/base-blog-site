import { loadHomeCards } from "/JS/JS-lib/Page/Home/home-articles.js";

loadHomeCards(
    "/Database/placeholder-data3.csv",        // CSV file
    ".home-cards-wrapper",        // container
    4                              // limit
);
