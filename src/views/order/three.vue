<template>
  <div class="container">
    <div class="content">
      <div class="logo">
        <img class="welcome" src="/mobile/static/img/order/1.png"/>
        <div class="banner">
          <img :src="bannerImg"/>
        </div>
      </div>
      <div class="tips">请点击对应组件选择按钮以加入购物车，<br/>您还可以通过Achen&Cybe Club淘宝商城进行订购。</div>
      <ul class="list">
        <li class="d-flex shop-item" v-for="(item, index) in shopList" :key="index">
          <div class="left">
            <img :src="item.img" alt=""/>
          </div>
          <div class="right">
            <div class="right-title">{{ item.title }}</div>
            <div class="right-desc">{{ item.info }}</div>
            <div class="right-tips">
              <div v-for="li in item.list" :key="li">{{ li }}</div>
            </div>
            <!--            <div class="right-fit">-->
            <!--              {{ item.fit }} <span>{{ item.model }}</span>-->
            <!--            </div>-->
            <div v-for="(attr,idx) in item.attrList" :key="attr.id">
              <div class="modelTip2">{{ attr.type }}</div>
              <div v-if="attr.subType" style="margin: 10px 0 4px">
                {{ attr.subType }}
              </div>
              <div class="right-price d-flex ai-center" @click.stop="attrClick(item,attr,idx)">
                <van-checkbox v-model="attr.active" icon-size="24px"></van-checkbox>
                <div class="price-text">
                  <span>{{ isPresell == "1" ? "预定金" : "" }}</span>
                  {{ $formatPrice(attr.price, "￥") }}
                </div>
              </div>
            </div>
            <div class="right-addr">配送到 {{ clientAdders }}</div>
            <div class="right-service">17:00前付款，今天发货，预计{{ completionTime }} ({{ week }})
              送达
            </div>
          </div>
        </li>
      </ul>

      <div class="submit">
        <div class="submit-title">感谢您的订购，Achen&Cybe Club期待您的加入。</div>
        <div class="submit-btn" @click="toGo">点击进一步完善订购</div>
      </div>
    </div>
  </div>
</template>
<script>
const cname = returnCitySN.cname;
export default {
  name: '',
  data() {
    return {
      checked: '',
      checked1: '',
      isPresell: null,
      completionTime: "",
      week: "",
      clientAdders: cname,
      shopList: []
    }
  },
  computed: {
    bannerImg() {
      let type = this.$route.query.cartype;
      if (type === "carlistM3") {
        return "/mobile/static/img/order/M4/2-0-1.png";
      } else if (type === "carlistBMW3") {
        return "/mobile/static/img/order/M3/1-0-1.png";
      } else if (type === "carlistchallenger") {
        return "/mobile/static/img/order/challenger/2-0-1.png";
      } else {
        return "";
      }
    },
  },
  mounted() {
    window.localStorage.removeItem("activeShopList");
    window.localStorage.removeItem("shopCar");
    this.getCarDetail();

  },
  methods: {
    getCarDetail() {
      let val = this.$route.query.cartype;
      if (!val) {
        this.$toast({
          message: "请先选择商品",
          type: "fail"
        })
        return;
      }
      let data = {
        carModelName:
            val === "carlistM3"
                ? "M3/M4"
                : val === "carlistBMW3"
                    ? "The 3"
                    : "Challgner SRT",
      };
      this.$api
          .getCarDetail(data)
          .then((res) => {
            if (res.code === 0) {
              this.isPresell = res.data.isPresell;
              if (res.data.isPresell == "0") {
                this.completionTime = res.data.completionTime
                    ? this.$timeFormat(res.data.completionTime, "yyyy年mm月dd日")
                    : "";
                this.week = res.data.completionTime
                    ? this.$weekFormat(res.data.completionTime)
                    : "";
              } else if (res.data.isPresell == "1") {
                this.completionTime = res.data.releaseTime
                    ? this.$timeFormat(res.data.releaseTime, "yyyy年mm月dd日")
                    : "";
                this.week = res.data.releaseTime
                    ? this.$weekFormat(res.data.releaseTime)
                    : "";
              }
              if (this.shopList.length) {
                return
              }
              res.data.listAccessoriesList.sort((a, b) => {
                return a.partsIndex - b.partsIndex;
              });
              if (val === "carlistchallenger") {
                this.shopList = [
                  {
                    id: 1,
                    img: "/mobile/static/img/order/challenger/2-0-2-1.png",
                    title: "碳纤维前部扰流饰板",
                    info: "侧面采用镂空的空气导流槽设计，不仅造型新颖，更有空气动力学性能加持。享有A&C Care+ 配件保护计划，如有后期损坏，可享受A&C Care+随心换。",
                    list: ["碳纤维材质", "兼容SRT设计套装"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[0].id,
                        type: "适配：Challenger SRT（2015-2022）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[0].partsPrice
                                : res.data.advanceDeposit,
                        title: "碳纤维前部扰流饰板",
                        partsPrice: res.data.listAccessoriesList[0].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[0].attrList[0].active : false,
                      },
                    ],
                  },
                  {
                    id: 2,
                    img: "/mobile/static/img/order/challenger/2-0-2-2.png",
                    title: "碳纤维尾部扩散器饰板",
                    info: "尾部扩散器饰板不仅支持原厂方口排气，同时也允许你更换更大口径的排气尾管。中间独立的扩散器能为车辆尾部提供扰流作用。",
                    list: ["碳纤维材质", "兼容全系设计套装"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[1].id,
                        type: "适配：Challenger （2015-2022）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[1].partsPrice
                                : res.data.advanceDeposit,
                        title: "碳纤维尾部扩散器饰板",
                        partsPrice: res.data.listAccessoriesList[1].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[1].attrList[0].active : false,
                      },
                    ],
                  },
                  {
                    id: 3,
                    img: "/mobile/static/img/order/challenger/2-0-2-3.png",
                    title: "翼子板及后侧围宽体组件",
                    info: "宽体组件能够完美的展现你的Challenger的姿态美。与原车设计融为一体的翼子板会让你的车颜值飙升。",
                    list: ["碳纤维材质", "兼容全系设计套装"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[2].id,
                        type: "适配：Challenger （2015-2022）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[2].partsPrice
                                : res.data.advanceDeposit,
                        title: "翼子板及后侧围宽体组件",
                        partsPrice: res.data.listAccessoriesList[2].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[2].attrList[0].active : false,
                      },
                    ],
                  },
                  {
                    id: 4,
                    img: "/mobile/static/img/order/challenger/2-0-2-4.png",
                    title: "引擎盖组件",
                    info: "整个引擎盖总成包含引擎盖外板、引擎盖内板与前进风口组件。高大的隆起造型会让看到你的Challenger的人瞬间肾上腺素飙升。",
                    list: ["碳纤维材质", "兼容全系设计套装"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[3].id,
                        type: "适配：Challenger （2015-2022）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[3].partsPrice
                                : res.data.advanceDeposit,
                        title: "引擎盖组件",
                        partsPrice: res.data.listAccessoriesList[3].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[3].attrList[0].active : false,
                      },
                    ],
                  },
                ];
              } else if (val === "carlistBMW3") {
                this.shopList = [
                  {
                    id: 1,
                    img: "/mobile/static/img/order/M3/1-0-2-1.png",
                    title: "碳纤维前部扰流饰板",
                    info: "采用三段式设计，完美贴合你的车身曲面。享有A&C Care+ 配件保护计划，如有后期损坏，可享受A&C Care+随心换。",
                    list: ["碳纤维材质", "兼容M设计套装"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[0].id,
                        type: "适配：BMW 3-Series M运动套件（G20/G28/G21）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[0].partsPrice
                                : res.data.advanceDeposit,
                        title: "碳纤维前部扰流饰板",
                        partsPrice: res.data.listAccessoriesList[0].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[0].attrList[0].active : false,
                      },
                    ],
                  },
                  {
                    id: 2,
                    img: "/mobile/static/img/order/M3/1-0-2-2.png",
                    title: "碳纤维尾部扰流板",
                    info: "中间镂空的尾部扰流板设计，经过精准优化以及CFD测试，在高速状态下可提供巨大的下压力，更减重至380g，它几乎不会对你的尾门开启产生负担。",
                    list: ["碳纤维材质", "兼容M设计套装和时尚设计套装"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[1].id,
                        type: "适配：BMW 3-Series （G20/G28）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[1].partsPrice
                                : res.data.advanceDeposit,
                        title: "碳纤维尾部扰流板",
                        partsPrice: res.data.listAccessoriesList[1].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[1].attrList[0].active : false
                      },
                    ],
                  },
                  {
                    id: 3,
                    img: "/mobile/static/img/order/M3/1-0-2-3.png",
                    title: "碳纤维尾部扩散器饰板",
                    info: "优雅但不失个性的独特设计，可以允许你为两个独立后扰流配件Spoiler Guys  喷涂车身色或其他个性化颜色。当然，你也可以后期单独造型更加凶悍的Spoiler Guys。",
                    list: [
                      "主体为碳纤维材质/Spoiler Guys为塑料材质/拓展Spoiler Guys为碳纤维材质",
                      "兼容M设计套装",
                    ],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[2].id,
                        type: "适配：BMW 3-Series （G20/G28/G21）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[2].partsPrice
                                : res.data.advanceDeposit,
                        title: "碳纤维尾部扩散器饰板",
                        partsPrice: res.data.listAccessoriesList[2].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[2].attrList[0].active : false,
                      },
                      {
                        id: res.data.listAccessoriesList[3].id,
                        type: "",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[3].partsPrice
                                : res.data.advanceDeposit,
                        title: "碳纤维尾部扩散器饰板",
                        partsPrice: res.data.listAccessoriesList[3].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[2].attrList[1].active : false,
                      },
                    ],
                  },
                  {
                    id: 4,
                    img: "/mobile/static/img/order/M3/1-0-2-4.png",
                    title: "拓展Spoiler Guys 组件",
                    info: "有了拓展Spoiler Guys组件，你的BMW 3可以以更夸张的姿态展现它的个性。两个刀锋的设计为尾部扰流提供更好的帮助。",
                    list: ["碳纤维材质", "兼容A&C Edition尾部扩散器饰板"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[4].id,
                        type: "如果您已选择配备拓展Spoiler Guys组件的商品，请勿重复购买此组件。",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[4].partsPrice
                                : res.data.advanceDeposit,
                        title: "拓展Spoiler Guys 组件",
                        partsPrice: res.data.listAccessoriesList[4].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[3].attrList[0].active : false,
                      },
                    ],
                  },
                ];
              } else {
                this.shopList = [
                  {
                    id: 1,
                    img: "/mobile/static/img/order/M4/2-0-2-1.png",
                    title: "前部扰流饰板",
                    info: "采用三段式设计，完美贴合你的车身曲面。享有A&C Care+ 配件保护计划，如有后期损坏，可享受A&C Care+随心换。",
                    list: ["碳纤维材质", "兼容G80/G82"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[0].id,
                        type: "适配：BMW M3/M4（G80/G81/G82/G83）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[0].partsPrice
                                : res.data.advanceDeposit,
                        title: "前部扰流饰板",
                        partsPrice: res.data.listAccessoriesList[0].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[0].attrList[0].active : false,
                      },
                    ],
                  },
                  {
                    id: 2,
                    img: "/mobile/static/img/order/M4/2-0-2-2.png",
                    title: "尾部扩散器饰板",
                    info: "采用三段式后扩散器饰板，包含双侧转角饰板、尾部扩散器和拖车钩盖饰板。在保留原厂M风格的同时拥有更激进的刀锋扩散器。\n",
                    list: ["碳纤维材质", "兼容G80/G82"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[1].id,
                        type: "适配：BMW M3/M4（G80/G81/G82/G83）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[1].partsPrice
                                : res.data.advanceDeposit,
                        title: "尾部扩散器饰板",
                        partsPrice: res.data.listAccessoriesList[1].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[1].attrList[0].active : false,
                      },
                    ],
                  },
                  {
                    id: 3,
                    img: "/mobile/static/img/order/M4/2-0-2-3.png",
                    title: "尾部扰流板",
                    info: "中间镂空的尾部扰流板设计，不仅仅能提强大的下压力，更减重至390g，它几乎不会对你的尾门开启产生负担。",
                    list: ["碳纤维材质", "兼容G80/G82/G20/G22/G28)"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[2].id,
                        type: "适配：BMW M3/3er(G80/G20/G28)",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[2].partsPrice
                                : res.data.advanceDeposit,
                        title: "尾部扰流板",
                        partsPrice: res.data.listAccessoriesList[2].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[2].attrList[0].active : false,
                      },
                      {
                        id: res.data.listAccessoriesList[3].id,
                        type: "适配：BMW M4/4er(G82/G22)",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[3].partsPrice
                                : res.data.advanceDeposit,
                        title: "尾部扰流板",
                        partsPrice: res.data.listAccessoriesList[3].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[2].attrList[1].active : false,
                      },
                    ],
                  },
                  {
                    id: 4,
                    img: "/mobile/static/img/order/M4/2-0-2-4.png",
                    title: "前部进气格栅饰板",
                    info: "灵感来源于BMW M4 GT3车型，相比于原车进气格栅撞风面积有所增加。格栅横向饰条圆角更加柔和，更具性能感与感性之美。",
                    list: ["碳纤维材质", "兼容G80/G82"],
                    attrList: [
                      {
                        id: res.data.listAccessoriesList[4].id,
                        type: "适配：BMW M3/M4（G80/G81/G82/G83）",
                        price:
                            res.data.isPresell == "0"
                                ? res.data.listAccessoriesList[4].partsPrice
                                : res.data.advanceDeposit,
                        title: "前部进气格栅饰板",
                        partsPrice: res.data.listAccessoriesList[4].partsPrice,
                        advanceDeposit: res.data.advanceDeposit,
                        num: 0,
                        active: this.shopList.length ? this.shopList[3].attrList[0].active : false,
                      },
                    ],
                  },
                ];
              }
            }
          })
          .catch((err) => {
            console.error("getCarDetail", err);
          });
    },
    attrClick(item, attr, idx) {
      if (item.attrList.length > 1) {
        item.attrList.forEach((item, index) => {
          if (index !== idx) {
            item.active = false;
          } else {
            item.active = !item.active;
          }
        })
      } else {
        attr.active = !attr.active;
      }
    },
    toGo() {
      let hasShop = false;
      this.shopList.forEach((item) => {
        item.attrList.forEach((item) => {
          if (item.active) {
            hasShop = true;
          }
        });
      });
      if (!hasShop) {
        this.$toast({
          message: "请先选择商品",
          type: "fail"
        });
        return;
      }
      window.localStorage.setItem(
          "activeShopList",
          JSON.stringify(this.shopList)
      );
      if (!localStorage.getItem("ticket")) {
        window.sessionStorage.setItem("isCompletion", JSON.stringify({
          cartype: this.$route.query.cartype,
          completionTime: this.completionTime
        }));
        this.$router.push({name: "LoginEmail"});
      } else if (
          !sessionStorage.getItem("userInfo") ||
          (this.$store.state.userInfo && !this.$store.state.userInfo.mobile)
      ) {
        window.sessionStorage.setItem("isCompletion", JSON.stringify({
          cartype: this.$route.query.cartype,
          completionTime: this.completionTime
        }));
        this.$toast({
          type: "fail",
          message: "请先补全手机号",
        });
        let timer = setTimeout(() => {
          this.$router.push({name: "BindPhone"});
          clearTimeout(timer);
        }, 800);
      } else {
        let type = this.$route.query.cartype;
        console.log(this.completionTime)
        this.$router.push({
          name: "ShopCar",
          query: {cartype: type, completionTime: this.completionTime},
        });
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  color: #fff;
  width: 100%;
  background: #191919;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .content {
    width: 100%;
    min-height: calc(100% - 180px);

    .logo {
      width: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      text-align: center;

      .welcome {
        width: 28%;
        padding-top: 20px;
      }

      .banner {
        width: 98%;
        margin: 0 auto;
        height: 123px;
        display: flex;
        align-items: center;

        img {
          width: 100%;
        }
      }
    }

    .tips {
      width: 100%;
      padding: 12px 0;
      position: relative;
      font-size: 7px;
      text-align: center;
      line-height: 1.6;

      &::after {
        content: '';
        position: absolute;
        width: 322px;
        border-bottom: 1px solid #434343;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    ul.list {
      width: 100%;
      padding: 0 15px;

      li {
        width: 100%;
        min-height: 198px;
        border-bottom: 1px solid #434343;

        .left {
          width: 112px;
          margin-right: 18px;

          img {
            margin-top: 22px;
            width: 100%;
            height: 70px;
            display: block;
            border-radius: 4px;
          }
        }

        .right {
          font-size: 7px;
          flex: 1;
          padding-top: 22px;
          line-height: 1;

          &-title {
            font-size: 11px;
          }

          &-desc {
            margin-top: 4px;
            line-height: 1.4;
            color: rgba(255, 255, 255, 0.8);
          }

          &-tips {
            line-height: 1;
            font-size: 6px;

            div {
              padding-left: 8px;
              position: relative;
              line-height: 10px;
              margin: 4px 0;

              &::before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                width: 3px;
                height: 3px;
                border-radius: 50%;
                background: #fff;
              }
            }
          }

          &-fit {
            margin: 14px 0;
            font-size: 10px;

            span {
              font-size: 6px;
            }
          }

          .modelTip2 {
            margin: 8px 0;
            font-size: 8px;
            line-height: 1.2;
          }

          &-price {
            width: 180px;
            height: 34px;
            font-size: 15px;
            background: #fff;
            border-radius: 4px;
            text-align: center;
            line-height: 34px;
            color: #000;
            padding: 0 25px;

            .price-text {
              flex: 1;
              font-weight: 100;
            }

            span {
              font-size: 14px;
            }
          }

          &-addr {
            color: rgba(255, 255, 255, 0.7);
            padding: 8px 0;
          }

          &-service {
            color: rgba(255, 255, 255, 0.7);
            padding-bottom: 22px;
          }
        }
      }
    }
  }

  .submit {
    margin-top: 20px;
    height: 80px;

    &-title {
      padding-top: 18px;
      font-size: 8px;
      text-align: center;
      line-height: 1;
    }

    &-btn {
      margin: 4px auto 0;
      width: 280px;
      height: 26px;
      background: #3e7afd;
      font-size: 13px;
      border-radius: 3px;
      text-align: center;
      line-height: 27px;
    }
  }
}
</style>
