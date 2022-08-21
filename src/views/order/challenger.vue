<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="top-img">
          <div class="top-img-btn" @click="goToBuy">立即购买</div>
          <div class="top-img-more"></div>
        </div>
      </div>
      <div>
        <div class="details">
          <div class="details-first">
            <div class="logo d-flex jc-center">
              <div class="logo-img">
                <img src="/mobile/static/img/logo.png" alt=""/>
              </div>
              <!-- <div>BM</div> -->
            </div>
            <div class="details-tips">
              <div class="h1">雷肯茨博风格化组件套装</div>
              <div class="h3 font-content"
              >采用媲美原厂的干碳纤维工艺，经过0.5Mpa高压与120摄氏度高温成型，呈现卓越轻量化性能与品质感。
              </div>
              <div class="h3 font-content"> 设计出自A&CStudio之手，与BMW的设计语言巧妙结合，浑然一体。</div>
              <div class="h3 font-content">现已全面发售。</div>
            </div>
            <div class="details-car">
              <div class="them3">
                <img src="/mobile/static/img/m4/c8.png" width="100%"/>
                <!-- <div class="title">THEM3</div> -->
              </div>
              <!-- <div class="them4"></div> -->
            </div>
          </div>

          <div class="details-config">
            <div class="details-config-tips">
              <div class="h3 mt25 font-8">亮点与配置</div>
              <div class="h1 font-medium">标准套装包含</div>
              <div class="h3 font-11 fw-100"> 通过轻量化性能和极致的设计，展示您的Challenger SRT的全部潜力。</div>
              <div class="h3 font-11 fw-100">A&C Edition标准套装包含车辆前部扰流饰板、车辆尾部扩散器饰板、引擎盖组件、翼子板及后侧围宽体组件。
              </div>
            </div>
          </div>
          <div class="details-parts d-flex flex-wrap">
            <template v-for="(item, index) in list">
              <div class="parts-item" :key="index">
                <div class="parts-item-img">
                  <img :src="item.img" alt=""/>
                </div>
                <div class="parts-item-msg d-flex flex-column jc-between ai-center">
                  <div class="d-flex flex-column jc-between ai-center">
                    <div class="parts-item-msg-title font-13">{{ item.title }}</div>
                    <div class="parts-item-msg-desc font-content"> {{ item.desc }}</div>
                    <div class="h8"
                    ><span v-show="item.more" class="more  font-content"  @click="$router.push({name:'CarEPlusPage'})">{{ item.more }}</span></div
                    >
                  </div>
                  <div class="parts-item-msg-price font-medium">{{ $formatPrice(item.price, "RMB") }}</div>
                </div>
              </div>
            </template>
          </div>
          <div class="details-swaper">
            <!-- <div class="details-swaper-wenan text-center">
              <div class="details-swaper-wenan-title">你的M POWER，必须与众不同。</div>
              <div class="details-swaper-wenan-other">
                <p>我们非常认同M POWER的造型逻辑，但也非常尊重每一位M POWER车主的个性。</p>
                <p>Achen&Cybe 风格化组件在为你提供个性化的同时，保留并发挥设计的魅力。它与你的M车型</p>
                <p>的融合，就像原生般融洽。</p>
              </div>
            </div> -->
            <div class="details-swaper-box">
              <van-swipe :autoplay="3000" :show-indicators="false" @change="change">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                  <img class="details-swaper-box-img" :src="image"/>
                </van-swipe-item>
              </van-swipe>
            </div>
            <div class="details-swaper-indicators d-flex jc-center ai-center">
              <ul class="list d-flex">
                <li v-for="(item, index) in images.length" :key="index" :class="{ active: index === isIndex }"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="car-trait">
          <template v-for="(item, index) in traitList">
            <div :key="index" class="trait-item">
              <div class="item-img">
                <img :src="item.img" alt=""/>
              </div>
              <div class="item-msg">
                <div class="msg-title font-medium">{{ item.title }}</div>
                <div class="msg-desc font-content">{{ item.desc }}</div>
                <div class="msg-otherimg" v-if="item.other">
                  <img :src="item.other" alt=""/>
                </div>
                <div class="msg-other" v-if="item.other1">{{ item.other1 }}</div>
                <div class="msg-other pb25" v-if="item.other2">{{ item.other2 }}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="car-design">
          <div class="car-design-desc">
            <div class="desc-logo">
              <img src="/mobile/static/img/logo.png" alt=""/>
            </div>
            <div class="desc-h2">DESIGNED BY ACHEN&CYBE STUDIO</div>
            <div class="desc-h1">独有原创设计</div>
            <div class="desc-h5">由A&C Studio提供</div>
          </div>
          <div class="car-design-img">
            <img src="/mobile/static/img/m4/c7.png"/>
          </div>
        </div>
        <div class="detail-list">
          <div class="title font-medium"> 包装清单</div>
          <div class="img">
            <img src="/mobile/static/img/m4/logo.png" alt=""/>
          </div>
          <div class="desc-list d-flex jc-between">
            <template v-for="(item, index) in wordList">
              <div class="desc-list-item d-flex flex-column jc-between ai-center" :key="index">
                <div class="desc-list-item-circle"></div>
                <div class="desc-list-item-title font-8">{{ item.name }}</div>
              </div>
            </template>
          </div>
        </div>
        <div class="buy">
          <div class="buy-desc text-center font-content">
            <div class="mb6">Achen&Cybe雷肯茨博风格化组件</div>
            <div>For Dodge Challenger SRT</div>
          </div>
          <div class="buy-btn" @click="goToBuy">立即购买</div>
          <div class="buy-img">
            <img src="/mobile/static/img/m4/c8.png" alt=""/>
          </div>
        </div>
        <div class="service-list d-flex jc-between">
          <img src="/mobile/static/img/order/fotter-img.png" style="width:100%;" alt="">
          <!--          <template v-for="(item, index) in serviceList">-->
          <!--            <div class="service-list-item d-flex flex-column jc-between ai-center" :key="index">-->
          <!--              <div class="service-list-item-img">-->
          <!--                <img :src="item.img" alt=""/>-->
          <!--              </div>-->
          <!--              <div class="service-list-item-title">{{ item.title }}</div>-->
          <!--            </div>-->
          <!--          </template>-->
        </div>
        <div class="other-tips">
          <div class="other-tips-tit">注释：</div>
          <div>
            <p>1. 帮助与支持均为人工客服，服务时间为8:30-20:30。</p>
            <p>2. A&C Care+随产品赠送，识别方式为配件及包装内序列号。</p>
            <p>3. A&C Care+将只支持中国大陆区域使用。</p>
            <p>4. 请不要撕除产品背部的识别号/序列号，该序列号将用于验证是否为Achen&Cybe正品配件。</p>
            <p
            >5.全部A&C产品将只支持安装在原厂车身零部件上，于任何副厂零部件上安装可能会产生安装失败或者间隙不可控等情况。</p
            >
            <p
            >6.
              服务商列表可能会有更新，以订单确认时的服务商列表为准。前往服务商安装前请先致电确认服务商状态于营业时间，以免出现等位或不能提供安装服务等问题。</p
            >
            <p>7.为保证行车安全，请安全驾驶，文明驾驶，合理改装车辆。 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      list: [],
      isIndex: 0,
      images: [
        "/mobile/static/img/m4/3-5-1.jpg",
        "/mobile/static/img/m4/3-5-2.jpg",
        "/mobile/static/img/m4/3-5-3.jpg",
        "/mobile/static/img/m4/3-5-4.jpg",
        "/mobile/static/img/m4/3-5-5.jpg",
      ],
      traitList: [
        {
          img: "/mobile/static/img/m4/intro_1.jpg",
          title: '行走的态度',
          desc: '设计出自Achen&Cybe Studio之手，与北京行走态度联合研发。Achen&Cybe组件加持后的Challenger富有艺术气息却又力量感十足。车辆通过宽体组件与隆起的机盖，塑造出众多车迷心中的美式肌肉霸主形象。同时结合丰富的细节设计及空气动力学设计，让美与合理性共存。既是性能楷模，又是颜值担当，这才是行走的态度。',
          other: ''
        },
        {
          img: "/mobile/static/img/m4/intro_2.jpg",
          title: '方圆之间，随你心意。',
          desc: 'Achen&Cybe风格化组件兼容Challenger的原厂方口排气尾管。当然，你更可以更换颇具性能感且更加粗大的圆形排气尾管。在标准套装中暂不包含排气尾管配件。',
          other: "/mobile/static/img/m4/intro_img_2.png"
        },
        {
          img: "/mobile/static/img/m4/intro_3.jpg",
          title: '专业的选手，为你量身打造。',
          desc: 'Achen&Cybe Studio采用标准主机厂设计研发流程，从整车原厂表面数据，到超高精度数字表面模型，再到精湛模具工艺及碳纤维工艺，Achen&Cybe组件将极度吻合你的车身，配件公差控制在0.3mm，这远高于主机厂外表面覆盖件工艺标准。',
          other1: 'Achen&Cybe将支持安装于SRT原厂保险杠配件上。',
          other2: '任何保险杠损坏之后的修补和过度喷漆或抛光，将对公差产生影响。'
        },
        {
          img: "/mobile/static/img/m4/intro_4.jpg",
          title: '不止于宽，更见于广。',
          desc: '在Achen&Cybe组件的加持下，美式肌肉车型的强悍展现的更淋漓尽致。单边加宽高达35mm，这有助于适配更宽的轮毂和轮胎，为你的Challenger车型带来更震撼的姿态效果。',
          other: ''
        }
      ],
      wordList: [
        {
          name: '产品'
        },
        {
          name: 'Achen&Cybe礼品'
        },
        {
          name: '产品明细与序列号'
        },
        {
          name: '简要概述'
        }
      ],
      serviceList: [
        {
          img: "/mobile/static/img/m4/footer_nav_1.png",
          title: 'A&C帮助与支持中心'
        },
        {
          img: "/mobile/static/img/m4/footer_nav_2.png",
          title: '免费配送'
        },
        {
          img: "/mobile/static/img/m4/footer_nav_3.png",
          title: 'A&C帮助与支持中心'
        },
        {
          img: "/mobile/static/img/m4/footer_nav_4.png",
          title: 'A&C帮助与支持中心'
        }
      ]
    }
  },
  mounted() {
    this.getCarDetail();
  },
  methods: {
    change(e) {
      this.isIndex = e
    },
    showContent() {
      this.isShow = true
    },

    goToBuy: function () {
      this.$router.push({path: '/three', query: {cartype: 'carlistchallenger'}})
    },
    getCarDetail() {
      this.$api
          .getCarDetail({
            carModelName: "Challgner SRT",
          })
          .then((res) => {
            if (res.code === 0) {
              res.data.listAccessoriesList.sort((a, b) => {
                return a.partsIndex - b.partsIndex;
              });
              this.list = [
                {
                  img: "/mobile/static/img/m4/img_1.jpg",
                  title: '碳纤维前部扰流饰板',
                  desc: '侧面采用镂空的空气导流槽设计，不仅造型新颖，更有空气动力学性能加持。享有A&C Care+ 配件保护计划，如有后期损坏，可享受A&C Care+随心换。',
                  more: '点击了解A&C Care+详情',
                  price: res.data.listAccessoriesList[0].partsPrice,
                },
                {
                  img: "/mobile/static/img/m4/img_2.jpg",
                  title: '碳纤维尾部扩散器饰板',
                  desc: '尾部扩散器饰板不仅支持原厂方口排气，同时也允许你更换更大口径的排气尾管。中间独立的扩散器能为车辆尾部提供扰流作用。',
                  price: res.data.listAccessoriesList[1].partsPrice,
                },
                {
                  img: "/mobile/static/img/m4/img_3.jpg",
                  title: '翼子板及后侧围宽体组件',
                  desc: '宽体组件能够完美地展现Challenger的姿态美。替换式前翼子板以及后侧围宽体覆盖件让整车更加饱满，与原车设计融为一体的。Achen&Cybe宽体组件会让你的车颜值飙升。',
                  price: res.data.listAccessoriesList[2].partsPrice,
                },
                {
                  img: "/mobile/static/img/m4/img_4.jpg",
                  title: '引擎盖组件',
                  desc: '整个引擎盖总成包含引擎盖外板、引擎盖内板与前进风口组件。高大的隆起造型会让看到你的Challenger的人瞬间肾上腺素飙升。',
                  price: res.data.listAccessoriesList[3].partsPrice,
                },
              ];
            }
          })
          .catch((err) => {
            console.log("getCarDetail", err);
          });
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  color: #fff;
  background-image: url('/mobile/static/img/m4/bg.png');
  background-size: 100%;
  background-repeat:repeat-y;
  margin: 0;

  .content {
    width: 100%;
    min-height: calc(100% - 180px);

    .top {
      width: 100%;
      height: 384px;
      position: relative;
      overflow: hidden;

      &-img {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 351px;
        height: 364px;
        background: url('/mobile/static/img/m4/c1.jpg') no-repeat;
        background-size: 100% 100%;
        z-index: 1;

        &-btn {
          margin: 280px auto 26px;
          width: 130px;
          height: 26px;
          background: #3e7afd;
          text-align: center;
          line-height: 26px;
          font-size: 10px;
          border-radius: 2px;
        }

        &-more {
          margin: 0 auto;
          width: 36px;
          height: 16px;
          background: url('/mobile/static/img/m4/btn-1.png') no-repeat;
          background-size: cover;
        }
      }
    }

    .details {
      width: 100%;
      position: relative;

      &-first {
        background: #0c0c0c;
        padding: 40px 0 20px;
        margin:0 auto 20px;
        width:calc(100% - 24px);
      }

      .logo {
        height: 15px;

        &-img {
          width: 98px;
          height: 15px;

          img {
            width: 100%;
            display: block;
          }
        }
      }

      &-tips {
        text-align: center;
        padding: 0 16px;
        background: #0c0c0c;

        .h1 {
          font-size: 12px;
          line-height: 1;
          padding: 8px 0;
          overflow: hidden;
        }

        .h3 {
          font-size: 6px;
          line-height: 1;
          width: 90%;
          margin: 0 auto;

          &:first-child {
            margin-top: 0;
          }
        }
      }

      &-car {
        width: 100%;
        background: #0c0c0c;

        .them3 {
          width: 100%;
          background-size: 100% 100%;
          position: relative;

          .title {
            position: absolute;
            top: 60px;
            left: 40px;
            font-size: 30px;
          }

          img {
            display: block;
            width: 94%;
            margin: 20px auto 20px;
          }
        }

        .them4 {
          width: 100%;
          height: 210px;
          background: url('/mobile/static/img/m4/them4.png') no-repeat;
          background-size: 100% 100%;
        }
      }

      &-config {
        padding: 0 12px;

        &-tips {
          line-height: 1;
          background: #201f1f;
          text-align: center;
          padding: 25px 50px;

          .h3 {
            font-size: 8px;
            line-height: 1.4;
          }

          .h1 {
            font-size: 10px;
            padding: 5px 0 8px;
          }
        }
      }

      &-parts {
        padding: 0 12px;

        .parts-item {
          width: 175px;
          height: 400px;
          font-size: 8px;
          line-height: 1;

          &-img {
            width: 175px;
            height: 175px;

            img {
              width: 100%;
              display: block;
            }
          }

          &-msg {
            width: 100%;
            height: 226px;
            padding: 24px 12px 20px;
            background: #201f1f;
            flex: 1;

            &-title {
              font-size: 11px;
            }

            .h8 {
              font-size: 7px;
              height: 8px;

              .more {
                margin-top: 3px;
              }
            }

            &-desc {
              margin-top: 6px;
              font-size: 9px;
              line-height: 1.4;
              text-align: center;
              font-weight: 100;
              word-break: break-all;
            }

            &-price {
              font-size: 7px;
              margin-bottom:10px;
            }
          }
        }
      }

      &-swaper {
        width: 100%;

        &-wenan {
          padding: 22px 0 0;
          width: 100%;
          height: 70px;
          line-height: 1;

          &-title {
            font-size: 12px;
          }

          &-other {
            margin-top: 6px;
            font-size: 7px;
            line-height: 1.4;
            font-weight: 100;
          }
        }

        &-box {
          margin-top: 24px;
          width: 100%;

          &-img {
            width: 375px;
            display: block;
          }
        }

        &-indicators {
          width: 100%;
          height: 18px;

          ul.list {
            margin-left: -5px;

            li {
              margin-left: 5px;
              width: 4px;
              height: 4px;
              background: #fff;
              border-radius: 50%;

              &.active {
                background: #3e7afd;
              }
            }
          }
        }
      }
    }

    .car-trait {
      width: 100%;
      padding: 8px 42px;

      .trait-item {
        width: 100%;

        .item-img {
          width: 100%;
          height: 162px;

          img {
            width: 100%;
            display: block;
          }
        }

        .item-msg {
          width: 100%;
          margin: 26px 0;
          line-height: 1;

          .msg-title {
            font-size: 14px;
          }

          .msg-desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.78);
            line-height: 1.4;
            margin: 14px 0 22px;
            font-weight: 100;
          }

          .msg-otherimg {
            height: 42px;

            img {
              display: block;
              height: 100%;
            }
          }

          .msg-other {
            font-size: 6px;
            margin-bottom: 5px;
            font-weight: 100;
          }
        }
      }
    }

    .car-design {
      width: 100%;

      &-desc {
        height: 60px;
        text-align: center;
        line-height: 1;

        .desc {
          &-logo {
            margin: 0px auto 10px;
            width: 75px;
            height: 8px;

            img {
              width: 100%;
              display: block;
            }
          }

          &-h2 {
            font-size: 10px;
          }

          &-h1 {
            font-size: 14px;
            line-height: 1.4;
          }

          &-h5 {
            font-size: 8px;
          }
        }
      }

      &-img {
        width: 100%;

        img {
          display: block;
          width: 100%;
        }
      }
    }

    .detail-list {
      width: 100%;
      background-color: #171616;

      .title {
        color: #fff;
        width: 100%;
        height: 54px;
        font-size: 7px;
        text-align: center;
        border-bottom: 1px solid #656565;
        line-height: 1;
        padding-top: 25px;
      }

      .img {

        img {
          margin: 15px auto 19px;
          width: 145px;
          height: 46px;
          display: block;
        }
      }

      .desc-list {
        width: 100%;
        padding: 0 76px;

        &-item {

          &-circle {
            width: 4px;
            height: 4px;
            margin-bottom: 4px;
            border-radius: 50%;
            background: #656565;
          }

          &-title {
            font-size: 5px;
            color: #fff;
            line-height: 1;
          }
        }
      }
    }

    .buy {
      background-color: #171616;

      &-desc {
        font-size: 7px;
        line-height: 1;
        padding: 19px 0 11px;

        .mb6 {
          margin-bottom: 6px;
        }
      }

      &-btn {
        margin: 6px auto;
        width: 88px;
        height: 26px;
        background: #3e7afd;
        text-align: center;
        line-height: 28px;
        font-size: 10px;
        border-radius: 2px;
      }

      &-img {
        img {
          width: 80%;
          display: block;
          margin: 0 auto;
          padding: 4px 0 30px;
        }
      }
    }

    .service-list {
      width: 100vw;
      height: 66px;
      background: #262626;
      overflow: hidden;

      &-item {
        height: 100%;

        &-img {
          height: 30px;

          img {
            height: 100%;
            display: block;
          }
        }

        &-title {
          font-size: 5px;
          line-height: 1;
          color: #7bbcfc;
        }
      }
    }

    .other-tips {
      line-height: 1;
      width: 100%;
      background: #121212;
      padding: 13px 20px;
      font-size: 8px;
      font-weight: 100;
      color: #8b8b8b;

      &-tit {
        margin-bottom: 8px;
      }

      p {
        line-height: 1.6;
      }
    }
  }
}
</style>
