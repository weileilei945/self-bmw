<template>
  <div class="home-page">
    <div class="banner-box">
      <img src="/mobile/static/img/others/investors_banner.png" width="100%" />
    </div>

    <div class="text-box">
      <div>雷肯茨博（Achen&Cybe）贝塞尔（BESA）有着深度合作研发的关系，</div>
      <div>BESA也为Achen&Cybe投资并共同发展。</div>
      <div>同时，我们依然开放投资资格。</div>
      <div>如果您对Acen&Cybe品牌及未来发展持有兴趣与信心，</div>
      <div>欢迎您加入Acen&Cybe投资者行列。</div>
    </div>
    <div class="banner-text">
      <div>WELCOME</div>
      <div>欢迎您的加入</div>
    </div>
    <div style="width: 100%; padding: 30px 0px; text-align: center">
      <a @click="goToForm">点击此处提交表单，我们的商务团队会尽快联系您。</a>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>

  export default {
    data() {
      return {}
    },
    methods: {
      goToForm() {
        this.$router.push({
          name: 'InvestorsFormPage'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-page {
    line-height: 1.2;
    text-align: center;
    .banner-box {
      width: 100%;
      position: relative;
      .text {
        position: absolute;
        width: 100%;
        text-align: center;
        color: #fff;
        top: 30%;
        .text-1 {
          font-size: 20px;
        }

        .text-2 {
          font-size: 56px;
        }
      }
      .img {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 10%;
        .logo {
          width: 120px;
        }
        .besa {
          width: 60px;
          margin-left: 48px;
        }
      }
    }
    .text-box {
      margin-top: 32px;
      font-size: 10px;
      color: #fff;
      line-height: 1.7;
      font-weight: 100;
    }

    .banner-text {
      margin-top: 26px;
      font-size: 28px;
      color: #fff;
      line-height: 1.2;
    }

    a {
      display: inline-block;
      color: #fff;
      cursor: pointer;
      margin: 0 0 32px 0;
      font-size: 8px;
      font-weight: 100;
    }
  }
</style>
