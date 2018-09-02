
<template>
	<div class='page-mycenter'>
		<!-- 个人基本信息 -->
		<div class="mycenter-userInfo">
			<image class="mycenter-userInfo__img" mode="aspectFill" :src="userPhoto"></image>
			<text class="mycenter-userInfo__name">逆风飞扬</text>
			<text class="mycenter-userInfo__motto">实之华之兹乃兼求,顺风兮,逆风兮,无阻我飞扬!</text>
			<div class="mycenter-userInfo__submenu">

			</div>

		</div>
		<!-- 菜单列表 -->
		<div class="mycenter-menulist">
			<!-- 菜单列表子项 -->
			<div class="mycenter-menulist__item" :class="{hasGap:item.hasGap}" v-for="item in menulist">
				<!-- label -->
				<div class="item-icon">
					<images class="item-icon__img"></images>
					<text class="item-icon__title">{{item.iconTitle}}</text>
				</div>
				<!-- 箭头 -->
				<div class="item-arrow"></div>
			</div>
		</div>

	</div>
</template>
<script>
	/* eslint-disable*/
	export default {
		data() {
			return {
				userPhoto: require('../../assets/images/userImg.jpg'),
				menulist: [
					{ iconImg: "", iconTitle: "我的藏书", redirectUrl: "" },
					{ iconImg: "", iconTitle: "我的关注", redirectUrl: "" },
					{ iconImg: "", iconTitle: "心愿书单", redirectUrl: "", hasGap: true },
					{ iconImg: "", iconTitle: "设置", redirectUrl: "" },
					{ iconImg: "", iconTitle: "关于我们", redirectUrl: "" }
				],
			}
		},
		ready() {

		},
		attached() {

		},
		methods: {

		}
	}
</script>
<style lang='scss' scoped>
	.page-mycenter {
		width: 100%;
		height: 100%;
		background: #f6f6f6;
		.mycenter-userInfo {
			// height: 400rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			background: linear-gradient(to bottom, #2086e8, #2bb2f4);
			&__img {
				width: 160rpx;
				height: 160rpx;
				margin: 40rpx 0 30rpx;
				border-radius: 50%;
			}

			&__name {
				margin-bottom: 20rpx;
				color: #fff;
				text-align: center;
				font-size: 28rpx;
			}
			&__motto {
				margin-bottom: 20rpx;
				color: #fff;
				text-align: center;
				font-size: 26rpx;
			}
			&__submenu {
				width: 100%;
				margin-bottom: 40rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
			}
		}
		.mycenter-menulist {
			width: 100%;
			margin-top: 40rpx;
			border: 1px solid #e5e5e5;
			&__item {
				height: 88rpx;
				line-height: 88rpx;

				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;
				background: #fff;
				border-bottom: 1px solid #e5e5e5;

				.item-icon {
					height: 100%;
					margin-left: 34rpx;

					&__img {
					}
					&__title {
						height: 100%;
						color: #383838;
					}
				}
				.item-arrow {
					width: 20rpx;
					height: 20rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					border-top: 2px solid #c6c6c6;
					border-right: 2px solid #c6c6c6;
					transform: translateX(-30rpx) rotate(45deg);
				}
			}
			.hasGap {
				margin-top: 30rpx;
				border-top: 1px solid #e5e5e5;
			}
			.mycenter-menulist__item:active {
				opacity: 0.5;
			}
			.mycenter-menulist__item:last-of-type {
				border-bottom: none;
			}
		}
	}
</style>
