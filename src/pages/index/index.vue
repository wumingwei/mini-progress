<template>
	<div class="page-index" @click="scrollToListTop">

		<div class="index-scrollToTop"></div>

		<!-- seach搜索框 -->
		<div class="index-search">
			<div class="index-search__box">
				<input class="box-input" type="text" @blur="searchBlur" @focus="searchFocus" placeholder="搜索书名、作者、出版社">
			</div>
			<image class="index-search__scanicon" :src="scanIcon" @click="scanBook"></image>
		</div>

		<!-- moto 座右铭-->
		<div class="index-moto" @click="scrollToListTop">
			<div class="index-moto__content">
				一个人要以清晰的心智和从容的步履走过岁月,他的精神中不能缺少淡泊. 一个人要以清晰的心智和从容的步履走过岁月,他的精神中不能缺
			</div>
			<div class="index-moto__author">
				—汪国真
			</div>
		</div>

		<!-- 已阅读时长汇总 -->
		<div class="index-hasRead">
			<div class="index-hasRead__title">
				<span class="title-label">在图书精灵已累计阅读</span>
				<span class="title-iconfont"></span>
			</div>
			<!-- 已阅读时长统计 -->
			<div class="index-hasRead__container">
				<!-- 阅读总时长 -->
				<div class="container-totleMinutes">
					<span class="container-totleMinutes__minutes">200</span>
					<span class="container-totleMinutes__unit">分钟</span>
				</div>
				<!-- 今日阅读时长 -->
				<div class="container-todayMinutes">
					<span class="container-todayMinutes__title">今日阅读</span>
					<p class="container-todayMinutes__minutes">45</p>
					<span class="container-todayMinutes__unit">分钟</span>
				</div>
			</div>

		</div>
		<!-- 个性读书计划 -->

		<!-- 图书列表 -->
		<ul class="index-booklist">
			<li class="index-booklist__item">
				<div class="item-box">
					<image class="item-box__img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536312033783&di=9dc2aeadce66e0d61206911943803956&imgtype=0&src=http%3A%2F%2Fimg62.ddimg.cn%2Fdigital%2Fproduct%2F33%2F88%2F1900773388_cc_cover.jpg%3Fversion%3Dnull"></image>
					<text class="item-box__text">图书名称图书名称图书名称图书名称图书名称图书名称图书名称</text>
				</div>
			</li>
			<li class="index-booklist__item">
				<div class="item-box">
					<image class="item-box__img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536312033783&di=9dc2aeadce66e0d61206911943803956&imgtype=0&src=http%3A%2F%2Fimg62.ddimg.cn%2Fdigital%2Fproduct%2F33%2F88%2F1900773388_cc_cover.jpg%3Fversion%3Dnull"></image>
					<text class="item-box__text">图书名称图书名称图书名称图书名称图书名称图书名称图书名称</text>
				</div>
			</li>
			<li class="index-booklist__item">
				<div class="item-box">
					<image class="item-box__img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536312033783&di=9dc2aeadce66e0d61206911943803956&imgtype=0&src=http%3A%2F%2Fimg62.ddimg.cn%2Fdigital%2Fproduct%2F33%2F88%2F1900773388_cc_cover.jpg%3Fversion%3Dnull"></image>
					<text class="item-box__text">图书名称图书名称图书名称图书名称图书名称图书名称图书名称</text>
				</div>
			</li>
			<li class="index-booklist__item">
				<div class="item-box">
					<image class="item-box__img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536312033783&di=9dc2aeadce66e0d61206911943803956&imgtype=0&src=http%3A%2F%2Fimg62.ddimg.cn%2Fdigital%2Fproduct%2F33%2F88%2F1900773388_cc_cover.jpg%3Fversion%3Dnull"></image>
					<text class="item-box__text">图书名称图书名称图书名称图书名称图书名称图书名称图书名称</text>
				</div>
			</li>
			<li class="index-booklist__item">
				<div class="item-box">
					<image class="item-box__img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536312033783&di=9dc2aeadce66e0d61206911943803956&imgtype=0&src=http%3A%2F%2Fimg62.ddimg.cn%2Fdigital%2Fproduct%2F33%2F88%2F1900773388_cc_cover.jpg%3Fversion%3Dnull"></image>
					<text class="item-box__text">图书名称</text>
				</div>
			</li>
			<li class="index-booklist__item">
				<div class="item-box">
					<image class="item-box__img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536312033783&di=9dc2aeadce66e0d61206911943803956&imgtype=0&src=http%3A%2F%2Fimg62.ddimg.cn%2Fdigital%2Fproduct%2F33%2F88%2F1900773388_cc_cover.jpg%3Fversion%3Dnull"></image>
					<text class="item-box__text">图书名称</text>
				</div>
			</li>
			<li class="index-booklist__item" @click="testScrollTop">
				<div class="addbook">十</div>
			</li>
		</ul>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				hasRead: 100,
				scanIcon: require('../../assets/images/scan.png'),
				scrollTop: 0,
				// 名言容器的上边距
				motoTop: 0,
				// 名言容器的高度
				motoHeight: 0,
				// 已读容器的上边距
				hasReadTop: 0,
				// 已读容器的高度
				hasReadHeight: 0,
				// 列表容器的上边距
				bookListTop: 0,
				// 列表容器的高度
				bookListHeight: 0
			}
		},
		onPageScroll: function (e) {
			this.scrollTop = e.scrollTop
			console.log('this.scrollTop:', this.scrollTop)
		},
		methods: {
			scrollToTop() {
				wx.pageScrollTo({
					scrollTop: 0,
					duration: 500
				})
			},
			// 扫码录入图书
			scanBook() {
				wx.scanCode({
					success: (res) => {
						console.log(res)
					}
				})
			},
			// 查询搜索信息
			submitSearch() {
				console.log('submit search!')
			},
			//
			searchBlur() {
				console.log('Blur')
				// this.showSearchBtn = false
			},
			searchFocus() {
				console.log('focus')
				// this.showSearchBtn = true
				wx.navigateTo({
					url: '/pages/search/main?pageFrom=indexSearchBox'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-index {
		width: 100%;
		padding: 20rpx 0;
		padding-top: 102rpx;
		background-color: #f6f6f6;
		position: relative;

		// search
		.index-search {
			position: fixed;
			top: 0rpx;
			left: 0;
			right: 0;
			z-index: 1000;
			height: 72rpx;
			padding: 16rpx 34rpx;
			background-color: #f6f6f6;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			&__box {
				flex: 1;
				font-size: 28rpx;
				height: 100%;
				line-height: 66rpx;
				padding-left: 40rpx;
				border-radius: 36rpx;
				background-color: #fff;
				box-shadow: 10rpx 10rpx 6rpx #e5e5e5;
				display: flex;
				justify-content: space-between;
				.box-input {
					height: 100%;
					line-height: 66rpx;
					flex: 1;
				}
				.box-btn {
					height: 72rpx;
					line-height: 72rpx;
					width: 72rpx;
					text-align: center;
					margin-right: 10rpx;
					color: #1296db;
				}
			}
			&__scanicon {
				width: 48rpx;
				height: 48rpx;
				margin-left: 30rpx;
			}
			&__btn {
				float: right;
			}
		}
		// moto座右铭
		.index-moto {
			width: 80%;
			padding: 5%;
			margin: 20rpx auto;
			background-color: #fff;
			box-shadow: 10rpx 10rpx 6rpx #e5e5e5;
			&__content {
				font-size: 14px;
				color: #666;
				margin-bottom: 10rpx;
				width: 100%;
				line-height: 50rpx;
				text-indent: 56rpx;
			}
			&__author {
				width: 100%;
				height: 40rpx;
				text-align: right;
				line-height: 50rpx;
				font-size: 12px;
				color: #ccc;
			}
		}
		//  已读信息
		.index-hasRead {
			width: 80%;
			padding: 10rpx 5%;
			margin: 30rpx auto;
			box-shadow: 10rpx 10rpx 6rpx #e5e5e5;
			font-size: 28rpx;
			background: #fff;
			&__title {
				display: block;
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.title-label {
					color: #666;
				}
				.title-iconfont {
					display: block;
					width: 12rpx;
					height: 12rpx;
					border-top: 4rpx solid #666;
					border-right: 4rpx solid #666;
					transform: translateX(8rpx) rotate(45deg);
				}
			}
			&__container {
				width: 100%;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				align-items: flex-end;
				justify-content: space-between;
				line-height: 80rpx;
				.container-totleMinutes {
					&__minutes {
						color: rgba($color: #000000, $alpha: 0.6);
						font-size: 60rpx;
					}
					&__unit {
						margin-left: 10rpx;
						color: #666;
					}
				}
				.container-todayMinutes {
					color: #666;
					height: 80rpx;
					line-height: 80rpx;
					display: flex;
					flex-direction: row;
					&__minutes {
						color: #1296db;
						margin: 0 8rpx;
					}
				}
			}
		}
		.index-booklist {
			width: 90%;
			padding: 20rpx 5%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			&__item {
				width: 33.3333%;
				height: 360rpx;
				.item-box {
					width: 80%;
					height: 100%;
					margin: 20rpx 10%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					&__img {
						width: 180rpx;
						height: 240rpx;
						box-shadow: 16rpx 16rpx 6rpx #e5e5e5;
					}
					&__text {
						width: 90%;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 28rpx;
						text-align: center;
						color: #666;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.addbook {
					border: 2px solid #e5e5e5;
					font-size: 100rpx;
					line-height: 240rpx;
					width: 80%;
					height: 240rpx;
					margin: 20rpx 10%;
					text-align: center;
					color: #666;
				}
			}
		}
	}
</style>
