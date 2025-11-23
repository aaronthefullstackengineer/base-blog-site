
import { loadMultipleCSVs } from '/JS/JS lib/Global/database-logic/csvManager.js'

export async function loadHomeCards(csvUrl) {
  try {
    const db = await loadMultipleCSVs([csvUrl]);
    const data = db.getAll();

    const cardsWrapper = document.querySelector('.home-cards-wrapper');
    cardsWrapper.innerHTML = '';

    if (!data || data.length === 0) {
      cardsWrapper.style.display = 'none';
      return;
    } else {
      cardsWrapper.style.display = 'grid';
    }

    const items = data.slice(0, 4); // first 4 rows

    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('home-card');

      if (item.img) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.title || 'Article image';
        card.appendChild(img);
      }

      if (item.title) {
        const h3 = document.createElement('h3');
        h3.textContent = item.title;
        card.appendChild(h3);
      }

      if (item.description) {
        const p = document.createElement('p');
        p.textContent = item.description;
        card.appendChild(p);
      }

      if (item.tags) {
        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('home-card-tags');
        item.tags.split(',').forEach(tagText => { // if tags is CSV string
          const tag = document.createElement('span');
          tag.classList.add('home-card-tag');
          tag.textContent = tagText.trim();
          tagsContainer.appendChild(tag);
        });
        card.appendChild(tagsContainer);
      }

      cardsWrapper.appendChild(card);
    });

  } catch (err) {
    console.error('Error loading home cards:', err);
    document.querySelector('.home-cards-wrapper').style.display = 'none';
  }
}
