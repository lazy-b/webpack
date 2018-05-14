var utils = {
  httpGet(that, url, params, successCB, errorCB) {
    this.http(that, 'get', url, params, successCB, errorCB);
  },
  httpPost(that, url, params, successCB, errorCB) {
    this.http(that, 'post', url, params, successCB, errorCB);
  },
  /**
   * 用于处理同步请求
   * @param  {[type]} that      [vue 的 this 对象]
   * @param  {[type]} url       [请求url]
   * @param  {[type]} params    [请求类型  type，传参 data 等]
   * @param  {[type]} successCB [成功时的回调]
   * @param  {[type]} errorCB   [失败时的回调]
   * @return {[type]}           [无]
   */
  ajax(that, url, params, successCB, errorCB) {
    var obj = new XMLHttpRequest(); // XMLHttpRequest对象用于在后台与服务器交换数据
    var type = params.type || 'GET';
    var data = null;
    if (params && params.params) {
      data = this.parseToString(params.params);
    }

    var connector = url.indexOf('?') > -1 ? '&' : '?';
    if (type === 'GET') {
      url += connector + data;
    }
    // connector = url.indexOf('?')>-1?'&':'?';
    // url += connector +'_='+ new Date().getTime();  // 加上随机数防缓存

    obj.open(type, url, false);
    // obj.withCredentials = true; // 跨域可带cookie
    obj.onreadystatechange = function() {
      if ((obj.readyState == 4 && obj.status == 200) || obj.status == 304) {
        // readyState==4说明请求已完成
        var rs = JSON.parse(obj.responseText);
        if (rs.code === 0 && typeof successCB === 'function') {
          successCB(rs);
        } else if (typeof errorCB === 'function') {
          errorCB();
        }
      }
    };
    //  var data = null;
    // if(type === 'POST' && params && params.params){
    // 	data = this.parseToString(params.params)
    // }
    obj.send(data);
  },
  /**
   * 封装了vue-resource里的http请求
   * @param  {[type]} url       [description]
   * @param  {[type]} params    [附加参数:pm 请求参数, successMsg 操作提示]
   * @param  {[type]} successCB [成功时的回调]
   * @param  {[type]} errorCB   [失败时的回调]
   */
  http(that, type, url, params, successCB, errorCB) {
    let pm = null,
      successMsg = null,
      errorMsg = null;
    // 参数处理
    if (params) {
      if (params.pm) {
        pm = params.pm;
      }
      if (params.successMsg) {
        successMsg = params.successMsg;
      }
      if (params.errorMsg) {
        errorMsg = params.errorMsg;
      }
    }
    // debugger
    let deferred = null;
    if (type === 'get') {
      deferred = that.$http.get(url, {
        params: pm
      });
    } else if (type === 'post') {
      deferred = that.$http.post(url, pm);
    }
    deferred.then(rs => {
      // debugger
      if (rs.data.code === 0) {
        if (successMsg) {
          that.$message({
            showClose: true,
            message: successMsg,
            type: 'success',
            duration: 3000
          });
        }

        if (typeof successCB === 'function') {
          successCB(rs);
        }
      } else {
        errorMsg = errorMsg || rs.data.msg;
        that.$message({
          showClose: true,
          message: errorMsg,
          type: 'error',
          duration: 3000
        });

        if (typeof errorCB === 'function') {
          errorCB();
        }
      }
    });
  },

  parseToString(param, splitKey) {
    var arr = []
    ;(param = param || {}), (splitKey = splitKey || '&');
    for (var i in param) {
      arr.push(i + '=' + param[i]);
    }
    return arr.join(splitKey);
  },

  getKeyArray(items, key) {
    let rs = [];
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].hasOwnProperty(key)) {
        rs.push(items[i][key]);
      }
    }
    return rs;
  },
  /**
   * 丢掉 ‘_’开头的参数
   * 并把 abc__list[]-》{a,b,c}(以逗号隔开)
   * 过滤空参数
   * zz_开始的为日期对象，处理为毫秒后，属性名去掉zz
   */
  filterParam(pm) {
    let rsPm = {};
    for (let key in pm) {
      if (pm[key] && pm[key] != '' && key !== 'total') {
        if (key.indexOf('__') > 0) {
          // TODO 改用正则
          if (pm[key].length > 0) {
            // book__list =[1,2] ==> book='{1,2}';
            rsPm[key.substring(0, key.indexOf('__'))] = pm[key].join(',');
          }
        } else if (key.startsWith('_')) {
          continue;
        } else if (key.startsWith('zz_')) {
          // zz开始的为日期对象，处理为毫秒后，属性名去掉zz
          rsPm[key.substring(3)] =
            typeof pm[key] === 'number' ? pm[key] : pm[key].getTime();
        } else {
          rsPm[key] = pm[key];
        }
        // delete pm[key]
      }
    }
    return rsPm;
  },
  formatTime(time) {
    let date = new Date(time);
    let [year, month, day, hour, minute, second] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ];
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    let value =
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return value;
  },
  formatTimes(time) {
    let date = new Date(time);
    let [year, month, day] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ];
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    let value = year + '-' + month + '-' + day;
    return value;
  },
  // 校验数字最小值
  minNum: (rule, value, callback) => {
    let min = rule.param;
    let msg = rule.message || '请输入大于' + min + '的整数';
    if (!/^[0-9]{0,9}$/.test(value) || parseInt(value) <= min) {
      callback(new Error(msg));
    } else {
      callback();
    }
  },
  /**
   * 数组去重
   * @param  array {Array}     需要去重的数组
   * @return  result {Array}    返回去重后的数组
   */
  unique(array) {
    var unique = {};
    array.forEach(obj => {
      unique[JSON.stringify(obj)] = obj;
    });
    return Object.keys(unique).map(u => {
      return JSON.parse(u);
    });
  }
};
export default utils;
