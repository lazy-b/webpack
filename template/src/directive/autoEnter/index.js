
// 监听enter键并触发对应监听函数，同时支持click事件触发
// 注册一个全局自定义指令 `v-focus`
export default {
  bind: function(el, binding) {
    // 解除绑定标识
    const href = window.location.href;
    document.addEventListener('keypress', (event) => {
      const newHref = window.location.href;
      if (href !== newHref) {
        document.removeEventListener('keypress', binding.value);

        return;
      }

      if (event.key === 'Enter') {
        binding.value();
      }
    });

    el.addEventListener('click', (event) => {
      binding.value();
      event.stopPropagation();
    });
  },
  unbind: function(el, binding) {
    document.removeEventListener('keypress', binding.value);
  }
};
