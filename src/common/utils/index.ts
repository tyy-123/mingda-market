export * from './md5';
// export * from './upload';
export * from './user';

import { getToken } from './user';
import _, { isNumber } from 'lodash';

// 手机号校验
export const REX_PHONE = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
// 姓名
export const REX_NAME = /^[\u4e00-\u9fa50-9A-Za-z]+$/;
// 密码
export const REX_PWD = /^(?=.*\d)[A-Za-z\d][\s\S]{6,}$/;
//邮箱
export const REX_EMAIL = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
// 护照
export const REX_PASSPORT = /^[a-zA-Z0-9]{5,17}$/;
// 身份证
export const REX_ID_CARD = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 银行卡号
export const REX_CREDIT = /^(?!0{16})[0-9]{16,19}$/;
// 满足校验身份证号或者护照其中一个
export const REX_PASSPORT_ID = /^(?=.*\d)[a-zA-Z\d]{6,}$|^(?=.*\d)[a-zA-Z\d]{1,2}[0-9]{5,10}$/;

//限制中英数
export const REX_ACCOUNT = /^[\u4e00-\u9fa50-9A-Za-z]+$/;

export function listToTree(list: any[], pid: any, root = 0) {
  if (!list?.length) return [];
  const map: any = {};
  const tree: any[] = [];
  list.forEach((item) => {
    map[item.id] = item;
    // item.children = [];
  });
  list.forEach((item) => {
    const parentId = item[pid];
    if (parentId?.toString() !== root?.toString()) {
      if (map[parentId]?.children?.length) {
        map[parentId]?.children.push(item);
      } else {
        map[parentId]['children'] = [item];
      }
    } else {
      tree.push(item);
    }
  });
  return tree;
}

/**
 * post方式下载
 * @param url
 * @param name
 */
export const download = (url: string, data: Array<number>, name = '') => {
  const token = getToken();
  fetch(`/api${url}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      authorization: token ? token : '',
    }),
  })
    .then((response) => {
      response.blob().then((blob) => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = window.URL.createObjectURL(blob);
        a.download = name || url;
        // a.download = url;
        a.click();
        document.body.removeChild(a);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * get方式下载
 * @param url
 * @param fileName
 */
export function getDownFile(url: string, fileName: string) {
  const x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = function () {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };
  x.send();
}

export function dataURLtoFile(dataUri: string, filename: string = '') {
  // 获取到base64编码
  const arr = dataUri.split(',');
  // 将base64编码转为字符串
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n); // 创建初始化为0的，包含length个元素的无符号整型数组
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: 'image/jpeg',
  });
}

export function orderListToOrderTree(list: any[], pid: any, root = 0) {
  const map: any = {};
  const tree: any[] = [];
  list.forEach((item) => {
    map[item.conceptId] = item;
    item.key = item.id;
    item.children = [];
  });
  list.forEach((item) => {
    const parentId = item[pid];
    if (parentId?.toString() !== root?.toString()) {
      map[parentId]?.children.push(item);
    } else {
      tree.push(item);
    }
  });
  for (let item in map) {
    if (map[item].children.length) {
      map[item].children = _.orderBy(map[item].children, ['orderNum'], ['asc']);
    }
  }
  return _.orderBy(tree, ['orderNum'], ['asc']);
}

/**
 * 根据对象某一个属性对数组去重
 * @param arr  数组
 * @param attrName 需要去重属性名称
 * @returns 去重数组
 */
export function uniqueArrByAttrName(arr: Array<any>, attrName: string) {
  let attrArr: Array<any> = [];
  let uniqueArr: Array<any> = [];
  for (let i in arr) {
    if (attrArr.indexOf(arr[i][`${attrName}`]) === -1) {
      attrArr.push(arr[i][`${attrName}`]);
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
}

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// 创建节点路径
export const createPath = (
  paths: (string | number)[][],
  offsetX = 0,
  offsetY = 0,
) => {
  if (!paths.length) {
    return null;
  }
  let path = '';
  // @ts-ignore
  paths.forEach((item: IPath) => {
    const [c, x, y, c2x, c2y] = item;
    path += isNumber(y) ? ` ${c} ${x + offsetX} ${y + offsetY}` : ` ${c}`;
    if (c2y) {
      path += ` ${c2x + offsetX} ${c2y + offsetY}`;
    }
  });

  return path;
};

//获得当前日期
export const getNowDate = () => {
  let timestamp = Date.parse(new Date() as any);
  let date = new Date(timestamp);
  //获取年份
  let Y = date.getFullYear();
  //获取月份
  let M =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  //获取当日日期
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return Y + '-' + M + '-' + D;
};

//树形结构转化为展平数组
export const treeToList = (tree: any, listData: any[]) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    listData.push({ ...node });
    if (node?.children) {
      treeToList(node.children, listData);
    }
  }
  return listData;
};

//通过时间获取时间描述
export const getDescribeTime = (dateTime: any) => {
  // 用毫秒表示分钟、小时、天、周、月
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let week = day * 7;
  let month = day * 30;
  // 获取当前时间并转换为时间戳，方便计算
  let timestamp_current = new Date().getTime();

  // 将传入的时间格式字符串解析为Date对象
  let _date = new Date(dateTime);

  // 将Date对象转换为时间戳，方便计算
  let timestamp_input = _date.getTime();

  // 计算当前时间与传入的时间之间相差的时间戳
  let timestamp_diff = timestamp_current - timestamp_input;

  // 计算时间差共有多少个分钟
  let minC: any = timestamp_diff / minute;
  // 计算时间差共有多少个小时
  let hourC: any = timestamp_diff / hour;
  // 计算时间差共有多少个天
  let dayC: any = timestamp_diff / day;
  // 计算时间差共有多少个周
  let weekC: any = timestamp_diff / week;
  // 计算时间差共有多少个月
  let monthC: any = timestamp_diff / month;

  if (monthC >= 1 && monthC < 4) {
    return parseInt(monthC) + '月前';
  } else if (weekC >= 1 && weekC < 4) {
    return parseInt(weekC) + '周前';
  } else if (dayC >= 1 && dayC < 7) {
    return parseInt(dayC) + '天前';
  } else if (hourC >= 1 && hourC < 24) {
    return parseInt(hourC) + '小时前';
  } else if (minC >= 1 && minC < 60) {
    return parseInt(minC) + '分钟前';
  } else if (timestamp_diff >= 0 && timestamp_diff <= minute) {
    // 时间差大于0并且小于1分钟
    return '刚刚';
  } else {
    return (
      _date.getFullYear() +
      '年' +
      _date.getMonth() +
      '月' +
      _date.getDate() +
      '日'
    );
  }
};
