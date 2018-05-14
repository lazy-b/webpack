import { sms } from '@/api/marketingCenter/sms';
let _this;
// 初始化
export const init = that => {
  _this = that;
};
export const resetSearch = () => {
  _this.searchForm = {
    pageIndex: 1,
    pageSize: 10,
    title: '',
    status: ''
  };
  getList();
};
export const getList = () => {
  // _this.searchResult.isLoading = true;
  sms.SmsList(_this.searchForm).then(res => {
    if (res.data.code === 0) {
      // this.searchResult.isLoading = false;
      _this.searchResult.list = res.data.data.list || [];
      _this.searchResult.total = res.data.data.total;
    } else {
      this.searchResult.isLoading = false;
    }
  });
};
//  分页查询,页数条数查询
export const handleSizeChange = val => {
  _this.searchForm.pageSize = val;
  getList();
};
// 分页 查询，当前页查询
export const handleCurrentChange = val => {
  _this.searchForm.pageIndex = val;
  getList();
};
export default {
  init,
  resetSearch,
  getList,
  handleSizeChange,
  handleCurrentChange
};
