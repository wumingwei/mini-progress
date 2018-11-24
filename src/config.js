// 系统配置项
const host = 'http://localhost:5757';

/**
 * 数据请求 url 配置项
 * @param {String}  host 数据请求 baseUrl
 * @param {String}  loginUrl 登录url
 * @param {String}  userUrl 获取登录人信息url
 * @param {String}  demoUrl 接口服务测试 url
 */
const config = {
    host,
    loginUrl: `${host}/weapp/login`,
    userUrl: `${host}/weapp/user`,
    demoUrl: `${host}/weapp/demo`,
};

export default config;
