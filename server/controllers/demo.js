// demo 测试接口
module.exports = async (ctx, next) => {
    ctx.state.data = {
        msg: [
            { name: '001', value: '列表001' },
            { name: '002', value: '列表002' },
            { name: '003', value: '列表003' },
            { name: '004', value: '列表004' }
        ]
    }
}
