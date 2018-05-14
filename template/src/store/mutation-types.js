/*
 * File: mutation-types.js
 * Project: <<projectname>>
 * File Created: 2018-05-14 2:50:48 pm
 * Author: xiongyang (yang.xiong@meicloud.com)
 * -----
 * Last Modified: 2018-05-14 3:01:05 pm
 * Modified By: xiongyang (yang.xiong@meicloud.com>) (<<git>>)
 * -----
 * Copyright © 2018 - MeiCloud, MeiCloud
 */

// 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
// 这样可以使 linter 之类的工具发挥作用，
// 同时把这些常量放在单独的文件中
// 可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

/** user.js */
// 设置用户id(用不到)
// export const USER_SET_USERID = 'USER_SET_USERID';
// 设置用户个人信息
export const USER_SET_USER_INFO = 'USER_SET_USER_INFO';
// 设置用户菜单
export const USER_SET_MENU = 'USER_SET_MENU';
// 设置用户语言
export const USER_SET_LANGUAGE = 'USER_SET_LANGUAGE';
