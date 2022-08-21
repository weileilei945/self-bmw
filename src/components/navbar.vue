<template>
  <header>
    <div class="navbar d-flex jc-between ai-center">
      <div class="menu" @click="toCar"></div>
      <div class="logo" @click="$router.push('/')"></div>
      <div class="user" @click="toUser"></div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      history: null,
      isShow: false,
      navPage: null
    }
  },
  methods: {
    toCar() {
      console.log(this.isShow,this.$route.name)
      const navRouter = ["Volkswagen","Porsche","Audi","Benz","Bwm","Dodge","CarType","user","Car"];
      if (!this.isShow || (this.isShow && navRouter.indexOf(this.$route.name) === -1)) {
        this.history = this.$route
        this.$router.push('/Car')
        this.isShow = true
        this.navPage = 'car'
      } else if (this.navPage == 'user') {
        this.$router.push('/Car')
        this.navPage = 'car'
      } else {
        this.$router.push({ path: this.history.path, params: this.history.params, query: this.history.query })
        this.isShow = false
        this.history = null
        this.navPage = null
      }
    },
    toUser() {
      const navRouter = ["Volkswagen","Porsche","Audi","Benz","Bwm","Dodge","CarType","user","Car"];
      if (!this.isShow || (this.isShow && navRouter.indexOf(this.$route.name) === -1)) {
        this.history = this.$route
        this.$router.push('/user')
        this.isShow = true
        this.navPage = "user"
      } else if (this.navPage == 'car') {
        this.$router.push('/user')
        this.navPage = 'user'
      } else {
        this.$router.push({ path: this.history.path, params: this.history.params, query: this.history.query })
        this.isShow = false
        this.history = null
        this.navPage = null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 44px;
  .navbar {
    color: #fff;
    width: 100%;
    height: 44px;
    background: rgb(66, 66, 66);
    padding: 0 24px;
    position: fixed;
    z-index: 999;
    top: 0;
    .menu {
      width: 24px;
      height: 24px;
      background: url('/mobile/static/img/others/menu.png') no-repeat;
      background-size: 100% 100%;
    }
    .logo {
      width: 132px;
      height: 44px;
      background: url('/mobile/static/img/logo_1.png') no-repeat;
      background-size: 100% 100%;
    }
    .user {
      width: 24px;
      height: 24px;
      background: url('/mobile/static/img/others/user.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
