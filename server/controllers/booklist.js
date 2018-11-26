const {
    mysql
} = require('../qcloud')

module.exports = async (ctx, next) => {
    const bookList = await mysql('books').select('*').orderBy('id', 'desc')
    ctx.state = {
        code: 200,
        data: {
            list: bookList,
            msg: '请求成功'
        }
    }
}
