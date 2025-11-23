// htmlRenderer.js
export function renderData(containerSelector, data, templateSelector) {
  const container = document.querySelector(containerSelector);
  const template = document.querySelector(templateSelector);

  if (!container || !template) return;

  container.innerHTML = ''; // clear previous content

  data.forEach(row => {
    const clone = template.content.cloneNode(true);

    // map CSV fields to elements with matching data-key attributes
    clone.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (row[key] !== undefined) {
        el.textContent = row[key];
      }
    });

    container.appendChild(clone);
  });
}
