/**
 * 判断文件
 * 
 * 如果你需要类型判断，请不要再使用 Object.prototype.toString.call()方法
 * 直接调用下方封装好的is函数即可
 */

const _toString = Object.prototype.toString;

const isType = (t: string, n: string): boolean => _toString.call(t) === `[object ${n}]`;

//判断非undefined
export const isDef = (val: any) => typeof val !== 'undefined';

//判断是undefined
export const isUnDef = (val: any) => !isDef(val);

//判断是否是对象
export const isObject = (val: null) => val !== null && toString.call(val) === `[object Object]`;

export const isEmpty = (val: { length?: any; size?: any; }) => {
    if (isArray(val) || isString(val)) return val.length === 0;
    if (val instanceof Map || val instanceof Set) return val.size === 0;
    if (isObject(val)) return Object.keys(val).length === 0;
    return false;
}

//判断是否是时间类型
export const isDate = (val: string) => isType(val, "Date");

//判断是否是空类型
export const isVacant = (val: null) => val === '';

//判断是否是null类型
export const isNull = (val: null) => val === null;

//判断不可访问类型
export const isNullAndUnDef = (val: any) => isUnDef(val) && isNull(val);

//判断undefined和null其中一个
export const isNullOrUnDef = (val: any) => isUnDef(val) || isNull(val);

//判断undefined和null其中一个
export const isNullOrUnDefOrVct = (val: any) => isUnDef(val) || isNull(val) || isVacant(val);

//判断是不是都是空
export const isAllEmpty = (t) => !!(isEmpty(t) || isNullOrUnDef(t))

//判断是否是数字类型
export const isNumber = (val: string) => isType(val, "Number");

//判断是否是Promise类型
export const isPromise = (val: string) => {
    return (
        isType(val, "Promise")
    )
}

//判断是否是字符类型
export const isString = (val: string) => isType(val, "String");

//判断是否为函数
export const isFunction = (val: any) => typeof val === "function";

//判断是否为booean类型
export const isBoolean = (val: string) => isType(val, "Boolean");

//判断是否是正则表达式
export const isRegExp = (val: string) => isType(val, "RegExp");

//判断是否是数组
export const isArray = (val: any) => val && Array.isArray(val);

//判断是否是window对象
export const isWindow = (val: string) => typeof window !== "undefined" && isType(val, "Window");

// 判断是不是URL
export const isUrl = (val: string) => {
    let reg = "^((https|http|ftp|rtsp|mms)?://)(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,5})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    return new RegExp(reg, "ig").test(val)
}

// 判断是否相等
export const isEqual = (first, second) => {
    let n = Object.prototype.toString.call(first);
    return n !== Object.prototype.toString.call(second)
        ? !1
        : n === "[object Object]"
            ? isisEqualObjectUrl(first, second)
            : n === "[object Array]"
                ? isEqualArray(first, second)
                : n === "[object Function]"
                    ? first === second
                        ? !0
                        : first.toString() === second.toString()
                    : first === second
}

// 判断是否是相等的Object
export const isisEqualObjectUrl = (first, second) => {
    if (first === second) return !0;
    if (typeof first != "object" || typeof second != "object" || first == null || second == null) return !1;
    let n = Object.keys(first),
        r = Object.keys(second);
    if (n.length !== r.length) return !1;
    for (let o of n) if (!r.includes(o) || !isisEqualObjectUrl(first[o], second[o])) return !1;
    return !0
}

// 判断是否是相等的Array
export const isEqualArray = (first, second) => {
    if (!first || !second) return !1;
    let { length: n } = first;
    if (n !== second.length) return !1;
    for (let r = 0; r < n; r++)
        if (!isEqual(first[r], second[r])) return !1;
    return !0
}