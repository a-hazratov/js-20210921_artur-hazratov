export default class ColumnChart {
    element;
    subElements = {};
    chartHeight = 50;
    constructor ({
      data = [],
      label = '',
      link = '',
      value = 0,
      formatHeading = data => data
    } = {}) {
      this.data = data;
      this.label = label;
      this.link = link;
      this.value = formatHeading(value);
      
    
      this.render();
    }
 
    get template() { 
      return `  <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
  <div class="column-chart__title">
    Total ${this.label}
    ${this.getLink()}
  </div>
  <div class="column-chart__container">
    <div data-element="header" class="column-chart__header">${this.value}</div>
    <div data-element="body" class="column-chart__chart">
      ${this.individualCharts(this.data)}
    </div>
  </div>
</div>`}
  
    // Done
    getLink() {
      return `<a href=${this.link} class="column-chart__link">View all</a>`;
  
    }
    
    //Done
    render () {
      let chartDiv = document.createElement('div');
      chartDiv.innerHTML = this.template;
      this.element = chartDiv.firstElementChild;
      if (this.data.length) {
        this.element.classList.remove('column-chart_loading');
      }
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
    
    //Done
    individualCharts(data) {
      const maxValue = Math.max(...data);
      const scale = this.chartHeight / maxValue;
      return data.map((item)=>{ 
        const percent = (item / maxValue * 100).toFixed(0)
        return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
      }).join('');
    }

    update (data) {
      this.subElements.body.innerHTML = this.individualCharts(data)
    }

    remove () {
      if (this.element) {
        this.element.remove();
      }
    }

    destroy () {
      this.remove();
      this.element = null;
      this.subElements = {};
    }

}


