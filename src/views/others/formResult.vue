<template>
  <div class="container">
    <div class="content">
      <div class="logo-box">
        <img src="/mobile/static/img/logo.png">
      </div>
      <div class="code-box">
        <div class="title">我们的商务团队将会尽快与您取得联系</div>
        <div class="text">表单回收后，您的信息将被加密，第三方无法读取</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerDetail",
  computed: {
    type() {
      return this.$route.query.type
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: calc(100vh - 183px);
  overflow: hidden;
  box-sizing: border-box;
  color: #fff;

  .content {
    height: 100%;

    .logo-box {
      width: 100%;
      padding: 30px 0;
      background-color: #121212;
      text-align: center;

      img {
        height: 26px;
      }
    }

    .code-box {
      background-color: #fff;
      width: 100%;
      height: calc(100% - 86px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #2c3e50;

      .title {
        margin-top: -30px;
        font-size: 18px;
      }

      .text {
        font-size: 12px;
        margin-top: 5px;
        font-weight: 100;
      }
    }
  }
}
</style>
