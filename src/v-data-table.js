if (typeof Vue != 'undefined') {
    Vue.component('v-data-table', {
        template: `<table>
    <caption>
      <slot name="caption">&nbsp;</slot>
    </caption>
    <thead>
      <tr>
        <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
          {{ key | getDisplayName(displayNames) }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody v-for="(entry, index) in filteredData">
      <tr @dblclick="childShow.splice(index, 1, true)">
        <td v-for="key in columns">
          <slot :name="key" :entry="entry">
            {{entry[key]}}
          </slot>
        </td>
      </tr>
      <tr v-if="$scopedSlots.child && childShow[index]" @dblclick="toggleChild(index)">
        <td :colspan="columns.length">
          <slot name="child" :entry="entry"></slot>
        </td>
      </tr>
    </tbody>
  </table>`,
        props: {
            data: Array,
            columnsToDisplay: {
                type: Array,
                default() {
                    return [];
                }
            },
            displayNames: {
                type: Object,
                default() {
                    return {};
                }
            },
            filterKey: {
                type: String,
                default: ""
            },
            childHideable: {
                type: Boolean,
                default: false
            },
            childInitHide: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const sortOrders = {};
            this.getColumns(this.columnsToDisplay, this.data).forEach(key => sortOrders[key] = 1);

            const childShow = [];
            if (this.childInitHide) {
                this.data.forEach(entry => childShow.push(false));
            } else {
                this.data.forEach(entry => childShow.push(true));
            }

            return {
                sortKey: '',
                sortOrders: sortOrders,
                childShow: childShow
            }
        },
        computed: {
            filteredData() {
                const sortKey = this.sortKey;
                const filterKey = this.filterKey && this.filterKey.toLowerCase();
                const order = this.sortOrders[sortKey] || 1;
                let data = this.data;
                if (filterKey) {
                    data = data.filter(row => {
                        return Object.keys(row).some(key => {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    data = data.slice().sort((a, b) => {
                        a = a[sortKey];
                        b = b[sortKey];
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return data
            },
            columns() {
                return this.getColumns(this.columnsToDisplay, this.data);
            }
        },
        filters: {
            getDisplayName(column, displayNames) {
                if (column in displayNames) {
                    return displayNames[column];
                } else {
                    return column.charAt(0).toUpperCase() + column.slice(1);
                }
            }
        },
        methods: {
            sortBy(key) {
                this.childShow = this.childShow.map(entry => !this.childInitHide);
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1
            },

            getColumns(columns, data) {
                if (columns.length == 0) {
                    return Object.keys(data[0]);
                } else {
                    return columns;
                }
            },

            toggleChild(index) {
                if (this.childHideable) {
                    this.childShow[index] = !this.childShow[index];
                    this.childShow.splice(index, 1, this.childShow[index]);
                }
            }
        }
    });
}
