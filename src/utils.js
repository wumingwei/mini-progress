// 工具函数库

import config from './config'

// http get请求的二次封装
export function get(url) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: config.host + url,
			success: function (res) {
				if (res.data.code === 0) {
					resolve(res.data.data)
				} else {
					reject(res.data)
				}
			}
		})
	})
}

export function showToast(type, text, duration, ifHasMask) {
	wx.showToast({
		title: text,
		icon: type, // success/loading/none
		duration: duration || 1500,
		mask: ifHasMask || false
	})
}

export function showModel(params) {
	wx.showModal({
		title: params.title || '提示',
		content: params.content,
		showCancel: params.content || false,
		cancelText: params.cancelText || '取消',
		cancelColor: params.cancelColor || '#000000',
		confirmText: params.confirmText || '确定',
		confirmColor: params.confirmColor || '#3CC51F',
		success: params.success || function () {},
		fail: params.fail || function () {},
		complete: params.complete || function () {}
	})
}
