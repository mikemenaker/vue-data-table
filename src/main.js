import DataTableComp from './Components/v-data-table.vue'

const DataTable = {
    install(Vue, options = {}) {        
        Vue.component('data-table', DataTableComp)
    },
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(DataTable);
}

window.DataTable = DataTable

export { DataTable }
export default DataTable
