
# BlitzTables

Blitz tables is an abstraction over the tiresome task of having to dynamically display, update, sort and filter data in tables.




## Usage/Examples
### Setting up
```html
<body>
    <table id="table1"></table>
    <script type="module" src="path-to/script.js"></script>
</body>
```

```javascript
/* script.js */

import { Table } from 'path-to/blitztables.js'

const table = new Table('#table1', {
    // Below options are for bootstrap class application
    type: 'primary',
    striped: true,
    bordered: true,
    bordercolor: 'primary',
    responsive: true
});

const table = new Table('#table1', {
    // Custom class application. 
    // this can be used together with bootstrap options as well. 
    // customClasses will overwrite bootstrap
    customClass: 'table-custom'
});
```

### Injecting data
```javascript
table.setHeaders(['Name', 'Age', 'money'])
table.setData([
    ['John', 25, 100],
    ['Jane', 23, 200],
    ['Joe', 21, 300],
    ['Jack', 19, 400],
    ['Jill', 17, 500],
    ['Jim', 15, 600],
    ['Jenny', 13, 700]
])
table.setFooter(['Footer1', 'Footer2', 'Footer3'])
```

### Sorting and Filtering
```javascript
table.filter(row => row[1] > 20)
table.sort((a, b) => a[1] - b[1])
```

### Misc
```javascript
table.reset() // Resets table to the original data passed in via setData()
table.destroy() // Destroys thead, tbody and tfooter 
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Planned Features

- Add table update animations
- Add expandable table rows

