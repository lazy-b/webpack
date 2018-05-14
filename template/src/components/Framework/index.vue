<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb main-header">
      <span
        class="breadcrumb-item"
        v-for="(item, index) in breadcrumbList"
        :key="index"
      >\{{ item[breadLabel] }}</span>
    </div>
    <!-- 组织架构树 -->
    <div class="tree app-container">
      <el-input
        class="input"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
  
      <el-tree
        class="filter-tree"
        v-bind="$props"
        :highlight-current="true"
        :node-key="nodeKey"
        @node-click="nodeClick"
        accordion
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>
    </div>
  </div>
</template>

<script>
  import Tree from '@/utils/Tree';
  
  export default {
    name: 'Framework',
    components: {},
    directives: {},
    filters: {},
    mixins: {},
    props: {
      // 展示数据
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      // 面包屑展示的字段
      breadLabel: {
        type: String,
        default: 'label'
      },
      // 树节点唯一标识
      nodeKey: {
        type: String,
        default: 'id'
      },
      // 配置映射
      props: {
        type: Object,
        default() {
          return {
            label: 'label',
            children: 'children',
            icon: 'icon',
            disabled: 'disabled',
          };
        }
      },
      // 默认层级缩进值
      indent: {
        type: Number,
        default: 20
      },
      emptyText: {
        type: String,
        default: ''
      },
      renderAfterExpand: {
        type: Boolean,
        default: true
      },
      checkStrictly: Boolean,
      defaultExpandAll: Boolean,
      expandOnClickNode: {
        type: Boolean,
        default: true
      },
      checkDescendants: {
        type: Boolean,
        default: false
      },
      autoExpandParent: {
        type: Boolean,
        default: true
      },
      defaultCheckedKeys: Array,
      defaultExpandedKeys: Array,
    },
    data() {
      return {
        // 自定义展示的字段
        propsMap: { children: 'children', label: 'label' },
        // 展示树的数据
        // treeData: [],
        // 格式化之后的树
        tree: [],
        // 过滤树的输入值
        filterText: '',
        // 面包屑导航数据
        breadcrumbList: [],
      };
    },
    computed: {},
    watch: {
      /** 监听输入框输入值,然后调用树过滤函数 */
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      // 监听原始数据并进行转换,设置tree为得到的Tree的实例
      data: {
        handler(val, oldVal) {
          const params = {
            key: this.nodeKey,
            tree: val,
            children: this.props.children
          };

          this.tree = new Tree(params);
        },
        deep: true,
        immediate: true
      }
    },
    created() {

    },
    mounted() {
      this.$nextTick(function() {
        // 没有点击的时候展示"全部"两个字
        this.breadcrumbList.push({ [this.breadLabel]: '全部' });
      });
    },
    methods: {
      /** 节点点击事件,调用父节点的节点点击事件--同时刷新顶部面包屑 */
      nodeClick(obj, vNode, el) {
        const location = this.tree.getLocation(obj);

        this.breadcrumbList = location;
        this.$emit('nodeClick', obj, vNode, el);
      },
      /** 获取展示数据->调用父组件处理函数 */
      getData() {
        this.$emit('getData');
      },
      /** 树过滤函数 */
      filterNode(value, data) {
        if (!value) return true;
        return data[this.props.label].indexOf(value) !== -1;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  /** 面包屑导航样式 */
  .breadcrumb {
    overflow: hidden;
  }
  
  .breadcrumb .breadcrumb-item:not(:nth-last-of-type(1))::after {
    content: ' >    ';
  }
</style>
