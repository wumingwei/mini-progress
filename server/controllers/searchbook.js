const https = require('https')
/* eslint-disable */
module.exports = async (ctx, next) => {
    const {
        type,
        value
    } = ctx.request.body

    let searchUrl = "";
    switch (type) {
        case 'isbn':
            let isbn = value;
            searchUrl = 'https://api.douban.com/v2/book/isbn/' + isbn // 9787536692930
            break;
        case 'p':
            let p = value;
            searchUrl = 'https://api.douban.com/v2/book/search?p=' + p
            break;

        case 'tag':
            let tag = value;
            searchUrl = 'https://api.douban.com/v2/book/search?tag=' + tag
            break;

        default:
            searchUrl = 'https://api.douban.com/v2/book/search?p=' + value
            break;
    }

    const searchResult = await getHttpsRequest(searchUrl);
    ctx.state = {
        code: 200,
        data: searchResult
    }
}

function getHttpsRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let _data = ''
            res.on('data', data => {
                _data += data
            })
            res.on('end', data => {
                const resultData = JSON.parse(_data)
                try {
                    resolve(resultData)
                } catch (error) {
                    reject(resultData)
                }
            })
        })
    })
}
