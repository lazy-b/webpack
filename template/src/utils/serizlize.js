/*
* @Author: yang
* @Date:   2018-01-02 19:43:16
* @Last Modified by:   lazy1993
* @Last Modified time: 2018-01-11 10:46:52
*/
/**
 * 格式化请求数据
 * @param  {Object} data 请求的表单数据
 * @return {Object}      格式化之后的后台需要的数据
 */
export function serialize(data) {
  const result = {};

  for (let item in data) {
    if (data.hasOwnProperty(item)) {
      // 空值不传
      if (data[item] === '' || data[item] === undefined) {
        continue;
      }

      // 日期转换为时间戳
      if (data[item] instanceof Date) {
        result[item] = +data[item];
        continue;
      }

      result[item] = data[item];
    }
  }

  return result;
}
