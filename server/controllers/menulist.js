// 个人中心菜单列表
/*eslint-disable*/
module.exports = async (ctx, next) => {
	ctx.state.data = [
		{ iconImg: '', iconTitle: '我的藏书', redirectUrl: '' },
		{ iconImg: '', iconTitle: '我的关注', redirectUrl: '' },
		{ iconImg: '', iconTitle: '我的书友', redirectUrl: '' },
		{ iconImg: '', iconTitle: '心愿书单', redirectUrl: '' },
		{ iconImg: '', iconTitle: '个性化设置', redirectUrl: '', hasGap: true },
		{ iconImg: '', iconTitle: '检查更新', redirectUrl: '' },
		{ iconImg: '', iconTitle: '关于我们', redirectUrl: '' }
	]
}
