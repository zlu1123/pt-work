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
 * return YYYY-MM-DD
 */
export const formatYYYYMMDD = date => {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
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

/**
 *
 * @param {身份证号码} ID
 */
export const checkID = ID => {
  if (typeof ID !== "string") return "非法字符串";
  const city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  const birthday =
    ID.substr(6, 4) +
    "/" +
    Number(ID.substr(10, 2)) +
    "/" +
    Number(ID.substr(12, 2));
  const d = new Date(birthday);
  const newBirthday =
    d.getFullYear() +
    "/" +
    Number(d.getMonth() + 1) +
    "/" +
    Number(d.getDate());
  const currentTime = new Date().getTime();
  const time = d.getTime();
  const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const arrCh = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  let sum = 0;
  let i;
  let residue;

  if (!/^\d{17}(\d|x)$/i.test(ID)) return false; // '非法身份证'
  if (city[ID.substr(0, 2)] === undefined) return false; // '非法地区'
  if (time >= currentTime || birthday !== newBirthday) return false; // '非法生日'
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== ID.substr(17, 1)) return false; // '非法身份证哦'

  return true;
  // return (
  //   city[ID.substr(0, 2)] +
  //   ',' +
  //   birthday +
  //   ',' +
  //   (ID.substr(16, 1) % 2 ? ' 男' : '女')
  // )
};
