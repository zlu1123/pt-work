import { baseUrlConfig } from "./baseUrl";
export const enRoll = baseUrlConfig.proxyURL + "/worker/position/enRoll";
export const userLogin = baseUrlConfig.proxyURL + "/user/login";
export const applyList = baseUrlConfig.proxyURL + "/postionApply/applyList"; // 待审核
export const applyExam = baseUrlConfig.proxyURL + "/postionApply/applyExam";
export const getPayRoll = baseUrlConfig.proxyURL + "/worker/mine/GetPayRoll"; // 发工资
export const insertEnterprise =
  baseUrlConfig.proxyURL + "/enterpriseRelease/insert"; // 企业发布新增
export const insertEnterpriseDirector =
  baseUrlConfig.proxyURL + "/enterpriseDirector/insert"; // 企业负责人新增
export const queryPosition = baseUrlConfig.proxyURL + "/common/queryPosition"; // 企业列表
export const positionInfo =
  baseUrlConfig.proxyURL + "/postionRelease/positionInfo"; // zhiwei xiangqing
export const disRoll = baseUrlConfig.proxyURL + "/worker/operation/disRoll";
export const clockInOrSignOut =
  baseUrlConfig.proxyURL + "/worker/mine/clockInOrSignOut"; // 打卡ID
export const queryCurrentDayClock =
  baseUrlConfig.proxyURL + "/worker/mine/queryCurrentDayClock"; // 查询打卡信息

export const enterpisePunchCardRecord =
  baseUrlConfig.proxyURL + "/enterpise/punchCardRecord"; // 企业查询打卡信息
