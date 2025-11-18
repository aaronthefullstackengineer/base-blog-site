import { initThemeToggle } from "./JS lib/Global/light-dark-mode.js";
import { initCardSearch } from './JS lib/Global/search.js';
import { loadHeader } from "./JS lib/Global/Modules/header-module.js";
import { loaderfooter } from "./JS lib/Global/Modules/footer-module.js";
import { loadMenuModule } from "./JS lib/Global/Modules/menu-module.js";
import { loadNavbarGlass } from "./JS lib/Global/navbar-glass.js";
import { fetchCSV } from "./JS lib/Global/database-logic/csvParser.js";
import { Database } from "./JS lib/Global/database-logic/databaseEngine.js";
import { renderData } from "./JS lib/Global/database-logic/htmlRenderer.js";
import { loadMultipleCSVs } from "./JS lib/Global/database-logic/csvManager.js";

//--------------------
initCardSearch(); // uses default selectors
initThemeToggle(); // by default looks for #theme-toggle
loadHeader(); // header module
loaderfooter(); // footer module
loadMenuModule(); // Menu Module
loadNavbarGlass(); // Navbar

//--------------------
(async function init() {
  const csvUrls = [
    '/Database/placeholder-data.csv'
  ];

  // Load all CSVs into a single database
  const db = await loadMultipleCSVs(csvUrls);

  // Optional: sort or filter the data
  const sortedData = db.getAll(); // or filterBy/search if needed

  // Render to HTML
  renderData('#data-container', sortedData, '#row-template');
})();
