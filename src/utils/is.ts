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
    return;
}

//判断是否是时间类型
export const isDate = (val: string) => isType(val, "Date");

//判断是否是null类型
export const isNull = (val: null) => val === null;

//判断不可访问类型
export const isNullAndUnDef = (val: any) => isUnDef(val) && isNull(val);

//判断undefined和null其中一个
export const isNullOrUnDef = (val: any) => isUnDef(val) || isNull(val);

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