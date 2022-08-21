<template>
  <div class="container">
    <List :list="list" @handle-click="handleClick"></List>
  </div>
</template>
<script>
  import List from '../../components/list.vue'
  export default {
    components: {
      List,
    },
    computed:{
      list(){
        if(this.$store.state.ticket){
          return [
            {
              name: '个人中心',
              _id: 3,
              path: '/order'
            },
            {
              name: '登出',
              _id: 4,
              path: '/login/email'
            },
          ]
        }else{
          return [
            {
              name: '登录',
              _id: 1,
              path: '/login/email'
            },
            {
              name: '注册',
              _id: 2,
              path: '/register'
            },
          ]
        }
      }
    },
    methods: {
      handleClick(item) {
        if(item._id === 4){
          this.$store.commit("loginOut");
        }
        this.$router.push(item.path)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    background: #252525;
    height: 100%;
    overflow: auto;
  }
</style>
