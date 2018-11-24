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
