 // 获取时间yyy-mmm-ddd
export function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//常用的正则校验
export const reg = {
    phone:/^1[0-9]{10}$/, //匹配手机号
    pass:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, // 匹配8-16位数字和字母密码的正则表达式
    id:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证
    ip:/\d+\.\d+\.\d+\.\d+/,// 匹配ip地址
    cn:/^[\u4e00-\u9fa5]*$/, //匹配中文
    qq:/[1-9][0-9]{4,}/, // 匹配腾讯QQ号
}
//检测平台（设备）类型
export const os = {
    isWechat :/micromessenger/i.test(navigator.userAgent),
    isWeibo :/weibo/i.test(navigator.userAgent),
    isQQ :/qq\//i.test(navigator.userAgent),
    isIOS : /(iphone|ipod|ipad|ios)/i.test(navigator.userAgent),
    isAndroid : /android/i.test(navigator.userAgent),
} 

// 数字格式化
export function prefix_zero(num) {
    return num >= 10 ? num : "0" + num;
}

// 敏感符号转义
export function entities(s) {
    let e = {
        '"': '&quot;',
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    }
    return s.replace(/["<>&]/g, m => {
        return e[m]
    })
}

/**
 * 防抖函数--在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 */
export function debounce(fun, delay) {
    return function (args) {
        let that = this
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, args)
        }, delay)
    }
}


// 数组去重
export function distinct(arr = testArr) {
    return arr.filter((v, i, array) => array.indexOf(v) === i)
}


// 深拷贝
export function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


// 移动端适配方案
// (function (doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function () {
//             var clientWidth = docEl.clientWidth;
//             var fontSize = 20;
//             docEl.style.fontSize = fontSize + 'px';
//             var docStyles = getComputedStyle(docEl);
//             var realFontSize = parseFloat(docStyles.fontSize);
//             var scale = realFontSize / fontSize;
//             console.log("realFontSize: " + realFontSize + ", scale: " + scale);
//             fontSize = clientWidth / 667 * 20;
//             if(isIphoneX()) fontSize = 19;
//             fontSize = fontSize / scale;
//             docEl.style.fontSize = fontSize + 'px';
//         };
//     // Abort if browser does not support addEventListener
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);

//     // iphoneX判断
//     function isIphoneX(){
//         return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
//     }

// })(document, window);

