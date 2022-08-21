<template>
  <div class="container">
    <div class="content">
      <div class="logo-box">
        <img src="/mobile/static/img/order/1.png">
      </div>
      <div class="code-box">
        <div class="title">Achen&Cybe感谢您的订购。</div>
        <div class="text">可移步至个人中心以查看订单状态。</div>
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
        width:50%;
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
