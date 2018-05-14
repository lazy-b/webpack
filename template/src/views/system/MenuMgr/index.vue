<template>
  <div>
    <!-- <page-nav></page-nav> -->
    <div class="app-container">
    <div class="filter-container">
      <el-form label-width="80px">
        <el-row>
          <!--<el-col :span="8">
            <el-form-item label="资源名称">
              <el-input  placeholder="请输入资源名称" v-model="listQuery.name"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="15" class="text-left">
            <!--<el-button class="filter-item" icon="el-icon-search" @click="handleFilter">查询</el-button>-->
            <el-button class="filter-item"  @click="handleAdd" type="primary" icon="el-icon-plus">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <tree-grid v-if="tableData.length > 0" :columns="columns" :tree-structure="true" :data-source="tableData" :defaultExpandAll="false" @reload="getMenuList">
      <template slot="_column" slot-scope="props">
        <span v-if="props.dataIndex == 'type'">
            \{{props.column.data.type == 1 ? '菜单': props.column.data.type == 0 ? '目录': props.column.data.type == 2 ? '按钮': ''}}
        </span>
        <span v-else-if="props.dataIndex == 'visible'">
            \{{props.column.data.visible == '1' ? '否': props.column.data.visible == '2' ? '是': ''}}
        </span>
        <span v-else-if="props.dataIndex == 'perms'">\{{props.column.data.perms}}</span>
        <span v-else>\{{ props.column[props.dataIndex] || props.column.data[props.dataIndex] }}</span>
      </template>
      <el-table-column label="操作"  align="center" width="300" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editMenu(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="addChild(scope.row)">增加下级</el-button>
          <el-button type="text" size="mini" @click="deleteMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-grid>
    <div class="text-center" style="color:#999999;font-size: 10px;" v-else><span>暂无数据</span></div>
    <menu-add ref="menuAdd" @done="getMenuList"></menu-add>
    <menu-edit ref="menuEdit" @done="getMenuList"></menu-edit>
    </div>
  </div>
</template>
<script>
  /* 1：添加 /sys/menu/saveMenu post
    2：删除 /sys/menu/removeMenu delete
    3：修改 /sys/menu/updateMenu put
  4：查询菜单树 /sys/menu/listMenuTree get */
  import menuAdd from './MenuAdd';
  import menuEdit from './MenuEdit';
  import { menu } from '@/api';
  export default {
    components: {
      menuAdd,
      menuEdit
    },
    data() {
      return {
        listQuery: {
          name: ''
        },
        columns: [
          {
            label: '菜单名称',
            dataIndex: 'label'
          },
          {
            label: '菜单类型',
            dataIndex: 'type'
          },
          {
            label: '链接地址',
            dataIndex: 'perms'
          },
          {
            label: '是否可见',
            dataIndex: 'visible'
          }
        ],
        tableData: []
      };
    },
    methods: {
      handleFilter() {
        this.getMenuList();
      },
      handleAdd() {
        this.$refs.menuAdd.show();
      },
      getMenuList() {
        menu.getMenuList().then(response => {
          // console.log(response)
          this.tableData = response.data.data;
        });
      },
      editMenu(row) {
        this.$refs.menuEdit.show(row);
      },
      addChild(row) {
        this.$refs.menuAdd.show(row);
      },
      deleteMenu(row) { // 按钮操作
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          closeOnClickModal: false
        }).then(() => {
          menu.deleteMenu({menuId: Number(row.id)}).then(response => {
            if (response.data.code === 0) {
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
              this.getMenuList();
            } else {
              this.$message({
                message: response.data.msg,
                type: 'warning'
              });
            }
          });
        });
      }
    },
    created() {
      this.getMenuList();
    }
  };
</script>
