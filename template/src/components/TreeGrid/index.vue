<template>
  <div>
    <el-table
      :data="data"
      border
      style="width: 100%"
      :row-style="_showTr">
      <el-table-column
        type="index"
        label="序号"
        width="55" align="center">
      </el-table-column>

      <el-table-column
        v-for="(column, index) in columns"
        :key="column.dataIndex"
        align="center"
        :label="column.label">
        <template slot-scope="scope">
          <span 
            v-if="_spaceIconShow(index)" 
            v-for="(space, levelIndex) in scope.row._level"
            :key="levelIndex"
                class="ms-tree-space"></span>
          <button
            style="border:0;background:transparent;outline:none;"
            class="button is-outlined is-primary is-small "
            v-if="_toggleIconShow(index,scope.row)"
            @click="_toggle(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon el-icon-arrow-right" aria-hidden="true"></i>
            <i v-if="scope.row._expanded" class="el-icon el-icon-arrow-right el-table__expand-icon--expanded"
               aria-hidden="true"></i>
          </button>
          <span v-else-if="index===0" class="ms-tree-space"></span>
          <slot name="_column" :column="scope.row" :data-index="column.dataIndex"></slot>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>
<script>
  import dataTranslate from './dataTranslate';
  export default {
    name: 'treeGrid',
    props: {
      treeStructure: { // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        type: Boolean,
        default: function() {
          return false;
        }
      },
      columns: { // 这是相应的字段展示
        type: Array,
        default: function() {
          return [];
        }
      },
      dataSource: { // 这是数据源
        type: Array,
        default: function() {
          return [];
        }
      },
      treeType: { // 这个是是否展示操作列
        type: String,
        default: function() {
          return 'normal';
        }
      },
      defaultExpandAll: { // 是否默认展开所有树
        type: Boolean,
        default: function() {
          return true;
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      // 格式化数据源
      data: function() {
        if (this.treeStructure) {
          // console.log(this.dataSource)
          let data = dataTranslate.treeToArray(this.dataSource, null, null, this.defaultExpandAll);
          return data;
        }
        return this.dataSource;
      }
    },
    methods: {
      _showTr: function({row, index}) { // 显示行
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true);
        row._show = show;
        return show ? '' : 'display:none;';
      },
      _toggle: function(trIndex) { // 展开下级
        let record = this.data[trIndex];
        record._expanded = !record._expanded;
      },
      _spaceIconShow(index) { // 显示层级关系的空格和图标
        return this.treeStructure && index === 0;
      },
      _toggleIconShow(index, record) { // 点击展开和关闭的时候，图标的切换
        return this.treeStructure && index === 0 && record.children && record.children.length > 0;
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: ""
  }

  table td {
    line-height: 26px;
  }

  .el-table__expand-icon--expanded {
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
</style>
