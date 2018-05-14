/**
 * File: index.js
 * Project: yxy-admin
 * File Created: 2018-02-03 8:44:47 pm
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-02-03 8:47:30 pm
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright 2017 - MeiCloud, MeiCloud
 */

import E from 'wangeditor';
import { FILE_UPLOAD } from '@/api/url';
export default {
  data() {
    return {
      editorContent: '',
      editor: '',
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
    });
  },
  methods: {
    /** --------------- 说明 -------------  */
    /** 初始化 */
    init() {
      // 初始化
      const editor = new E('#editorEl');

      editor.customConfig.onchange = (html) => {
        this.editorContent = html;
      };
      // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
      // editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
      // editor.customConfig.uploadImgServer = '/upload';  // 上传图片到服务器
      // 将图片大小限制为 3M
      // editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
      // 限制一次最多上传 5 张图片,默认为 10000 张（即不限制）
      // editor.customConfig.uploadImgMaxLength = 5;
      // 隐藏“网络图片”tab
      editor.customConfig.showLinkImg = false;
      // 上传图片时，可自定义filename，即在使用formdata.append(name, file)添加图片文件时，自定义第一个参数。
      editor.customConfig.uploadFileName = 'file';
      editor.customConfig.uploadImgServer = FILE_UPLOAD;
      // 将 timeout 时间改为 30s
      editor.customConfig.uploadImgTimeout = 30000;
      editor.customConfig.uploadImgHooks = {
        before: function() {
        // before: function(xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function() {
        // success: function(xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          // console.log(xhr);
        },
        fail: function() {
        // fail: function(xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function() {
        // error: function(xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function() {
        // timeout: function(xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function(insertImg, result) {
        // customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          if (!result.code) {
            var url = result.data.path;
            insertImg(url);
          }
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };
      // 上传图片的错误提示默认使用alert弹出，你也可以自定义用户体验更好的提示方式
      editor.customConfig.customAlert = function(info) {
        // info 是需要提示的内容
        alert('自定义提示：' + info);
      };

      // 自定义菜单配置
      editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        // 'link',  // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ];

      editor.create();

      this.editor = editor;
    },
    setContent(html) {
      return this.editor.txt.html(html);
    }
  }
};
