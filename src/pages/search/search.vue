<template>
    <div class='page-search'>
        <!-- seach搜索框 -->
        <div class="index-search">
            <div class="index-search__box">
                <input class="box-input" v-model="searchText" type="text" @blur="searchBlur" @focus="searchFocus" placeholder="搜索书名、作者、出版社">
                <!-- 搜索按钮 -->
                <text class="box-btn" v-show="showSearchBtn || searchText" @click="submitSearch">搜索</text>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchText: '',
                showSearchBtn: false,
            };
        },
        onLoad: function(option) {
            console.log(wx.createSelectorQuery().select('.box-input'));
        },
        methods: {
            // 页面添加焦点,根据主页的navigateTo跳转所带的传参

            // 搜索框失去焦点
            searchBlur() {
                console.log('失去焦点');
            },
            // 搜索框获取焦点
            searchFocus() {
                console.log('获取焦点');
            },
            // 提交搜索
            submitSearch() {},
        },
    };
</script>
<style lang='scss' scoped>
    .page-search {
        width: 100%;
        height: 100px;
        position: relative;
        // search
        .index-search {
            position: fixed;
            top: 0rpx;
            left: 0;
            right: 0;
            z-index: 1000;
            height: 72rpx;
            padding: 16rpx 34rpx;
            background-color: #f6f6f6;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            &__box {
                flex: 1;
                font-size: 28rpx;
                height: 100%;
                line-height: 66rpx;
                padding-left: 40rpx;
                border-radius: 36rpx;
                background-color: #fff;
                box-shadow: 10rpx 10rpx 6rpx #e5e5e5;
                display: flex;
                justify-content: space-between;
                .box-input {
                    height: 100%;
                    line-height: 66rpx;
                    flex: 1;
                }
                .box-btn {
                    height: 72rpx;
                    line-height: 72rpx;
                    width: 72rpx;
                    text-align: center;
                    margin-right: 10rpx;
                    color: #1296db;
                }
            }
            &__scanicon {
                width: 48rpx;
                height: 48rpx;
                margin-left: 30rpx;
            }
            &__btn {
                float: right;
            }
        }
    }
</style>
