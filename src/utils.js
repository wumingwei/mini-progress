// 工具函数库
// 引入全局配置项
import config from './config';

// http get post请求的二次封装
/**
 * get 数据请求
 *
 * @param {String} url 请求 url
 * @param {Object} data 请求参数
 * @returns
 */
export function get(url, data) {
    return request(url, 'GET', data);
}


/**
 * post 数据请求
 *
 * @param {String} url 请求 url
 * @param {Object} data 请求参数
 * @returns
 */
export function post(url, data) {
    return request(url, 'POST', data);
}

/**
 * wx.request 数据请求
 *
 * @param {String} url 请求的 url
 * @param {String} method 请求方法
 * @param {Object} data  请求参数
 * @param {Object} header 请求头
 * @returns
 */
function request(url, method, data, header = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            method,
            data,
            header,
            success: function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                } else {
                    showModel('失败', res.data.data.msg);
                    reject(res.data);
                }
            },
            fail: function (res) {
                console.error('fail:', res);
                reject(res.data);
            },
        });
    })
}

/**
 * Toast 弹窗
 *
 * @param {String} type
 * @param {String} text
 * @param { Number} duration
 * @param {Boolean} ifHasMask
 */
export function showToast(type, text, duration, ifHasMask, cbSuccess, cbError, cbComplete) {
    wx.showToast({
        icon: type, // success/loading/none
        title: text,
        duration: duration || 1500,
        mask: ifHasMask || false,
        success: cbSuccess && cbSuccess(),
        fail: cbError && cbError(),
        complete: cbComplete && cbComplete()
    });
}

/**
 * Model 弹窗
 *
 * @param {String} title 标题
 * @param {String} content 弹窗内容
 * @param {Object} cancelConfig 取消按钮配置项
 * @param {Object} confirmConfig 确认按钮配置项
 * @param {Function} successCallback 确认回调事件
 * @param {Function} failCallback 取消回到事件
 * @param {Function} completeCallback 完成回调事件
 */
export function showModel(
    title,
    content,
    cancelConfig,
    confirmConfig,
    successCallback,
    failCallback,
    completeCallback
) {
    wx.showModal({
        title: title || '提示',
        content: content || '',

        showCancel: cancelConfig && cancelConfig.showCancel || false,
        cancelText: cancelConfig && cancelConfig.cancelText || '取消', // 取消按钮的文字，最多 4 个字符
        cancelColor: cancelConfig && cancelConfig.cancelColor || '#000000',

        confirmText: confirmConfig && confirmConfig.confirmText || '确定', // 确定按钮的文字，最多 4 个字符
        confirmColor: confirmConfig && confirmConfig.confirmColor || '#3CC51F',

        success: successCallback || function () {},
        fail: failCallback || function () {},
        complete: completeCallback || function () {},
    });
}
