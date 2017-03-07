# v-data-table
Smart table using vue.js - sorting columns, filter by string, child rows, customs columns, custom row data

Props:

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

Slots:

 - caption
	 - Any caption that should be inserted before the header
 - child 
	 - Any sub row of child detail data
 - column
	 - Any template for a column
	 
	 
Demo of these props/slots:

https://jsfiddle.net/mikemenaker/hxjwhsdx/
