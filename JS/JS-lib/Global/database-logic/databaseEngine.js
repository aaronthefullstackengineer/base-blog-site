// databaseEngine.js
export class Database {
  constructor(data) {
    this.data = data || [];
  }

  filterBy(column, value) {
    return this.data.filter(row => row[column] && row[column].includes(value));
  }

  sortBy(column, ascending = true) {
    return this.data.sort((a, b) => {
      if (a[column] < b[column]) return ascending ? -1 : 1;
      if (a[column] > b[column]) return ascending ? 1 : -1;
      return 0;
    });
  }

  search(keyword) {
    keyword = keyword.toLowerCase();
    return this.data.filter(row =>
      Object.values(row).some(val => val.toLowerCase().includes(keyword))
    );
  }

  getAll() {
    return this.data;
  }
}
