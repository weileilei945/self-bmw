<template>
  <div class="container">
    <div class="content">
      <div class="choose-tip">选择您的付款方式</div>
      <div class="order-msg">
        <div class="price">订单总价：{{ $formatPrice(total, "RMB") }}</div>
        <div class="num">订单编号：{{ orderId }}</div>
        <img src="/mobile/static/img/order/zfbPay.png" class="alipay" alt=""
             @click="toPay('1')"/>
        <img src="/mobile/static/img/order/wxPay.png" class="alipay" alt=""
             @click="toPay('0')"/>
        <div class="tips">请在30分钟内完成支付，逾期订单将关闭</div>
        <div class="payrwm">
          <img :src="payCode">
        </div>
      </div>
      <div class="order-fail">
        <div class="tips">支付遇到问题？</div>
        <div class="logo">
          <img src="/mobile/static/img/order/pay-bottom.png" alt=""/>
        </div>
        <div class="word">请扫描二维码联络Achen&Cybe Support以获取支持。</div>
        <div class="qrcode"><img src="/mobile/static/img/order/rCode.jpg" alt=""/></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      orderId: "",
      cardInfo: {},
      shopCar: [],
      wxCode: null,
      wxOrderId: null,
      zfbCode: null,
      zfbOrderId: null,
      payType: null,
      timer1: null,
      timer2: null
    }
  },
  computed: {
    total() {
      let total = 0;
      if (this.$route.query.total) {
        total = this.$route.query.total;
      } else if (this.shopCar.length) {
        this.shopCar.forEach((item) => {
          if (item.active) {
            total += Number(item.price);
          }
        });
      }
      return total
    },
    payCode() {
      if (this.payType == "1") {
        return this.zfbCode;
      } else if (this.payType == "0") {
        return this.wxCode;
      } else {
        return "/mobile/static/img/order/pay_default.jpg";
      }
    }
  },
  mounted() {
    if (this.$route.query.order) {
      this.orderId = this.$route.query.order;
      this.createCode();
    } else if (window.localStorage.getItem("shopCar")) {
      this.shopCar = JSON.parse(window.localStorage.getItem("shopCar"));
      this.createOrder();
    } else {
      alert("未查询到购买商品");
    }
  },
  methods: {
    createOrder() {
      this.$api.addOrderNumber().then((res) => {
        if (res.code === 0) {
          this.orderId = res.msg;
          this.getCarType();
        }
      });
    },
    getCarType() {
      const val = this.$route.query.cartype
          ? this.$route.query.cartype
          : "carlistM3";
      let data = {
        carModelName:
            val === "carlistM3"
                ? "M3/M4"
                : val === "carlistBMW3"
                    ? "The 3"
                    : "Challgner SRT",
      };
      this.$api.getCarDetail(data).then((res) => {
        if (res.code === 0) {
          this.cardInfo = res.data;
          this.saveOrder();
        }
      });
    },
    saveOrder() {
      const userInfo = this.$store.state.userInfo;
      let data = {
        orderNumber: this.orderId,
        orderType: this.cardInfo.isPresell,
        clientId: userInfo.id,
        completionTime:
            this.cardInfo.isPresell == "1"
                ? this.cardInfo.releaseTime
                : this.cardInfo.completionTime,
        listOrderGoodsMountings: this.shopCar
            .filter((item) => {
              return item.active;
            })
            .map((item) => {
              return {
                accessoriesListId: item.id,
                partsName: item.title,
                partsPrice: item.partsPrice,
                partsNumber: 1
              };
            })
      };
      if (window.localStorage.getItem("facilitatorId")) {
        data.shippingMethod = "配送至服务商";
        data.facilitatorId = window.localStorage.getItem("facilitatorId");
      } else {
        data.shippingMethod = "为我送货";
        data.clientName = userInfo.deliveryName;
        data.city = userInfo.deliveryCityName;
        data.address = userInfo.deliveryAddress;
        data.recipientPhone = userInfo.deliveryMobile;
      }

      if (this.cardInfo.isPresell == "1") {
        let total = 0;
        if (this.shopCar.length) {
          this.shopCar.forEach((item) => {
            if (item.active) {
              total += item.price * 1;
            }
          });
        }
        data.advanceDeposit = total;
        data.dilatationCoefficient = this.cardInfo.dilatationCoefficient;
        data.orderTotalAmount = total;
      } else {
        console.log(this.shopCar)
        let total = 0;
        if (this.shopCar.length) {
          this.shopCar.forEach((item) => {
            if (item.active) {

              total += item.partsPrice * 1;
            }
          });
        }
        data.orderTotalAmount = total;
      }
      this.$api.saveOrder(data).then((res) => {
        if (res.code === 0) {
          this.createCode();
        }
      });
    },
    createCode() {
      this.$api.getWXPayCode({
        total_fee: this.total,
        order_id: this.orderId,
        pay_type: ''
      }).then(res => {
        if (res.code === 0) {
          this.wxOrderId = res.data.outTradeNo;
          this.wxCode = res.data.wxPayQrCode;
        }
      });
      this.$api.getZFBPayCode({
        total_fee: this.total,
        order_id: this.orderId
      }).then(res => {
        if (res.code === 0) {
          this.zfbOrderId = res.data.outTradeNo;
          this.zfbCode = res.data.aliPayQrCode;
        }
      });
      this.timer1 = setTimeout(() => {
        clearTimeout(this.timer1);
        this.createCode();
      }, (5 * 60 * 1000));
      this.getPayState();
    },
    toPay(type) {
      this.payType = type;
    },
    getPayState() {
      this.timer2 = setInterval(() => {
        if (!this.wxOrderId && !this.zfbOrderId) {
          return;
        }
        let data = {
          orderId: this.orderId,
          refId: this.wxOrderId + "," + this.zfbOrderId
        };
        this.$api.getPayState(data).then(res => {
          if (res.code === 0 && res.data == "1") {
            clearTimeout(this.timer1);
            clearInterval(this.timer2);
            this.$router.push({name: "payResult"});
          }
        });
      }, 1000);
    },
    toPayPage() {
      window.location.href = "";
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer1);
    clearInterval(this.timer2);
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
  color: #fff;

  .content {
    width: 100%;
    padding: 0 16px;

    .choose-tip {
      width: 100%;
      height: 74px;
      border-bottom: 1px solid #434343;
      color: #fff;
      font-size: 15px;
      line-height: 73px;
      text-align: center;
      letter-spacing: 1px;
    }

    .order-msg {
      width: 100%;
      height: 500px;
      border-bottom: 1px solid #434343;
      line-height: 1.2;
      text-align: center;
      padding: 18px 40px;

      .price {
        font-size: 15px;
      }

      .num {
        margin-top: 10px;
        font-size: 10px;
      }

      .tips {
        font-size: 8px;
      }

      .payrwm {
        margin-top: 30px;

        img {
          width: 80%;
        }
      }

      .alipay {
        width: 176px;
        background: #fff;
        margin: 27px auto 24px;
        border-radius: 4px;
      }

      .alipay + .alipay {
        margin-top: 0px;
      }
    }

    .order-fail {
      width: 100%;
      text-align: center;

      .tips {
        margin-top: 18px;
        font-size: 15px;
      }

      .logo {
        width: 100%;

        img {
          width: 233px;
        }
      }

      .word {
        font-size: 10px;
      }

      .qrcode {
        width: 125px;
        height: 125px;
        margin: 32px auto;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
