/**
 * 短信模块接口
 */
export const toSearchUser = '/sms/toSearchUser'; // 大数据取数入口
export const getEvents = '/sms/activityEvents'; // 获取发送列表
export const getEventDetail = '/sms/getEventDetail';
export const effectAnalysis = '/ccrm2/smsEffect/prodBaseQuery'; // 短信效果
export const effectArea = '/ccrm2/smsEffect/prodPurchaseAnalysis';
export const getOrgMsg = '/sms/getOrgMsg'; // 获取主体信息
export const uploadSmsP2P = '/sms/uploadUserForP2P';// 短信用户内容上传
export const uploadSmsBatch = '/sms/uploadUserForBatch';
export const sendEvents = '/sms/newEvent'; // 提交短信
export const updateEvent = '/sms/updateEvent';// 修改短信
export const delEvent = '/sms/deleteById'; // 删除未投放的短信
export const getUserForBatch = '/sms/getUserForBatch'; // 从大数据获取发送目标用户文件
export const testSmsSend = '/sms/testSms'; // 测试短信发送
/**
 * 短信模块接口
 */

/**
 * 会员模块接口
 */
export const vipDetail = '/vip/member'; // 会员详情
export const transactionList = '/vip/member/transactionList'; // 会员消费记录
export const pointList = '/vip/member/pointList'; // 会员积分记录
export const couponList = '/vip/member/couponList'; // 会员券信息
/**
 * 标签模块
 */
export const listMemberTag = '/vip/tag/listMemberTag'; // 标签列表
export const memberUpdate = '/vip/tag/memberUpdate'; // 标签列表
export const memberDelete = '/vip/tag/memberDelete'; // 标签列表
export const memberSave = '/vip/tag/memberSave'; // 标签列表
/**
 * 会员分组模块
 */
export const groupUpdate = '/vip/group/update'; // 修改分组
export const groupList = '/vip/group/list'; // 分组列表
export const groupDelete = '/vip/group/delete'; // 删除分组
export const groupSave = '/vip/group/save'; // 新增分组
