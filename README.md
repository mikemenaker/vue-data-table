[![GitHub release](https://img.shields.io/github/release/mikemenaker/v-data-table.svg)]() [![license](https://img.shields.io/github/license/mikemenaker/v-data-table.svg)]()

# v-data-table
Smart table using vue.js - sorting columns, filter by string, child rows, customs columns, custom row data

## Installation:


``` html
<script src="https://cdn.rawgit.com/mikemenaker/v-data-table/v1.0/src/v-data-table.js"></script>
<!-- OR (TODO) -->
<script src="https://cdn.rawgit.com/mikemenaker/v-data-table/v1.0/src/v-data-table.min.js"></script>
```

## Props:

 - data
	 - Array
	 - Data to create table from
 - columnsToDisplay
	 - Array
	 - Which columns to display in table
 - displayNames
	 - Object
	 - Mapping of column name -> display name
 - filterKey
	 - String
	 - Filter data for string
 - childHideable
	 - Boolean
	 - Are child rows hideable (double click main row to open, double click child to close)
 - childInitHide
	 - Boolean
	 - If child rows are expandable, should they be hidden initially

## Slots:

 - caption
	 - Any caption that should be inserted before the header
 - child 
	 - Any sub row of child detail data
 - column
	 - Any template for a column
	 
	 
## Demo:

https://jsfiddle.net/mikemenaker/hxjwhsdx/

##  Examples
Basic table:
```html
<div id="demo">  
  <v-data-table :data="gridData">    
  </v-data-table>
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
  <v-data-table :data="gridData" :columns-to-display="gridColumns">    
  </v-data-table>
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
  <v-data-table :data="gridData" :filter-key="searchQuery">    
  </v-data-table>
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
  <v-data-table :data="gridData" :display-names="displayNames">    
  </v-data-table>
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
  <v-data-table :data="gridData">   
    <template slot="caption">This is my caption</template> 
  </v-data-table>
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
  <v-data-table :data="gridData">    
    <template slot="name" scope="props">
      <b>{{props.entry.name}}</b>
      <br />
      <button @click="showPower(props.entry.power)">
        Show Power
      </button>
    </template>
  </v-data-table>
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

Add a child row:
```html
<div id="demo">  
  <v-data-table :data="gridData">   
    <template slot="child" scope="props">
      This is my child row: {{props.entry.name}}
    </template>
  </v-data-table>
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

Add ability to toggle child row (double click main row to open, double click child to close):
```html
<div id="demo">  
  <v-data-table :data="gridData" :child-hideable="true">   
    <template slot="child" scope="props">
      This is my child row: {{props.entry.name}}
    </template>
  </v-data-table>
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
  <v-data-table :data="gridData" :child-hideable="true" :child-init-hide="true">   
    <template slot="child" scope="props">
      This is my child row: {{props.entry.name}}
    </template>
  </v-data-table>
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


