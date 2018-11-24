<template>
    <!-- moto 座右铭-->
    <div class='page-moto'>
        <div class="index-moto" v-for="item in motoList" :key="item.id">
            <div class="index-moto__content">
                {{item.moto}}
            </div>
            <div class="index-moto__author">
                {{"— "+item.author+"《" +item.book+"》"}}
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    import { get, showToast, showModel } from '@/utils';
    import config from '@/config';
    export default {
        data() {
            return {
                motoList: [],
            };
        },
        async created() {
            // 请求moto数据
            const motoList = await get('/weapp/motolist');
            console.log('motoListData:', motoList);
            this.motoList = motoList;

            // 豆瓣书单的数据加载
        },
        // 下拉刷新
        onPullDownRefresh() {
            wx.startPullDownRefresh();
            wx.stopPullDownRefresh();
        },

        methods: {},
    };
</script>
<style lang="scss" scoped>
    .page-moto {
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        // moto座右铭
        .index-moto {
            width: 80%;
            padding: 5%;
            margin: 20rpx auto;
            background-color: #fff;
            box-shadow: 10rpx 10rpx 6rpx #e5e5e5;
            &__content {
                font-size: 14px;
                color: #666;
                margin-bottom: 10rpx;
                width: 100%;
                line-height: 50rpx;
                text-indent: 56rpx;
            }
            &__author {
                width: 100%;
                height: 40rpx;
                text-align: right;
                line-height: 50rpx;
                font-size: 12px;
                color: #ccc;
            }
        }
    }
</style>
