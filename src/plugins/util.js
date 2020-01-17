// 截取code
export const getUrlParams = parameName => {
  /// 获取地址栏指定参数的值
  /// <param name="parameName">参数名</param>
  // 获取url中跟在问号后面的部分
  let parames = window.location.search;
  // 检测参数是否存在
  if (parames.indexOf(parameName) > -1) {
    let parameValue = "";
    parameValue = parames.substring(
      parames.indexOf(parameName),
      parames.length
    );
    // 检测后面是否还有参数
    if (parameValue.indexOf("&") > -1) {
      // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
      parameValue = parameValue.substring(0, parameValue.indexOf("&"));
      // 去掉参数名, 得到最终纯值字符串
      parameValue = parameValue.replace(parameName + "=", "");
      return parameValue;
    }
    return "";
  }
};

export const formatDateTime = date => {
  let time = new Date(Date.parse(date));
  time.setTime(time.setHours(time.getHours() + 8));

  let Y = time.getFullYear() + "-";
  let M = addZero(time.getMonth() + 1) + "-";
  let D = addZero(time.getDate()) + " ";
  let h = addZero(time.getHours()) + ":";
  let m = addZero(time.getMinutes()) + ":";
  let s = addZero(time.getSeconds());
  return Y + M + D + h + m + s;
};

// 数字补0操作
export const addZero = num => {
  return num < 10 ? "0" + num : num;
};

/**
 * return YYYYMMDD
 */
export const formatDate = date => {
  let time = new Date(Date.parse(date));
  time.setTime(time.setHours(time.getHours() + 8));

  let Y = time.getFullYear();
  let M = addZero(time.getMonth() + 1);
  let D = addZero(time.getDate());
  return Y + M + D;
};

/**
 * return YYYY年MM月DD
 */
export const formatDateYYYYMMDD = date => {
  return (
    date.slice(0, 4) + "年" + date.slice(4, 6) + "月" + date.slice(6, 8) + "日"
  );
};

/**
 * return MM月DD日
 */
export const formatDateMMDD = date => {
  return date.slice(4, 6) + "月" + date.slice(6, 8) + "日";
};

/**
 * 根据起始日期和结束日期计算天数
 */
export const dateDiff = (sDate1, sDate2) => {
  let oDate1, oDate2, iDays;
  oDate1 = new Date(
    sDate1.substring(0, 4) +
      "-" +
      sDate1.substring(4, 6) +
      "-" +
      sDate1.substring(6, 8)
  );
  oDate2 = new Date(
    sDate2.substring(0, 4) +
      "-" +
      sDate2.substring(4, 6) +
      "-" +
      sDate2.substring(6, 8)
  );
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
  return iDays;
};
