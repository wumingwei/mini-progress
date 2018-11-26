<template>
    <div class="page-index" @click="scrollToListTop">

        <!-- 一键返回顶部 -->
        <div class="index-scrollToTop"></div>

        <!-- seach搜索框 -->
        <div class="index-search">
            <div class="index-search__box">
                <input class="box-input" type="text" @focus="goSearchPage" placeholder="搜索书名、作者、出版社">
            </div>
            <image class="index-search__scanicon" :src="scanIcon" @click="scanBook"></image>
        </div>

        <!-- moto 座右铭-->
        <div class="index-moto" @click="goMotoDetails">
            <div class="index-moto__content">
                {{motoList[0].moto}}
            </div>
            <div class="index-moto__author">
                {{"— "+motoList[0].author+"《" +motoList[0].book+"》"}}
            </div>
        </div>

        <!-- 已阅读时长汇总 -->
        <div class="index-hasRead" @click="goReadChartsPage">
            <div class="index-hasRead__title">
                <span class="title-label">已累计阅读</span>
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
            <li class="index-booklist__item"  v-for="item in bookList ":key="item.id">
				<div class="item-box">
					<image class="item-box__img" :src="item.image"></image>
					<text class="item-box__text">{{item.title}}</text>
				</div>
			</li>
            <li class="index-booklist__item" @click="testScrollTop">
                <div class="addbook">十</div>
            </li>
        </ul>

        <!-- 扫一扫搜索结果 -->
        <div class="index-showBookPreview" v-if="showBookPreview">
            <div class="container list">
                <!-- 图片 -->
                <img class="bgImage" :src="scanResult.images.large" />
                <!-- 标题 -->
                <div class="title list-item">{{'《'+scanResult.title+'》'}}</div>
                <!-- 作者 -->
                <!-- <div class="author list-item" v-if='scanResult.author'>{{scanResult.author+" 著"}}</div> -->
                <!-- 作者简介 -->
                <dl class="author-info list-item" @click="isFoldAuthorInfo=!isFoldAuthorInfo">
                    <dt>作者简介：</dt>
                    <dd class="author-info__details" :class="{'hasfoldauthorinfo':!isFoldAuthorInfo}">{{scanResult.author_intro}}</dd>
                </dl>

                <!-- 描述 -->
                <dl class="des-info list-item" @click="isFoldDesInfo=!isFoldDesInfo">
                    <dt>描述：</dt>
                    <dd class="des-info__value" :class="{'hasfolddesinfo':!isFoldDesInfo}">{{scanResult.summary}}</dd>
                </dl>

                <!-- 更多 -->
                <dl class="more-info list-item " @click="isFoldMore=!isFoldMore">
                    <dt class="noborder" style="text-align:right" v-show="!isFoldMore">显示更多信息</dt>
                    <dt class="noborder" style="text-align:right" v-show="isFoldMore">隐藏更多信息</dt>
                    <dd class="more-info__value" :class="{'hasfoldmoreinfo':!isFoldMore}"></dd>
                </dl>

                <!-- 出版时间 -->
                <dl class="des list-item" v-show="isFoldMore">
                    <dt>出版时间：</dt>
                    <dd>{{scanResult.pubdate}}</dd>
                </dl>
                <!-- 出版社 -->
                <dl class="des list-item" v-show="isFoldMore">
                     <dt>出版社：</dt>
                    <dd>{{scanResult.publisher}}</dd>
                </dl>
                <!-- 参考价格 -->
                <dl class="price-info list-item" v-show="isFoldMore">
                    <dt>参考价格：</dt>
                    <dd class="price-info__value">{{scanResult.price}}</dd>
                </dl>

                <!-- 按钮 -->
                <div class="submitBtn">
                    <div class="submitBtn__item cancel" @click="cancelAddBook">取消</div>
                    <div class="submitBtn__item submit" @click="submitAddBook">添加</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
/* eslint-disable */
import { get, post, showToast, showModel } from '@/utils';
import config from '@/config';
import qcloud from 'wafer2-client-sdk';
export default {
    data() {
        return {
            motoList: [], // 名言数据
            bookList: [], // 我的书单列表数据
            hasRead: 100, //  已读时长
            scanIcon: require('../../assets/images/scan.png'), // 扫码icon
            showBookPreview: false, // 扫一扫结果弹窗
            scanResult: {}, // scan 结果数据
            isFoldDesInfo: false, // 是否显示描述详情
            isFoldAuthorInfo: false, // 是否显示作者详情
            isFoldMore: false, // 是否显示更多图书信息
        };
    },
    async created() {
        // 请求moto数据
        const motoList = await get('/weapp/motolist');
        this.motoList = motoList;
    },
    async onShow() {
        console.log('onshow事件');
        const bookList = await get('/weapp/bookList');
        this.bookList = bookList.list;
    },

    methods: {
        // 一键回到顶部
        scrollToTop() {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 500,
            });
        },

        // 取消添加
        cancelAddBook() {
            // remove isbn数据
            wx.removeStorage({
                key: 'scanIsbnJson',
                success(res) {
                    // console.log(res.data);
                },
            });
            // hideBookPreview
            this.showBookPreview = false;
            // 显示tabBar
            wx.showTabBar();
        },

        async updateBookList() {
            const bookList = await get('/weapp/bookList');
            this.bookList = bookList.list;
        },

        // 确定添加
        async submitAddBook() {
            this.addBook(this.scanResult);
        },

        // 添加图书
        async addBook(bookinfo, cbSuccess, cbError) {
            // console.log('addBook', wx.getStorageSync('userInfo').openId);
            let openid = wx.getStorageSync('userInfo').openId,
                isbn = JSON.parse(wx.getStorageSync('scanIsbnJson')).value;

            const bookTitle = await post('/weapp/addbook', { isbn, openid, bookinfo });

            // console.log(bookTitle);
            if (bookTitle) {
                showModel('添加成功', `《${bookTitle}》已经添加到我的书单里面了。`);
                this.showBookPreview = false;
                wx.showTabBar();
                this.updateBookList();
            } else {
                showModel('添加失败', `《${bookTitle}》添加失败，请稍后重试!`);
            }
        },

        // 扫描后显示图书
        async showSearchResult(type, value) {
            let searchResult = await post('/weapp/searchbook', { type, value });

            wx.hideTabBar();
            this.showBookPreview = true;
            this.isFold = true;
            this.scanResult = searchResult;
            // console.log('isbn数据：', JSON.stringify({ type, value }));

            // 缓存isbn数据
            wx.setStorage({
                key: 'scanIsbnJson',
                data: JSON.stringify({ type, value }),
            });
        },

        // 扫码录入图书
        scanBook() {
            wx.scanCode({
                success: (res) => {
                    if (res.result) {
                        this.showSearchResult('isbn', res.result);
                    }
                },
            });
        },

        // 跳转到名言详情页面
        goMotoDetails() {
            wx.navigateTo({
                url: '/pages/moto/main?motoID=007',
            });
        },

        // 跳转到搜索页面
        goSearchPage() {
            console.log('focus');
            wx.navigateTo({
                url: '/pages/search/main?pageFrom=indexSearchBox',
            });
        },

        // 跳转到读书图表页面
        goReadChartsPage() {
            console.log('goReadChartsPage');
            wx.navigateTo({
                url: '/pages/readCharts/main?pageFrom=indexSearchBox',
            });
        },
    },
};
</script>

<style lang="scss" scoped>
// 首页
.page-index {
    width: 100%;
    height: calc(100% - 102rpx);
    padding-top: 102rpx;
    background-color: #f6f6f6;
    position: relative;
    z-index: 0;

    // 显示预览书籍结果
    .index-showBookPreview {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .container {
            border-radius: 16rpx;
            width: 78%;
            padding: 20px 0 0;
            background: #fff;
            height: 500px;
            overflow: scroll;

            // dl>dt, dd
            dl.list-item {
                color: #666;
                font-size: 14px;
                font-weight: 600px;
                line-height: 20px;
                padding: 0 17px;
                margin-bottom: 10px;

                dt {
                    border-left: 4px solid #666;
                    padding-left: 6px;
                }
                dt.noborder {
                    border: 0;
                }
                dd {
                    text-indent: 24px;
                }
            }

            // 图片
            .bgImage {
                display: block;
                width: 200px;
                height: 280px;
                margin: 10px auto 10px;
                box-shadow: 10px 10px 6px #e5e5e5;
            }
            // 标题
            .title {
                width: 100%;
                height: 30px;
                font-size: 16px;
                font-weight: 600px;
                text-align: center;
                color: #000;
                line-height: 30px;
            }
            // 作者
            .author {
                width: 100%;
                height: 30px;
                font-size: 14px;
                font-weight: 600px;
                text-align: center;
                color: #666;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            // 作者简介
            .author-info {
                min-height: 40px;
                // &__details {
                // }
            }
            // 书籍描述
            .des-info {
                min-height: 40px;
                // &__value {
                // }
            }
            .hasfolddesinfo {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1; //显示的行数
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .hasfoldauthorinfo {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1; //显示的行数
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .submitBtn {
                margin-top: 10px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                flex-direction: row;
                align-items: center;
                &__item {
                    flex: 1;
                    height: 100%;
                    text-align: center;
                    color: #666;
                    border-top: 1px solid #f6f6f6;
                }
                &__item:active {
                    opacity: 0.5;

                    background: #cdcdcd;
                }
                .cancel {
                    border-right: 1px solid #f6f6f6;
                }
                .submit {
                    color: #1296db;
                }
            }
        }
    }

    // search
    .index-search {
        position: fixed;
        top: 0rpx;
        left: 0;
        right: 0;
        z-index: 200;
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
