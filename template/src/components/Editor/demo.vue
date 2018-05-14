<template>
  <div>
      <div id="editorEl" style="text-align:left"></div>
      <button v-on:click="getContent">查看内容</button>
  </div>
</template>

<script>
  import editor from '@/mixins/editor';

  export default {
    name: 'YxyEditor',
    components: {},
    directives: {},
    filters: {},
    mixins: [ editor ],
    props: {},
    data() {
      return {
        editorContent: '',
        editor: '',
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 获取富文本内容 */
      getContent: function() {
        // window.text = this.editor;
        // debugger
        alert(this.editorContent);

      },
    }
  };
</script>

<style scoped>
  
</style>