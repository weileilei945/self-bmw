<template>
  <div class="home-page">
    <div class="content-box">
      <div class="bg">
        <img src="/mobile/static/img/footerDetail/1.jpg" />
        <div style="clear: both"></div>
      </div>
      <div class="content-text">
        <p v-for="(item, idx) in pList" :key="item" :class="{ font43: idx == 4, padding43: idx == 3 || idx == 8 }">
          {{ item }}
        </p>
        <img src="/mobile/static/img/footerDetail/5.jpg" />
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        pList: [
          '喜欢交朋友？',
          '喜欢玩车？',
          '喜欢新鲜事物？',
          '来这儿就对了！',
          'WELCOME',
          'Achen&Cybe Club联手Car&Coffee',
          '将于每周在北京举行聚会',
          '期待你的加入',
          '关注Achen&Cybe官方公众号以获取活动信息'
        ]
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .content-box {
    width: 100%;
    position: relative;

    .bg {
      position: relative;
      overflow: hidden;
      img {
        position: relative;
        width: 100vw;
      }
    }
    .content-text {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 30px;

      p {
        color: #fff;
        font-size: 14px;
        line-height: 24px;

        &.font43 {
          font-size: 32px;
          line-height: 56px;
        }

        &.padding43 {
          padding-top: 32px;
        }
      }

      img {
        width:160px;
        margin-top: 37px;
      }
    }
  }
</style>
