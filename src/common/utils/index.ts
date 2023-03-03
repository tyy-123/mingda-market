export * from './md5';
// export * from './upload';
export * from './user';

import { getToken } from './user';
import _, { isNumber } from 'lodash';

// 手机号校验
export const REX_PHONE =
  /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
// 姓名
export const REX_NAME = /^[\u4e00-\u9fa50-9A-Za-z]+$/;
// 密码
export const REX_PWD = /^(?=.*\d)[A-Za-z\d][\s\S]{6,}$/;
//邮箱
export const REX_EMAIL =
  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
// 护照
export const REX_PASSPORT = /^[a-zA-Z0-9]{5,17}$/;
// 身份证
export const REX_ID_CARD =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 银行卡号
export const REX_CREDIT = /^(?!0{16})[0-9]{16,19}$/;
// 满足校验身份证号或者护照其中一个
export const REX_PASSPORT_ID =
  /^(?=.*\d)[a-zA-Z\d]{6,}$|^(?=.*\d)[a-zA-Z\d]{1,2}[0-9]{5,10}$/;

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
      accessToken: token ? token : '',
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
