<script>
    /* eslint-disable */
    // import { get } from './util';
    import qcloud from 'wafer2-client-sdk';
    import config from './config';
    export default {
        data() {
            return {
                useInfo: {},
                testData: 'app.vue',
            };
        },
        created() {
            this.wxLogin();
        },
        methods: {
            // 小程序登录接口
            wxLogin() {
                var self = this;
                let userInfo = wx.getStorageSync('userInfo');
                // 无缓存信息时
                if (!userInfo) {
                    const session = qcloud.Session.get();
                    qcloud.setLoginUrl(config.loginUrl);
                    if (session) {
                        // 第二次登录
                        // 或者本地已经有登录态
                        // 可使用本函数更新登录态
                        qcloud.loginWithCode({
                            success: (res) => {
                                console.log('app.vue第二次登陆:', res);
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
                }
                // 存在缓存信息时，直接取出缓存信息
                else {
                    // 直接获取缓存数据
                    try {
                        let cacheData = wx.getStorageSync('userInfo');
                        if (cacheData) {
                            self.userInfo = cacheData;
                            // console.log(cacheData);
                            // Do something with return value
                        }
                    } catch (e) {
                        // Do something when catch error
                        console.error(e);
                    }
                }
            },
        },
    };
</script>
<style lang='scss'>
    page {
        width: 100%;
        height: 100%;
        background: #f6f6f6;
    }
</style>
