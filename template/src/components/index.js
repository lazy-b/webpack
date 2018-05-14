/*
* @Author: lazy1993
* @Date:   2018-01-16 19:17:21
 * @Last Modified by: LuoJW
 * @Last Modified time: 2018-03-21 17:34:04
*/

import Vue from 'vue';

// 下拉选择字典
import DictionariesSelect from './DictionariesSelect';
// 列表
import PageTable from './PageTable';
// 列表树
import TreeGrid from './TreeGrid';
// 页签(标题)
import PageNav from './PageNav';
// 搜索栏
import QueryBar from './QueryBar';

Vue.component(DictionariesSelect.name, DictionariesSelect);
Vue.component(PageTable.name, PageTable);
Vue.component(TreeGrid.name, TreeGrid);
Vue.component(PageNav.name, PageNav);
Vue.component(QueryBar.name, QueryBar);
