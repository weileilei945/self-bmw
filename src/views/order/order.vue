<template>
  <div class="container">
    <div class="content">
      <div class="user-msg">
        <template v-if="userInfo">
          <div class="user">{{
              wecomeText
            }}{{ userInfo.nickName ? "," + userInfo.nickName : "" }}。
          </div>
          <div class="common first">ID：{{ userInfo.nickName ? userInfo.nickName : "" }}<span
              @click="$router.push('/changeId')">前往修改></span></div>
          <div class="common">邮箱：
            <template v-if="userInfo.mailbox">{{ userInfo.mailbox }}</template>
            <template v-else
            >尚未验证
              <span @click="$router.push({ name: 'verfiyMail' })"
              >修改邮箱 ></span
              ></template>
          </div>
          <div class="common">手机号：
            <template v-if="userInfo.mobile">{{ userInfo.mobile }}</template>
            <template v-else
            >尚未验证
              <span style="margin-left: 10px"
                    @click="$router.push({ name: 'BindPhone' })"
              >前往验证 >
              </span
              >
            </template
            >
          </div>
          <div class="change" @click="$router.push({ name: 'changePwd' })">修改密码></div>
        </template>
        <template v-else>
          <el-link
              :underline="false"
              @click="$router.push({ name: 'LoginEmail' })"
          >请先登录
          </el-link
          >
        </template>
      </div>
      <template v-if="orderList.length">
        <div class="right-box">
          <div class="left-nav">
            <h2>最近的订单</h2>
            <el-tabs
                tab-position="left"
                v-model="activeName"
            >
              <el-tab-pane
                  v-for="item in orderList"
                  :key="item.id"
                  :label="item.timer"
                  :name="item.id"
              >
                <div slot="label" class="tabs-title">
                  <div>{{ item.year }}</div>
                  <div>{{ item.timer }}</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="order-box">
            <div>
              <div class="title-box">
                <div v-for="item in order.title" :key="item">{{ item }}</div>
              </div>
              <ul>
                <li v-for="item in order.list" :key="item.partsName">
                  {{ item.partsName + "*" + item.partsNumber }}
                </li>
              </ul>
              <h1 style="font-size: 24px">
                预计送达
                <span style="margin-left: 10px">{{ order.arriveTime }}</span>
              </h1>
              <div class="progress-box">
                  <span
                      v-show="order.state !== ''"
                      :style="{ width: 20 * (order.state + 1) + '%' }"
                  ></span>
              </div>
              <div class="progress-text">
                  <span
                      v-for="(item, idx) in stateList"
                      :key="idx"
                      :class="{ active: order.state === idx }"
                  >{{ item }}</span
                  >
              </div>
              <div class="logistics">
                <div>
                  物流承运商：{{
                    order.logisticsName ? order.logisticsName : "暂未生成"
                  }}
                </div>
                <div>
                  物流识别号：{{
                    order.logisticsId ? order.logisticsId : "暂未生成"
                  }}
                </div>
                <!--                  <el-scrollbar style="height:160px;">-->
                <!--                    <div class="logistics-box">-->
                <!--                      <div class="line"></div>-->
                <!--                      <div v-for="item in order.logisticsList" :key="item.time" class="logistics-item">-->
                <!--                        <div class="time">{{ item.time }}</div>-->
                <!--                        <div>{{ item.content }}</div>-->
                <!--                      </div>-->
                <!--                    </div>-->

                <!--                  </el-scrollbar>-->
              </div>

              <div class="pay-box">
                <div>付款摘要</div>
                <div class="pay-type">
                  使用以下方式全款付款：<img
                    :src="
                        '/mobile/static/img/others/' +
                        (order.payWay == 0 ? 'wx' : 'zfb') +
                        '.png'
                      "
                />
                  <!-- {{
                    order.payType == 1 ? "全款" : "贷款"
                  }} -->
                </div>
                <div>运费: {{ order.freight ? order.freight : "免费" }}</div>
                <h2>
                  总计：RMB
                  <span style="font-family: 'ELEMENT-ICONS'">{{
                      formatPrice(order.orderTotal)
                    }}</span>
                </h2>
                <template v-if="order.orderType == '1'">
                  <div class="tips">
                    <template v-if="order.isPaymentNode == '0'">
                      支付余款将在商品正式发售时开启
                    </template>
                    <template v-else>
                      预定金已{{ order.dilatationCoefficient }}倍抵扣
                    </template>
                  </div>
                  <el-button
                      class="pay-btn"
                      type="primary"
                      v-if="order.isPayment == '1'"
                      :disabled="order.isPaymentNode == '0'"
                      @click="pay"
                  >支付余款
                  </el-button
                  >
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-data">
          暂无订单
        </div>
      </template>

    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      stateList: ["已收到货款", "正在处理订单", "准备发货", "已发货", "已送达"],
      activeName: "0",
      orderList: [],
      order: {},
    }
  },
  watch: {
    activeName() {
      this.getOrder();
    },
    userInfo: {
      handler(userInfo) {
        this.getOrderList();
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    wecomeText() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let state = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        state = `早上好`;
      } else if (hours > 10 && hours <= 14) {
        state = `中午好`;
      } else if (hours > 14 && hours <= 18) {
        state = `下午好`;
      } else if (hours > 18 && hours <= 24) {
        state = `晚上好`;
      }
      return state;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {
    if (!localStorage.getItem("ticket")) {
      window.sessionStorage.setItem("isCompletion", JSON.stringify(this.$route.query));
      this.$router.push({name: "LoginEmail"});
    }
  },
  methods: {
    formatPrice(val) {
      if (!val) return;
      return val.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      });
    },
    getOrderList() {
      if (!this.userInfo || !this.userInfo.id) {
        return;
      }
      this.$api
          .getOrderList({
            clientId: this.userInfo.id,
          })
          .then((res) => {
            if (res.code === 0) {
              this.orderList = res.data.map((item) => {
                return {
                  id: item.id,
                  year: this.$timeFormat(item.creationTime, "yyyy年"),
                  timer: this.$timeFormat(item.creationTime, "mm 月 dd 日"),
                };
              });
              if (this.orderList.length) {
                this.activeName = this.orderList[0].id;
              }
            }
          });
    },
    getOrder() {
      if (!this.activeName) return;
      this.$api
          .getOrder({
            orderId: this.activeName,
          })
          .then((res) => {
            if (res.code === 0) {
              const changeNumToHan = (num) => {
                if (!num) return;
                var arr1 = [
                  "零",
                  "一",
                  "双",
                  "三",
                  "四",
                  "五",
                  "六",
                  "七",
                  "八",
                  "九",
                ];
                var arr2 = [
                  "",
                  "十",
                  "百",
                  "千",
                  "万",
                  "十",
                  "百",
                  "千",
                  "亿",
                  "十",
                  "百",
                  "千",
                  "万",
                  "十",
                  "百",
                  "千",
                  "亿",
                ];
                if (!num || isNaN(num)) return "零";
                var english = num.toString().split("");
                var result = "";
                for (var i = 0; i < english.length; i++) {
                  var des_i = english.length - 1 - i; // 倒序排列设值
                  result = arr2[i] + result;
                  var arr1_index = english[des_i];
                  result = arr1[arr1_index] + result;
                }
                result = result
                    .replace(/零(千|百|十)/g, "零")
                    .replace(/十零/g, "十"); // 将【零千、零百】换成【零】 【十零】换成【十】
                result = result.replace(/零+/g, "零"); // 合并中间多个零为一个零
                result = result.replace(/零亿/g, "亿").replace(/零万/g, "万"); // 将【零亿】换成【亿】【零万】换成【万】
                result = result.replace(/亿万/g, "亿"); // 将【亿万】换成【亿】
                result = result.replace(/零+$/, ""); // 移除末尾的零
                // 将【一十】换成【十】
                result = result.replace(/^一十/g, "十");
                return result;
              };
              this.order = {
                id: res.data.id,
                orderId: res.data.orderNumber,
                year: this.$timeFormat(res.data.creationTime, "yyyy年"),
                timer: this.$timeFormat(res.data.creationTime, "mm 月 dd 日"),
                title: [
                  "Achen&Cybe\r\n风格化组件",
                  `For ${res.data.listOrderGoodsMountings[0].brandName} ${res.data.listOrderGoodsMountings[0].carModelName}`,
                ],
                list: res.data.listOrderGoodsMountings,
                arriveTime: this.$timeFormat(
                    res.data.completionTime,
                    "yyyy年mm月dd日"
                ),
                state:
                    res.data.orderState !== "0"
                        ? Number(res.data.orderState) - 1
                        : "",
                logisticsName: res.data.deliveryBusinessName,
                logisticsId: res.data.courierNumber,
                logisticsList: [],
                payWay: res.data.patternOfPayment, //付款方式
                // payType: res.data.patternOfPayment, //付款类型
                freight: 0, //运费
                orderTotal: res.data.orderTotalAmount, //总额
                orderType: res.data.orderType,
                isPayment: res.data.isPayment,
                isPaymentNode: res.data.isPaymentNode,
                dilatationCoefficient: changeNumToHan(
                    res.data.dilatationCoefficient
                ),
              };
              console.log(this.order);
            }
          });
    },
    pay() {
      this.$router.push({
        name: "payment",
        query: {
          order: this.order.orderId,
          total: this.order.orderTotal,
        }
      })
    },
  },
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
      background: #fff;
      box-sizing: border-box;
      padding: 32px 32px 0;

      .user {
        font-size: 19px;
        line-height: 1;
      }

      .common {
        font-size: 12px;
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
        line-height: 2;
        color: #559ffb;
      }
    }

    .no-data {
      margin: 16px auto 24px;
      width: 100%;
      height: 355px;
      background: url('/mobile/static/img/order/noorder.png') no-repeat;
      background-size: 100% 100%;
      color: #fff;
      padding: 20px 40px 0;
    }

    .right-box {
      margin: 16px auto 24px;
      width: 100%;
      height: 480px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 24px 0;
      display: flex;
      position: relative;

      .empty {
        position: absolute;
        top: 48px;
        left: 71px;
        font-size: 19px;
        color: #fff;
      }

      .left-nav {
        width: 100px;
        height: 100%;
        border-right: 1px solid #ccc9c9;
        box-sizing: border-box;

        h2 {
          font-size: 14px !important;
          width: 100px;
          font-weight: initial;
          text-align: center;
        }

        ::v-deep .el-tabs {
          height: 400px;
        }

        ::v-deep .el-tabs__nav-wrap {
          padding: 0;

          &::after {
            display: none;
          }
        }

        ::v-deep .el-tabs__nav-scroll {
          overflow: hidden auto;
        }

        ::v-deep .el-tabs__header {
          width: 100px;

          .el-tabs__item {
            text-align: left;
            padding: 20px 0px !important;
            font-size: 12px !important;
          }

          .el-tabs__active-bar {
            display: none;
          }
        }

        .tabs-title {
          margin: 0 auto;
          width: 74px;
          padding: 4px 6px;
          bvorder: 1px solid #409eff;
          border-radius: 6px;
          color: #8a8a8a;

          div {
            height: 16px;
            line-height: 16px;
          }
        }

        .is-active .tabs-title {
          background-color: #409eff;

          div {
            color: #fff !important;
          }
        }
      }

      .order-box {
        margin-left: 20px;
        width: calc(100% - 140px);
        text-align: left;
        font-weight: bolder;
        line-height: 1.6;

        .title-box {
          padding-top: 0px;
        }

        ul {
          font-size: 12px !important;
          margin-top: 18px;
          margin-left: 20px;
          margin-bottom: 24px;
          list-style: disc;
          font-weight: initial;
          white-space: pre-line;
        }

        h1 {
          font-weight: initial;
          font-size: 14px !important;
        }

        h2 {
          font-weight: bolder;
        }

        .progress-box {
          width: 100%;
          height: 5px;
          background-color: #c8c8c8;
          border-radius: 10px;
          margin: 10px 0 10px;
          position: relative;

          span {
            width: 0;
            position: absolute;
            display: inline-block;
            height: 5px;
            background-color: #007f00;
            top: 0;
            left: 0;
            transition: width 0.25s;
            border-radius: 10px;
          }
        }

        .progress-text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #97979a;
          font-size: 8px;
          font-weight: 300;

          & > .active {
            color: #000;
          }
        }

        .logistics {
          margin-top: 16px;
          font-weight: 300;
          font-size: 12px !important;

          //div {
          //  margin-top: 4px;
          //}

          .logistics-box {
            margin: 0 20px;
            position: relative;
            padding: 10px 20px;
          }

          .line {
            position: absolute;
            background-color: #ececec;
            width: 2px;
            height: 100%;
            left: 0;
            top: 0;
          }

          .logistics-item + .logistics-item {
            border-top: 1px solid #ececec;
            padding: 6px 0;
          }

          .logistics-item {
            font-weight: initial;

            .time {
              position: relative;

              &::before {
                position: absolute;
                content: " ";
                width: 6px;
                height: 6px;
                border-radius: 10px;
                background-color: #afc6ea;
                left: -22px;
                top: 10px;
                z-index: 3;
              }

              &::after {
                position: absolute;
                content: " ";
                width: 16px;
                height: 16px;
                border-radius: 12px;
                background-color: #fff;
                left: -22px;
                top: 6px;
                z-index: 2;
              }
            }
          }
        }

        .pay-box {
          margin-top: 24px;
          font-weight: 300;
          font-size: 12px;

          .pay-type {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            margin-top: -6px;

            img {
              width: 80px;
            }
          }

          .tips {
            font-size: 10px;
            color: #adadad;
            font-weight: 100;
            margin-top: -4px;
            margin-bottom: 6px;
          }

          .pay-btn {
            padding: 8px 32px;
            background-color: #409eff;

            &.is-disabled {
              background-color: #9c9c9c;
              border-color: #9c9c9c;
            }
          }
        }
      }
    }
  }
}
</style>
