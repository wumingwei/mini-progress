const https = require('https')
const {
    mysql
} = require('../qcloud')

// 新增图书
// douban 豆瓣书单

// Api：
// https://developers.douban.com/wiki/?title=book_v2 图书
// https://developers.douban.com/wiki/?title=movie_v2 电影

// books：
// 个人书单列表
// https://api.douban.com/v2/book/user/:name/collections?start=0&count=100
// 关键字查询书籍
// https://api.douban.com/v2/book/search?p/tag==那不勒斯四部曲&start=0&count=20
// 图书 isbn 查询书籍
// https://api.douban.com/v2/book/isbn/'+isbn  // 9787536692930
// 图书 id 查询书籍
// https://api.douban.com/v2/book/:id  // 1003078

// movies:
// https://api.douban.com/v2/movie/in_theaters 正在上映的电影
// https://api.douban.com/v2/movie/coming_soon 即将上映的电影
// https://api.douban.com/v2/movie/subject/:id 单个电影信息
// https://api.douban.com/v2/movie/search?q={text} 电影搜索

module.exports = async (ctx, next) => {
    // post 参数接受
    const {
        isbn,
        openid,
        bookinfo
    } = ctx.request.body

    console.log('post参数：', isbn, openid, bookinfo)

    if (isbn && openid && bookinfo) {
        // 检测数据库是否已存在书籍
        const findRes = await mysql('books').select().where('isbn', isbn)
        console.log('findRes:', findRes)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在！'
                }
            }
            return
        }

        // 书籍数据
        const {
            title,
            image,
            alt,
            publisher,
            summary,
            price
        } = bookinfo

        const author = bookinfo.author.join(',')
        const rate = bookinfo.rating.average
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')

        // 数据持久化至数据库
        try {
            await mysql('books').insert({
                isbn,
                openid,
                title,
                image,
                alt,
                publisher,
                summary,
                price,
                rate,
                tags,
                author
            })
            ctx.state = {
                code: 200,
                data: title
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                msg: e
            }
        }
    }
}
// eslint-disable-next-line space-before-function-paren
function getHttpsRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const resultData = JSON.parse(urlData)
                try {
                    resolve(resultData)
                } catch (error) {
                    reject(resultData)
                }
            })
        })
    })
}
