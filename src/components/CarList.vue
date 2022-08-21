<template>
  <div class="zui-car-list" @click="onClick">
    <img :src="src" @click="onClick" />
    <div class="zui-buy-area">
      <div>
        <div class="sub-title" v-for="item in subTitle" :key="item">{{ item }}</div>
        <div class="title">{{ title }}</div>
      </div>
      <div class="button">
        <span class="zui-buy-button" @click="goToBuy(type)">立即购买</span>
        <span class="zui-learn-button" @click="goToLearn(type)">了解更多</span>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'CarList',
    props: {
      type: {
        default: 'carlistM2'
      },
      href: {
        default: '/'
      }
    },
    computed: {
      src: function () {
        if (this.type === 'carlistBMW3') {
          return '/mobile/static/img/home/BMW3_mobile.png'
        }
        if (this.type === 'carlistM3') {
          return '/mobile/static/img/home/M3_mobile.png'
        }
        if (this.type === 'carlistchallenger') {
          return '/mobile/static/img/home/challenger_mobile.png'
        } else {
          return null
        }
      },
      title: function () {
        if (this.type === 'carlistM3') {
          return '天生,不凡。'
        }
        if (this.type === 'carlistBMW3') {
          return '霸气,不可挡。'
        }
        if (this.type === 'carlistchallenger') {
          return '力量,乃信仰。'
        } else {
          return null
        }
      },
      subTitle: function () {
        if (this.type === 'carlistM3') {
          return ['适配BMW M3/M4 （G80/G82）', '雷肯茨博高性能碳纤维风格化组件']
        }
        if (this.type === 'carlistBMW3') {
          return ['适配BMW The 3 （G20/G28）', '雷肯茨博高性能碳纤维风格化组件']
        }
        if (this.type === 'carlistchallenger') {
          return ['适配DODGE CHANLLGER', '雷肯茨博高性能碳纤维风格化组件']
        } else {
          return null
        }
      }
    },
    methods: {
      onClick: function () {
        if (this.type === 'carlogo') {
          location.assign(this.href)
        }
      },
      goToBuy: function (types) {
        this.$router.push({ path: '/three', query: { cartype: types } })
      },
      goToLearn: function (types) {
        if (types === 'carlistBMW3') {
          this.$router.push({ path: '/the3' })
        }
        if (types === 'carlistM3') {
          this.$router.push({ path: '/m4' })
        }
        if (types === 'carlistchallenger') {
          this.$router.push({ path: '/challenger' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zui-car-list {
    color: #ffffff;
    font-size: 14px;
    min-width: 100px;
    min-height: 30px;
    padding-top: 15px;
    overflow: hidden;

    img {
      width: 100%;
      margin: 0;
      display: block;
    }

    .zui-buy-area {
      width: 100%;
      color: #ffffff;
      background-color: #2d2d2d;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 25px 12px;

      .sub-title {
        font-size: 12px;
        height: 18px;
        text-align: left;
      }

      .title {
        font-size: 32px;
        text-align: left;
        margin-left: -3px;
        margin-top: 14px;
      }

      .button {
        width: 120px;

        .zui-buy-button {
          text-align: center;
          line-height:1;
          padding:10px 0;
          width: 120px;
          background-color: #4169e1;
          margin: 5px 7px;
          color: #ffffff;
          display: inline-block;
          border-radius: 2px;
          cursor: pointer;
          font-size: 12px;
        }

        .zui-learn-button {
          text-align: center;
          line-height:1;
          padding:10px 0;
          width: 120px;
          margin: 15px 7px;
          background-color: #ffffff;
          color: #4169e1;
          display: inline-block;
          border-radius: 2px;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
</style>
