export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = Array.isArray(data) ? data : data.data;
    this.render();
  }
  element;
  subElements = {};
  getHeader () {
    return (`
   <div data-element="header" class="sortable-table__header sortable-table__row">
   ${this.headerConfig.map((item) => {
        return (`
     <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
     <span>${item.title}</span>
     <span data-element="arrow" class="sortable-table__sort-arrow">
       <span class="sort-arrow"></span>
     </span>
   </div>`)
      }).join('')}
 </div>
   `);
  }

  getTableBody (data) {
    const tableData = [...data];
    return (`
     <div class = "sortable-table">
        ${this.subElements.body ? "" : this.getHeader()}
       <div data-element = "body" class = "sortable-table__body">
         ${tableData.map(tableItem => this.getTableRows(tableItem)).join('')}
       </div> 
       </div>
   `);
  }

  getTableRows (item) { 
    const rowItems = this.headerConfig.map((item) => item.id)
    return (`
   <a href="#" class="sortable-table__row">
      ${rowItems.map((itemName) => {
        if (itemName === "images") {
          return (`
          <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${item[itemName][0]?.url || 'https://via.placeholder.com/32'}">
          </div>
          `)
        }

        if (itemName !== "images") {
          return (`
          <div class="sortable-table__cell">${item[itemName]}</div>
          `)
        }
      }).join('')}
   </a>    
   `);
  }

  render () {
    const mainDiv = document.createElement('div');
    mainDiv.innerHTML = this.getTableBody(this.data);
    this.element = mainDiv.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements (element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }

  updateTable (arr) {
    return this.subElements.body.innerHTML = this.getTableBody(arr);
  }

  sort (field, order) {
    const dataArray = [...this.data]
    const column = this.headerConfig.find(item => item.id === field);
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: -1
    }
    //Borrowed from the homework solution ------------------------------------
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });
    currentColumn.dataset.order = order;
    // -------------------------------------------------------------------------
    if (sortType === 'string') {
      dataArray.sort((a, b) => {
        return directions[order] * a[field].localeCompare(b[field], ['ru', 'en'])
      });
      this.subElements.body.innerHTML = this.getTableBody(dataArray); 
    }

    if (sortType === 'number') {
      dataArray.sort((a, b) => {
        return directions[order] * (a[field] - b[field]);
      });
      this.subElements.body.innerHTML = this.getTableBody(dataArray); 
    } 
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }

}