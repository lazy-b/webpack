const smsMgr = () => import('@/views/marketingCenter/marketingTool/smsMgr/index');
const editSmsBatch = () => import('@/views/marketingCenter/marketingTool/smsMgr/editSmsBatch');
const editSmsP2P = () => import('@/views/marketingCenter/marketingTool/smsMgr/editSmsP2P');
/** 短信模块 **/
export const sms = [
  {
    path: 'smsMgr',
    component: smsMgr,
    name: 'smsMgr'
  },
  {
    path: 'editSmsBatch',
    component: editSmsBatch,
    name: 'editSmsBatch'
  },
  {
    path: 'editSmsP2P',
    component: editSmsP2P,
    name: 'editSmsP2P'
  }
];
