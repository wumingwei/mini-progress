// 个人中心菜单列表
/*eslint-disable*/
module.exports = async (ctx, next) => {
	ctx.state.data = [
		{ ID: 1, iconImg: '', iconTitle: '我的藏书', redirectUrl: '' },
		{ ID: 2, iconImg: '', iconTitle: '我的关注', redirectUrl: '' },
		{ ID: 3, iconImg: '', iconTitle: '我的书友', redirectUrl: '' },
		{ ID: 4, iconImg: '', iconTitle: '心愿书单', redirectUrl: '' },
		{ ID: 5, iconImg: '', iconTitle: '个性化设置', redirectUrl: '', hasGap: true },
		{ ID: 6, iconImg: '', iconTitle: '检查更新', redirectUrl: '' },
		{ ID: 7, iconImg: '', iconTitle: '关于我们', redirectUrl: '' }
	]
}
