export class FilterManager {
    constructor() {
      this.generalFilter = '';
      this.advancedFilters = [];
    }
  
    setGeneralFilter(value) {
      this.generalFilter = value;
    }
  
    addAdvancedFilter() {
      this.advancedFilters = [...this.advancedFilters, { column: '', operator: 'contiene', value: '', range: false }];
    }
  
    removeAdvancedFilter(index) {
      this.advancedFilters = this.advancedFilters.filter((_, i) => i !== index);
    }
  
    updateAdvancedFilter(index, field, value) {
      const newFilters = [...this.advancedFilters];
      newFilters[index][field] = value;
      this.advancedFilters = newFilters;
    }
  
    getAvailableOperators(columnType) {
      switch (columnType) {
        case 'number':
          return ['=', '>', '<'];
        case 'text':
          return ['contiene', 'no contiene', 'comienza con', 'termina con'];
        case 'date':
          return ['antes de', 'después de', 'en', 'entre'];
        default:
          return ['='];
      }
    }
  
    getColumnType(columnName) {
      if (['id', 'price', 'quantity'].includes(columnName)) {
        return 'number';
      }
      if (['fecha_creacion'].includes(columnName)) {
        return 'date';
      }
      return 'text';
    }
  
    applyAdvancedFilter(row, { column, operator, value }) {
      if (!value) return true;
      const rowValue = row[column];
  
      switch (operator) {
        case 'contiene':
          return String(rowValue).toLowerCase().includes(value.toLowerCase());
        case 'no contiene':
          return !String(rowValue).toLowerCase().includes(value.toLowerCase());
        case 'comienza con':
          return String(rowValue).toLowerCase().startsWith(value.toLowerCase());
        case 'termina con':
          return String(rowValue).toLowerCase().endsWith(value.toLowerCase());
        case '>':
          return rowValue > value;
        case '<':
          return rowValue < value;
        case '=':
          return String(rowValue) === String(value);
        case 'antes de':
          return new Date(rowValue) < new Date(value);
        case 'después de':
          return new Date(rowValue) > new Date(value);
        case 'en':
          return new Date(rowValue).toDateString() === new Date(value).toDateString();
        case 'entre':
          const [start, end] = value;
          return new Date(rowValue) >= new Date(start) && new Date(rowValue) <= new Date(end);
          default:
        return true;
      }
    }
  
    filterObras(obras) {
      return obras.filter((row) => {
        const matchesGeneralFilter = Object.values(row).some((value) =>
          String(value).toLowerCase().includes(this.generalFilter.toLowerCase())
        );
  
        return matchesGeneralFilter && this.advancedFilters.every((filter) => this.applyAdvancedFilter(row, filter));
      });
    }
  }
  