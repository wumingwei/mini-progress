
<template>
    <div class='page-mycenter'>

        <!-- 个人基本信息 -->
        <div class="mycenter-userInfo">
            <image v-if="userInfo.avatarUrl" class="mycenter-userInfo__img" mode="aspectFill" :src="userInfo.avatarUrl"></image>
            <image v-if="!userInfo.avatarUrl" class="mycenter-userInfo__img" mode="aspectFill" :src="unLoginAvatarUrl"></image>
            <text v-if="userInfo.nickName" class="mycenter-userInfo__name">{{userInfo.nickName}}</text>
            <button v-if="!userInfo.nickName" size="mini" class="mycenter-userInfo__unLoginName" @click="wxLogin" open-type="getUserInfo">点击获取个人信息</button>
            <text v-if="userInfo.nickName" class="mycenter-userInfo__motto">实之华之兹乃兼求,顺风兮,逆风兮,无阻我飞扬!</text>
            <div class="mycenter-userInfo__submenu"></div>
        </div>
        <!-- 菜单列表 -->
        <div class="mycenter-menulist">
            <!-- 菜单列表子项 -->
            <div class="mycenter-menulist__item" :class="{hasGap:item.hasGap}" v-for="item in menulist" :key="item.ID">
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
    /*eslint-disable */
    import { showToast, showModel } from '@/utils';
    import qcloud from 'wafer2-client-sdk';
    import config from '@/config';
    export default {
        data() {
            return {
                userInfo: {},
                unLoginAvatarUrl: require('../../assets/images/unlogin.png'),
                menulist: [
                    { ID: 1, iconImg: '', iconTitle: '我的藏书', redirectUrl: '' },
                    { ID: 2, iconImg: '', iconTitle: '我的关注', redirectUrl: '' },
                    { ID: 3, iconImg: '', iconTitle: '我的书友', redirectUrl: '' },
                    { ID: 4, iconImg: '', iconTitle: '心愿书单', redirectUrl: '' },
                    { ID: 5, iconImg: '', iconTitle: '个性化设置', redirectUrl: '', hasGap: true },
                    { ID: 6, iconImg: '', iconTitle: '检查更新', redirectUrl: '' },
                    { ID: 7, iconImg: '', iconTitle: '关于我们', redirectUrl: '' },
                ],
            };
        },
        methods: {
            // 小程序登录接口
            wxLogin() {
                const session = qcloud.Session.get();
                qcloud.setLoginUrl(config.loginUrl);

                var self = this;
                if (session) {
                    // 第二次登录
                    // 或者本地已经有登录态
                    // 可使用本函数更新登录态
                    qcloud.loginWithCode({
                        success: (res) => {
                            console.log('app.vue第二次登陆:', res);
                            self.userInfo = res;
                            // 同步本地缓存信息
                            wx.setStorage({
                                key: 'userInfo',
                                data: res,
                            });
                        },
                        fail: (err) => {
                            console.log(err);
                        },
                    });
                } else {
                    // 首次登录;
                    qcloud.login({
                        success: (res) => {
                            console.log('app.vue第一次登陆:', res);
                            self.userInfo = res;
                            // 同步本地缓存信息
                            wx.setStorage({
                                key: 'userInfo',
                                data: res,
                            });
                        },
                        fail: (err) => {
                            console.error(err);
                        },
                    });
                }
            },
        },
        onShow() {
            let userInfo = wx.getStorageSync('userInfo');
            // console.log('userInfo:', userInfo);
            if (userInfo) {
                console.log('存在缓存userInfo');
                this.userInfo = userInfo;
            }
        },
    };
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
                background-color: #fff;
            }

            &__name {
                margin-bottom: 20rpx;
                color: #fff;
                text-align: center;
                font-size: 28rpx;
            }
            &__unLoginName {
                background: #cdcdcd;
                color: #fff;
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
                        width: 60rpx;
                        height: 60rpx;
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
