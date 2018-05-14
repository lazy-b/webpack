/**
 * File: validate.js
 * Project: yxy-admin
 * File Created: 2018-01-22 9:55:19 am
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-02-28 1:58:20 pm
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright © 2017 - MeiCloud, MeiCloud
 */
// 引入示范
// import { xxx } from "@/utils/validate";

// 统一定义正则表达式，提供给下面的`isReasonable`方法，方便后续有修改
// 允许单独使用正则，但是不建议这样做，应该再在下面定义一个函数供外面调用
// 下面是`element-ui`调用验证规则的几种方式
// mobile: [
//   { validator: validateMobile, trigger: 'blur' },
//   { required: true, message: '请输入手机号', trigger: 'blur' },
//   { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
// ],
export const regExps = {
  // 用户密码
  password: /^[a-zA-Z0-9]{6,20}$/,
  // 用户名
  username: /^[a-zA-Z0-9]{6,20}$/,
  // 居民省份证
  PID: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 手机号码
  mobile: /(^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-9]))|(18[0,5-9]))\d{8}$)/,
  // email
  email: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,
  // 短信验证码
  smsCode: /^\d{6}$/,
  // 图片验证码
  imgCode: /^\d{4}$/,
  // 数字（element-ui自带的不能检查出：1.1a这种类型的输入）
  number: /^\d*\.?\d*$/,
  // 整数（element-ui自带的不能检查出：1a这种类型的输入）
  integer: /^\d*$/,
};

/**
 * 是否能够通过指定的正则校验
 * @param {Object} options 传入配置项，属性说明在下面
 * @param {String} regType 使用的正则表达式，传入上面regExps对象中的属性名
 *                         没有传入有效的验证类型时则不做任何校验，且通过校验
 * @param {String} message 校验失败提示信息
 * @param {Boolean} boolean 目标是否必须，默认必须
 * 调用示例如下：
    rules: {
      mobile: [
        { required: true, message: '手机号不能为空哦~', trigger: 'blur' },
        { validator: isReasonable({ regType: 'mobile', message: '这手机号不太对哦~' }), trigger: 'blur' },
      ],
    }
 */
export const isReasonable = (options = {}) => (rule, value, callback) => {
  const message = options.message ? options.message : '输入有点不正确哦~';
  const regType = options.regType;
  const boolean = options.boolean;
  const regExp = regExps[regType];

  // 没有传入有效的验证类型时则不做任何校验，且通过校验
  if (typeof regExp === 'undefined') {
    callback();
    return;
  }

  // 允许目标为空时
  if (boolean && !value) {
    callback();
    return;
  }

  const isReasonable = regExp.test(value);
  if (!isReasonable.test(value)) {
    callback(new Error(message));
  } else {
    callback();
  }
};
