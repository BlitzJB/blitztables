export class Table {
    /**
     * Table class for Blitz Tables.
     * @param {String} tableQS Query Selector for the table
     * @param {Object} options Options for the table
     */
    
    constructor (tableQS, options) {
        this.tableQS = tableQS;
        this.table = document.querySelector(tableQS);

        if (!this.table) {
            console.error(`Table ${tableQS} not found`);
        }

        this.options = new Options(options, this.table);
    }

    setHeaders (headers) {
        /**
         * Set the headers for the table.
         * @param {Array} headers Array of headers
         */
        this.headers = headers;
        this.thead = document.createElement('thead')
        this.thead.innerHTML = this.headers.map(header => `<th>${header}</th>`).join('');
        this.table.appendChild(this.thead);
    }

    setData (data) {
        /**
         * Set the data for the table.
         * @param {Array} data Array of data
         */
        this.data = data;
        this.mountData(data);
    }
    
    mountData (data) {
        /**
         * Mount the data to the table. This is for internal use only.
         * @param {Array} data Array of data
         */
        this.tbody = document.createElement('tbody')
        this.tbody.innerHTML = data.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
        this.table.appendChild(this.tbody);
    }

    setFooter (footer) {
        /**
         * Set the footer for the table.
         * @param {Array} footer Array of footer
         */
        this.footer = footer;
        this.tfoot = document.createElement('tfoot')
        this.tfoot.innerHTML = `<tr>${this.footer.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
        this.table.appendChild(this.tfoot);
    }

    filter (filterHandler) {
        /**
         * Filter the data in the table and automatically reset the table.
         * @param {Function} filterHandler Filter handler function. This function should return true or false.
         */
        let newData = this.data.filter(row => filterHandler(row));
        this.tbody.innerHTML = newData.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
    }

    sort (sortHandler) {
        /**
         * Sort the data in the table and automatically reset the table.
         * @param {Function} sortHandler Sort handler function. A Typical compare function like in Array.sort.
         */
        let existingData = this.data;
        existingData.sort(sortHandler);
        this.tbody.innerHTML = existingData.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
    }

    reset () {
        /**
         * Reset the table to the initial setData input.
         */
        this.tbody.innerHTML = this.data.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
    }

    destroy () {
        /**
         * Destroy the table.
         */
        if (this.thead) {
            this.thead.remove();
        }
        if (this.tbody) {
            this.tbody.remove();
        }
        if (this.tfoot) {
            this.tfoot.remove();
        }
    }
}

class Options {
    /**
     * Options class for the Table class. This class is for internal use only.
     * @param {Object} options Options for the table
     * @param {HTMLElement} $parent Parent element for the table
     */
    constructor (options, $parent) {
        this.options = options;
        this.$parent = $parent;

        this.customClasses = this.options.customClasses || '';
        
        this.type = this.options.type ? `table-${this.options.type}` : 'table-primary';
        this.striped = this.options.striped ? 'table-striped' : '';
        this.bordered = this.options.bordered ? 'table-bordered' : '';
        this.bordercolor = this.options.bordercolor ? `border-${this.options.bordercolor}` : '';
        this.responsive = this.options.responsive ? 'table-responsive' : '';

        this.className = `table ${this.type} ${this.striped} ${this.bordered} ${this.bordercolor} ${this.responsive} ` + this.customClasses;
        this.$parent.className = this.className;
    }

    updateOptions () {
        /**
         * Update the options for the table and reset the table.
         */
        this.className = `table ${this.type} ${this.striped} ${this.bordered} ${this.bordercolor} ${this.responsive} ` + this.customClasses;
        this.$parent.className = this.className;
    }
}