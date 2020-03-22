import { baseUrlConfig } from "./baseUrl";
export const enRoll = baseUrlConfig.proxyURL + "/worker/position/enRoll";

export const userLogin = baseUrlConfig.proxyURL + "/user/login";

export const applyList = baseUrlConfig.proxyURL + "/postionApply/applyList"; // 待审核

export const applyExam = baseUrlConfig.proxyURL + "/postionApply/applyExam";

export const getPayRoll = baseUrlConfig.proxyURL + "/worker/mine/GetPayRoll"; // 发工资

// 企业发布新增
export const insertEnterprise =
  baseUrlConfig.proxyURL + "/enterpriseRelease/insert";
// 企业负责人新增
export const insertEnterpriseDirector =
  baseUrlConfig.proxyURL + "/enterpriseDirector/insert";
// 企业列表
export const queryPosition = baseUrlConfig.proxyURL + "/common/queryPosition";
// 职位信息详情
export const positionInfo =
  baseUrlConfig.proxyURL + "/postionRelease/positionInfo";

// 取消报名
export const disRoll = baseUrlConfig.proxyURL + "/worker/operation/disRoll";

// 打卡ID
export const clockInOrSignOut =
  baseUrlConfig.proxyURL + "/worker/mine/clockInOrSignOut";

// 查询打卡信息
export const queryCurrentDayClock =
  baseUrlConfig.proxyURL + "/worker/mine/queryCurrentDayClock";

// 企业查询打卡信息
export const enterpisePunchCardRecord =
  baseUrlConfig.proxyURL + "/enterpise/punchCardRecord";

// 平台查询打卡信息
export const platformerPunchCardRecord =
  baseUrlConfig.proxyURL + "/platformer/punchCardRecord";

// 查询微信相关信息
export const getWechatSign = baseUrlConfig.proxyURL + "/wxjs/getWechatSign";

// 广告查询-分页
export const noticeAdPage = baseUrlConfig.proxyURL + "/noticeAd/page";

// 获取openID
export const getOpenId = baseUrlConfig.proxyURL + "/wxjs/getOpenId";

// 个人信息
export const getUserInfo = baseUrlConfig.proxyURL + "/worker/mine/userInfo";

// 个人信息维护
export const updateUserInfoMath =
  baseUrlConfig.proxyURL + "/worker/mine/userInfoMatn";

// 图片上传
export const uploadImageUrl = baseUrlConfig.proxyURL + "/uploadImage/upload";

// 结算信息
export const queryBillInfo =
  baseUrlConfig.proxyURL + "/worker/operation/queryBillInfo";

// 结算打卡记录
export const queryClockIn =
  baseUrlConfig.proxyURL + "/worker/operation/queryClockIn";

// 工资单
export const payRollInfo = baseUrlConfig.proxyURL + "/worker/mine/payRollInfo";

// 健康证认证
export const upLoadHealthCert =
  baseUrlConfig.proxyURL + "/worker/mine/healthCert";

// 身份证认证
export const usrIdtfyCert =
  baseUrlConfig.proxyURL + "/worker/mine/usrIdtfyCert";

// 充值
export const enterpiseRecharge = baseUrlConfig.proxyURL + "/enterpise/recharge";

// 查询企业列表
export const enterpriseReleasePage =
  baseUrlConfig.proxyURL + "/enterpriseRelease/page";

// 查询职位列表
export const postionReleasePage =
  baseUrlConfig.proxyURL + "/postionRelease/page";

// 添加银行卡
export const cardAdd = baseUrlConfig.proxyURL + "/worker/cardAdd";

// 银行卡列表
export const cardQuery = baseUrlConfig.proxyURL + "/worker/cardQuery";

// 支付完成上传接口
export const rechargeCallBack =
  baseUrlConfig.proxyURL + "/enterpise/rechargeCallBack";

// 平台打卡审核
export const examCardRecordList =
  baseUrlConfig.proxyURL + "/platformer/examCardRecordList";

// 企业打卡审核
export const enterpiseExamCardRecordList =
  baseUrlConfig.proxyURL + "/enterpise/examCardRecordList";

// 用户登出
export const userLoginOut = baseUrlConfig.proxyURL + "/user/loginOut";
