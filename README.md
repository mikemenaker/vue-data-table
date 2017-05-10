[![GitHub release](https://img.shields.io/github/release/mikemenaker/vue-data-table.svg)]() [![license](https://img.shields.io/github/license/mikemenaker/vue-data-table.svg)]()

# vue data-table
Smart table using vue.js - sorting columns, filter by string, child rows, customs columns, custom row data


## Demo:

https://jsfiddle.net/mikemenaker/zuyvwvms/

## Installation:


``` html
<script src="https://cdn.rawgit.com/mikemenaker/vue-data-table/1.0.2/src/v-data-table.js"></script>
	<!-- OR -->
<script src="https://cdn.rawgit.com/mikemenaker/vue-data-table/1.0.2/src/v-data-table.min.js"></script>
```

You can also add the .vue file to your project.

## Props:

 - data
	 - Array
	 - Data to create table from
 - columnsToDisplay
	 - Array
	 - Which columns to display in table
 - columnsToNotDisplay
	 - Array
	 - Which columns to not display in table (cannot be used with columnsToDisplay)
 - aggregateColumns
	 - Boolean
	 - Walk all objects instead of just first object to get list of columns (cannot be used with columnsToDisplay)
 - displayNames
	 - Object
	 - Mapping of column name -> display name
 - filterKey
	 - String
	 - Filter data for string
 - childHideable
	 - Boolean
	 - Are child rows hideable (double click open/close)
 - childInitHide
	 - Boolean
	 - If child rows are expandable, should they be hidden initially
 - columnsToSort
	 - Array
	 - What columns should be sortable (columnsToNotSort will take precedence if both are provided)
 - columnsToNotSort
	 - Array
	 - What columns should not be sortable
 - childTransitionClass
	 - String
	 - CSS class to use in transition	 

## Slots:

 - caption
	 - Any caption that should be inserted before the header
 - child 
	 - Any sub row of child detail data
 - column
	 - Any template for a column
 - nodata
	 - Slot to display if the data provided is empty	 
	 
## Styling:
- Selected columns have the class "active"
- Arrows are a span with class "arrow"
- Ascending/descending arrows also have class "asc"/"dsc"

```css
th.active .arrow.asc {
    border-bottom: 4px solid #4d4d4d;
}

th.active .arrow.dsc {
    border-top: 4px solid #4d4d4d;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #cdc;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #cdc;
}
```

##  Examples
Basic table:
```html
<div id="demo">  
  <data-table :data="gridData">    
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {        
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```

Only display certain columns:
```html
<div id="demo">  
  <data-table :data="gridData" :columns-to-display="gridColumns">    
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {       
    gridColumns: ['name', 'power'],
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```

Bind to search string:
```html
<div id="demo">  
  <form id="search">
    Search
    <input name="query" v-model="searchQuery">
  </form>
  <data-table :data="gridData" :filter-key="searchQuery">    
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {   
    searchQuery: '',
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```

Map display names of columns:
```html
<div id="demo">  
  <data-table :data="gridData" :display-names="displayNames">    
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {      
  displayNames: {
      'power': 'Super Powers'
    },
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```

Add a caption:
```html
<div id="demo">  
  <data-table :data="gridData">   
    <template slot="caption">This is my caption</template> 
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {        
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```

Use template for a column (template name must match column name):
```html
<div id="demo">  
  <data-table :data="gridData">    
    <template slot="name" scope="props">
      <b>{{props.entry.name}}</b>
      <br />
      <button @click="showPower(props.entry.power)">
        Show Power
      </button>
    </template>
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {        
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  },
  methods: {
    showPower(power) {
      alert(power);
    }
  }
})
```

Add a child row, each section will be a tbody of 2 rows (data row, child row):
```html
<div id="demo">  
  <data-table :data="gridData">   
    <template slot="child" scope="props">
      This is my child row: {{props.entry.name}}
    </template>
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {        
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```

Add ability to toggle child row (double click to open/close):
```html
<div id="demo">  
  <data-table :data="gridData" :child-hideable="true">   
    <template slot="child" scope="props">
      This is my child row: {{props.entry.name}}
    </template>
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {        
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```

Add ability to toggle child row (double click main row to open, double click child to close) and default to children rows closed:
```html
<div id="demo">  
  <data-table :data="gridData" :child-hideable="true" :child-init-hide="true">   
    <template slot="child" scope="props">
      This is my child row: {{props.entry.name}}
    </template>
  </data-table>
</div>
```

```javascript
var demo = new Vue({
  el: '#demo',
  data: {        
    gridData: [{
      name: 'Chuck Norris',
      power: Infinity
    }, {
      name: 'Bruce Lee',
      power: 9000
    }, {
      name: 'Jackie Chan',
      power: 7000
    }, {
      name: 'Jet Li',
      power: 8000
    }]
  }
})
```


