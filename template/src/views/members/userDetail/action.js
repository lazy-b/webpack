// import Api from '@/api/marketingCenter/vip';
let _this;
// 初始化
export const init = that => {
  _this = that;
};

const handleCurrentChange = val => {
  _this.form.pageIndex = val;
  _this.getList();
};
const handleSizeChange = val => {
  _this.form.pageSize = val;
  _this.getList();
};
export default {
  init,
  handleCurrentChange,
  handleSizeChange
};
