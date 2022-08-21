<template>
  <div class="container">
    <div class="content">
      <div class="user-msg">
        <div class="user">早上好，Mark。</div>
        <div class="common first">ID：Mark<span @click="$router.push('/changeId')">前往修改></span></div>
        <div class="common">邮箱：45034242@qq.com</div>
        <div class="common">手机号：尚未验证<span @click="$router.push('/bindphone')">前往验证></span></div>
        <div class="change">修改密码></div>
      </div>
      <div class="no-data">
        暂无订单
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    background: #111;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    .content {
      width: 100%;
      padding: 0 21px;
      min-height: calc(100% - 180px);
      padding: 10px 10px 0;
      .user-msg {
        width: 100%;
        height: 166px;
        border: 1px solid #a4a4a4;
        background: #fff;
        box-sizing: border-box;
        padding: 30px 40px 0;

        .user {
          font-size: 18px;
          line-height: 1;
        }
        .common {
          font-size: 15px;
          line-height: 1.4;
          &.first {
            margin-top: 8px;
          }
          span {
            padding-left: 4px;
            font-size: 10px;
            color: #559ffb;
          }
        }
        .change {
          font-size: 10px;
          line-height: 3;
          color: #559ffb;
        }
      }
      .no-data {
        margin: 16px auto 24px;
        width: 100%;
        height: 355px;
        background: url('/mobile/static/img/order/noorder.png') no-repeat;
        background-size: 100% 100%;
        color:#fff;
        padding: 20px 40px 0;
      }
    }
  }
</style>
