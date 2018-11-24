const https = require('https')
const {mysql} = require('../qcloud')

// 新增图书

module.exports = async (ctx) => {
    const {
        isbn,
        openid
    } = ctx.request.body
    console.log(isbn, openid)

    if (isbn && openid) {

        // 检测是否是已存在书籍
        const

        let url = 'https://douban.uieee.com/V2/book/isbn/' + isbn
        console.log(url)
        const bookinfo = await getJSON(url)

        // 书籍数据
        const rate = bookinfo.rating.average
        const {title, image, alt, publisher, summary, price} = bookinfo
        const tags = bookinfo.tages.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')

        // 数据持久化至数据库
        try {
            await mysql('books').insert({
                id,
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
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败:' + e.sqlMessage
                }
            }
        }
    }
}
/** eslint-disable */
function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
