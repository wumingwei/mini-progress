/* eslint-disable */
const CONF = {
    // 其他配置 ...
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1257456558',
    qcloudSecretId: 'AKIDBB4kEV8Io43nHYHLr77tQhngMo1znHZc',
    qcloudSecretKey: 'xhDUXMxINDn8F7lBNL5bsvkLktnRpxqT',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000,
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx870e0eb3e8604a61',
    // 微信小程序 App Secret
    appSecret: '07cf4f87de7be14c3cc9a0debb1fd4b8',
    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'weixin',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200
}

module.exports = CONF
