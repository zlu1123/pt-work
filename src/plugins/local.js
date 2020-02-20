import CryptoJS from "crypto-js";

const keyCode = "lsgxmgwwzl202001";

/* 加密 */
const encrypt = word => {
  // 更新：这个key的字符位数要求：4的倍数（包含""）
  var key = CryptoJS.enc.Utf8.parse(keyCode); // 123456789abc这个自己随便写，相当于密钥吧，也可以自己单独用个变量存
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB
  });
  return encrypted.toString();
};
/* 解密 */
const decrypt = word => {
  var key = CryptoJS.enc.Utf8.parse(keyCode); // 要和加密的密钥一样
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

// local操作
const localData = (method, name, obj) => {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:localStorage的名称
   * obj:存入的内容，可以是任意类型
   * returnData: get时返回
   * localStorage.getItem(key):获取指定key本地存储的值
   * localStorage.setItem(key,value)：将value存储到key字段
   * localStorage.removeItem(key):删除指定key本地存储的值
   * */
  let returnData = "";
  switch (method) {
    case "get":
      if (localStorage.getItem(name + "_obj")) {
        returnData = JSON.parse(decrypt(localStorage.getItem(name + "_obj")));
      } else if (localStorage.getItem(name + "_str")) {
        returnData = decrypt(localStorage.getItem(name + "_str"));
      }
      break;
    case "set":
      if (typeof obj === "object") {
        localStorage.setItem(name + "_obj", encrypt(JSON.stringify(obj)));
      } else {
        localStorage.setItem(name + "_str", encrypt(obj));
      }
      break;
    case "clean":
      localStorage.removeItem(name + "_obj");
      localStorage.removeItem(name + "_str");
      break;
  }
  if (method === "get") {
    return returnData;
  }
};

// session操作
const sessionData = (method, name, obj) => {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:session的名称
   * obj:存入的内容，可以是任意类型
   * returnData: get时返回
   * */
  let returnData = "";
  switch (method) {
    case "get":
      if (sessionStorage.getItem(name + "_obj")) {
        returnData = JSON.parse(decrypt(sessionStorage.getItem(name + "_obj")));
      } else if (sessionStorage.getItem(name + "_str")) {
        returnData = decrypt(sessionStorage.getItem(name + "_str"));
      }
      break;
    case "set":
      if (typeof obj === "object") {
        sessionStorage.setItem(name + "_obj", encrypt(JSON.stringify(obj)));
      } else {
        sessionStorage.setItem(name + "_str", encrypt(obj));
      }
      break;
    case "clean":
      sessionStorage.removeItem(name + "_obj");
      sessionStorage.removeItem(name + "_str");
      break;
  }
  if (method === "get") {
    return returnData;
  }
};

export { localData, sessionData };
