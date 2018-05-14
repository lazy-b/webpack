/**
 * File: index.js
 * Project: yxy-admin
 * File Created: 2018-02-05 12:59:05 am
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-02-05 11:30:32 am
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright © 2017 - MeiCloud, MeiCloud
 */
export default {
  data() {
    return {
      // 激活的tab
      activeName: 'first',
    };
  },
  methods: {
    /** --------------- tab -------------  */
    handleTabsClick(tab) {
      if (tab.name === 'zero') {
        return;
      }

      this.activeName = tab.name;
    },
  }
};
