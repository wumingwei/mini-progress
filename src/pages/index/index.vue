<template>
  <div class="container" @click="clickHandle('test click', $event)">

  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },

    components: {
    },

    methods: {

      getUserInfo() {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo
              }
            })
          }
        })
      },

      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      }

    },

    created() {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
    }
  }
</script>

<style lang="sass" scoped>
</style>
