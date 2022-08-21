<template>
  <div class="service minus-top">
    <div style="padding-bottom: 15px">
      <div class="index-banner-box" style="padding-top: 10px">
        <img :src="banner" width="100%" alt=""/>
        <!--        <div class="index-banner-text">-->
        <!--          于商品正式发售前在Achen&Cybe官方网站、官方淘宝商城支付预定金，<br />-->
        <!--          享<span>双倍</span>膨胀抵扣，即尾款减去预定金额的两倍。-->
        <!--          <div class="tips-text">-->
        <!--            1.仅限Achen&Cybe预售商品。2.预售商品依旧享受Achen&Cybe-->
        <!--            Care+服务。3.预定一旦达成我们将为您预留产品，将恕不可退还预定金。-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <zui-car-list type="carlistM3"></zui-car-list>
      <zui-car-list type="carlistBMW3"></zui-car-list>
      <zui-car-list type="carlistchallenger"></zui-car-list>
    </div>
  </div>
</template>
<script>
import ZuiCarList from '../components/CarList.vue'

export default {
  components: {
    ZuiCarList
  },
  data() {
    return {
      banner: "",
    }
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$api.getBanner().then((res) => {
        if (res.code === 0) {
          let data = res.data.find((item) => {
            return item.pictureTpye == "1";
          });
          if (data) {
            this.banner = "https://www.achencybe.com/admin" + data.attachmentLocalAddress;
            console.log(this.banner)
          }
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.index-banner-box {
  img {
    display: block;
  }

  .index-banner-text {
    width: 100%;
    color: #ffffff;
    background-color: #2d2d2d;
    box-sizing: border-box;
    padding: 25px 12px;
    font-size: 11px;
    line-height: 1.8;

    span {
      font-size: 18px;
    }

    .tips-text {
      margin-top: 5px;
      font-size: 5px;
    }
  }
}

.service {
  width: 100%;
  background: #0c0c0c;
  height: 100%;
  overflow: auto;
}
</style>
