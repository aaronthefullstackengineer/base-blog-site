// search.js
export function initCardSearch(
  inputSelector = "#search-input",
  cardSelector = ".card",
  headerSelector = "h1, h2, h3, h4, h5, h6"
) {
  const input = document.querySelector(inputSelector);
  if (!input) {
    console.warn(`Search input not found: ${inputSelector}`);
    return;
  }

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();

    // IMPORTANT: re-select the cards *every time*
    const cards = document.querySelectorAll(cardSelector);

    cards.forEach(card => {
      const headers = card.querySelectorAll(headerSelector);
      const match = Array.from(headers).some(header =>
        header.textContent.toLowerCase().includes(query)
      );

      card.style.display = match ? "" : "none";
    });
  });
}
