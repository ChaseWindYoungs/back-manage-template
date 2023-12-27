import { isNullOrUnDefOrVct } from './is'

/**
 * @description: try catch
 * @param {function} 需要执行逻辑的函数
 * @param {any} 执行函数的参数
 * @return {array} [错误,数据]
 */
export async function tryCatch() {
  let args = Array.from(arguments)
  let asyncFunc = args.shift()
  try {
    let res = await asyncFunc(...args)
    return [null, res]
  } catch (e) {
    console.log(new Error(`Code block ${asyncFunc.name}\n${e.message || '请求服务失败，服务未响应！'}`))
    return [e, null]
  }
}

export const getAssetsFile = (url: any) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};


export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, "").trim();
  targetEl.className = flag ? `${className} ${clsName} ` : className;
}


// 节流
export function throttle(func, wait = 1000) {
  let timer: NodeJS.Timeout | null = null;
  return () => {
    if (timer) return;
    func.apply(this, arguments);
    timer = setTimeout(() => {
      timer = null;
    }, wait);
  };
};

// 防抖
export function debounce(func, wait = 300) {
  let timer = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(this, arguments);
      timer = null;
    }, wait);
  };
};

export function format(_row:any, _column:any, cellValue:any, _index:any) {
  if (['', null, undefined].includes(cellValue)) {
    return '--';
  }
  return cellValue;
}

/**
 *  将日期时间转换为指定格式，如：YYYY-mm-dd HH:MM表示2019-06-06 19:45
 *  let date = new Date()
 *  dateFormat("YYYY-mm-dd HH:MM", date)
 *  >>> 2019-06-06 19:45`
 */
export function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}


export function formatCell(row, column, cellValue, index) {
  if (isNullOrUnDefOrVct(cellValue)) {
    return '--';
  }
  return cellValue;
}

export function formatVal(value) {
  if(isNullOrUnDefOrVct(value)) {
    return '--';
  }
  return value;
}

export function getArrValue(arr = [], val, keyName = 'label', valName = 'value') {
  let key = '--'
  if (!arr?.length || isNullOrUnDefOrVct(val)) {
    return key
  }
  arr.forEach(i => {
    i[valName] == val && (key = i[keyName])
  })
  return key
}

export function downloadJSONFile(val, fileName) {
  let eleLink = document.createElement('a');
  eleLink.download = fileName ? `${fileName}.json` : 'data.json';
  eleLink.style.display = 'none';
  // 这里的data换成你想要导出的JavaScript对象
  let data = val
  let blob = new Blob([JSON.stringify(data, undefined, 2)], {type: 'text/json'})
  eleLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}

