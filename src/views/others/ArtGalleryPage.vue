<template>
  <Page>
    <div class="home-page">
      <img
        src="/mobile/static/img/others/back_r_mobile.jpg"
        width="100%"
        height="100%"
        style="margin-top: -3%"
      />
      <div class="text-box">
        <div>Achen&Cybe欢迎爱车的你来分享你与车的故事</div>
        <div>在这里你可以尽情分享你与爱车的点点滴滴</div>
        <div>发送你的摄影照片+文字到</div>
        <div class="email">Museum@Achen&Cybe.com</div>
      </div>
      <div class="banner-text">
        <div>WELCOME</div>
        <div>Achen&Cybe艺术馆期待你的加入</div>
      </div>
      <img src="/mobile/static/img/others/art_1.jpg" class="scroll-banner" />
    </div>
  </Page>
</template>
<script>

  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .home-page {
    text-align: center;
    .text-box {
      margin-top: 54px;
      color: #fff;
      font-size: 18px;
      line-height: 1.7;
    }

    .banner-text {
      margin-top: 54px;
      color: #fff;
      font-size: 60px;
      line-height: 1.2;

      div:last-child {
        margin-top: 18px;
        font-size: 16px;
      }
    }

    .scroll-banner {
      width: 100%;
      padding: 40px 0 120px;
    }

    @media screen and (max-width: 500px) {
      .text-box {
        margin-top: 32px;
        font-size: 12px;

        .email {
          margin-top: 32px;
          font-size: 20px;
        }
      }
      .banner-text {
        margin-top: 32px;
        font-size: 32px;

        div:last-child {
          margin-top: 18px;
        font-size: 12px;
        }
      }
      .scroll-banner {
        width: 100%;
        padding: 40px 0 60px;
      }
    }
  }
</style>
