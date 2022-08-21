<template>
  <div class="home-page">
    <div class="content">
      <div class="logo-box">
        <img src="/mobile/static/img/logo.png" />
      </div>
      <div class="code-box">
        <template v-if="type === 'AC'">
          <img src="/mobile/static/img/footerDetail/1.png" alt="" style="display: block; width: 50%; margin: -10px auto 0" />
          <div class="font10">微信扫一扫添加你的专属Specialist专家</div>
        </template>
        <template v-if="type === 'carben'">
          <img src="/mobile/static/img/footerDetail/2.png" alt="" style="display: block; margin: -30px auto 0; width: 40%" />
          <div style="margin-top: 20px;text-align: center" class="font20"
            >CARBEN app搜索“<span style="font-weight: 500">AchenCybe</span>”</div
          >
          <div style="margin-top: 12px">关注以获取更多实时资讯</div>
        </template>
        <template v-if="type === 'ebay'">
          <div  class="font20"
            >eBay搜索“<span style="font-weight: 500">AchenCybe</span>”</div
          >
          <div style="margin-top: 20px">关注以获取更多实时资讯</div>
        </template>
        <template v-if="type === 'taobao'">
          <div class="font20">AchenCybe Club</div>
          <div>淘宝网企业店铺</div>
          <img src="/mobile/static/img/footerDetail/3.png" alt="" style="display: block; margin: 10px auto 20px; width: 40%" />
          <div class="font14" style=" color: #a5a5a5">手机淘宝扫一扫</div>
        </template>
        <template v-if="type === 'gzh'">
          <img src="/mobile/static/img/footerDetail/5.jpg" alt="" style="display: block; margin: -10px auto 0; width: 40%" />
          <div class="font20"  style="margin-top: 10px;"
            >公众号搜索“<span style="font-weight: 500">AchenCybe</span>”</div
          >
          <div style="margin-top: 10px">关注以获取更多实时资讯</div>
        </template>
        <template v-if="type === 'xhs'">
          <img src="/mobile/static/img/footerDetail/4.png" alt="" style="display: block; margin: 0px auto 0; width: 60%" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footerDetail',
    computed: {
      type() {
        return this.$route.query.type
      }
    }
  }
</script>

<style scoped lang="scss">
  .home-page {
    line-height: 1.2;
    .content {
      width: 80%;
      margin: 0 auto;
      box-shadow: #0c0c0c -5px 9px 17px 4px;
      .logo-box {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        background-color: #121212;
        img {
          width: 20%;
        }
      }
      .code-box {
        background-color: #fff;
        width: 100%;
        padding: 3% 0;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .font20{
      font-size:20px;
    }
    .font14{
      font-size:14px;
    }
    .font10{
      font-size:10px;
    }
  }
</style>
