<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="top-img">
          <img src="/mobile/static/img/m4/the3.jpg" alt=""/>
        </div>
        <div class="top-tips">
          <div class="top-tips-common font-content mg-6">适配BMW The 3 （G20/G28）</div>
          <div class="top-tips-common font-content">雷肯茨博高性能碳纤维外观组件</div>
          <div class="top-tips-h1"> 霸气，不可挡。</div>
        </div>
        <div class="top-btn" @click="goToBuy">立即购买</div>
        <div class="top-more">
          <div>向下以了解更多</div>
          <div class="top-more-arrow">
            <img src="/mobile/static/img/others/arrow-down.png"/>
          </div>
        </div>
      </div>
      <div>
        <div class="details">
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
            </div
            >
            <div class="h3 font-content"> 设计出自A&CStudio之手，与BMW的设计语言巧妙结合，浑然一体。</div>
            <div class="h3 font-content">现已全面发售。</div>
          </div>
          <div class="details-car">
            <div class="them3">
              <img src="/mobile/static/img/m4/the4.png" width="100%"/>
              <!-- <div class="title">THEM3</div> -->
            </div>
            <!-- <div class="them4"></div> -->
          </div>
          <div class="details-config">
            <div class="details-config-tips">
              <div class="h3 mt25 font-8 parts-tips" style="font-weight: 300">亮点与配置</div>
              <div class="h1 font-medium">标准套装包含</div>
              <div class="h3 font-11 fw-100"> 通过轻量化性能和极致的设计，展示您的BMW THE3的全部潜力。</div>
              <div class="h3 font-11 fw-100">A&C Edition标准套装包含车辆前部扰流饰板、车辆尾部扩散器饰板、创新Spoiler Guys组件以及尾部扰流器。</div>
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
                    <div class="h8">
                      <div v-show="item.more" class="more  font-content"  @click="$router.push({name:'CarEPlusPage'})">{{ item.more }}</div>
                    </div>
                  </div>
                  <div class="parts-item-msg-price font-medium">{{ $formatPrice(item.price, "RMB") }}</div>
                </div>
              </div>
            </template>
            <div class="parts-tips font-mini">
              <div>
                1:A&C Care+计划无需单独付费，每一件Achen&Cybe的产品均可以凭借配件编号享受A&C
                Care+服务，具体详情请浏览相关说明。
              </div>

              <div> 2:Spoiler Guys组件为选购项，其可以无损拆装替换。所有的Spoiler Guys配件均不包含喷涂。</div>
            </div>
          </div>
          <div class="details-swaper">
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
                <div class="msg-other">{{ item.other1 }}</div>
                <div class="msg-other">{{ item.other2 }}</div>
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
          <img src="/mobile/static/img/m4/1-6.png" alt="" width="94%" style="margin-left: 3%"/>
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
            <div>For BMW The 3</div>
          </div>
          <div class="buy-btn" @click="goToBuy"> 立即购买</div>
          <div class="buy-img"></div>
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
      isShow: false,
      list: [
        {
          img: "/mobile/static/img/m4/1-3-1.jpg",
          title: '碳纤维前部扰流饰板',
          desc: '采用三段式设计，完美贴合你的车身曲面。享有A&C Care+¹ 配件保护计划，如有后期损坏，可享受A&C Care+随心换。',
          more: '点击了解A&C Care+详情',
          price: '待公告'
        },
        {
          img: "/mobile/static/img/m4/1-3-2.jpg",
          title: '碳纤维尾部扰流板',
          desc: '中间镂空的尾部扰流板设计，不仅仅能提供超过230N的下压力，更减重至390g，它几乎不会对你的尾门开启产生负担。',
          price: '待公告'
        },
        {
          img: "/mobile/static/img/m4/1-3-3.jpg",
          title: '碳纤维尾部扩散器饰板',
          desc: '优雅但不失个性的独特设计，可以允许你为两个独立后扰流配件Spoiler Guys  喷涂车身色或其他个性化颜色。当然，你也可以后期单独造型更加凶悍的Spoiler Guys。',
          price: '待公告'
        },
        {
          img: "/mobile/static/img/m4/1-3-4.jpg",
          title: '拓展Spoiler Guys 组件',
          desc: '有了拓展Spoiler Guys组件，你的BMW 3可以以更夸张的姿态展现它的个性。两个刀锋的设计为尾部扰流提供更好的帮助。',
          price: '待公告'
        }
      ],
      isIndex: 0,
      images: [
        "/mobile/static/img/m4/1-4-1.jpg",
        "/mobile/static/img/m4/1-4-2.jpg",
        "/mobile/static/img/m4/1-4-3.jpg",
        "/mobile/static/img/m4/1-4-4.jpg",
        "/mobile/static/img/m4/1-4-5.jpg",
      ],
      traitList: [
        {
          img: "/mobile/static/img/m4/1-5-1.jpg",
          title: '相得益彰，才能大显身手。',
          desc: '拥有丰富设计经验的A&C Studio更知道什么样的设计才更符合BMW汽车的气质。A&C Edition的设计主题与线性、曲率梳理非常符合BMW车辆的设计逻辑，与车辆的造型特征巧妙融合，相得益彰。',
          other: ''
        },
        {
          img: "/mobile/static/img/m4/1-5-2.jpg",
          title: '方圆之间，随你心意。',
          desc: 'A&C Edition兼容BMW THE3 的原厂方口排气尾管。当然，你更可以更换颇具性能感的圆形排气尾管。在标准套装中暂不包含排气尾管配件。',
          other: "/mobile/static/img/m4/intro_img_2.png"
        },
        {
          img: "/mobile/static/img/m4/1-5-3.jpg",
          title: '专业的选手，为你量身打造。',
          desc: 'A&C Studio采用标准主机厂设计研发流程，从整车原厂表面数据，到超高精度数字表面模型，再到精湛模具工艺及碳纤维工艺，A&C Edition套件将极度吻合你的车身，配件误差控制在0.5mm以内，这足以媲美主机厂外表面覆盖件工艺标准。',
          other1: 'A&C Edition将支持安装于BMW原厂保险杠配件上。',
          other2: '任何保险杠损坏之后的修补和过度喷漆或抛光，将对公差产生影响。'
        },
        {
          img: "/mobile/static/img/m4/1-5-4.jpg",
          title: '不仅于好看，更是性能典范。',
          desc: 'Achen&Cybe风格化组件专注于空气动力学和轻量化。其中，采用热压碳纤维工艺的尾部扰流器仅380g重量，通过中间镂空的空气动力学设计，其可提供巨大的下压力。尾部扩散器饰板可以在高速行车时优化尾部气流走向，以增强车辆稳定性。',
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
          img: "/mobile/static/img/m4/footer_nav_1.png",
          title: '免费配送'
        },
        {
          img: "/mobile/static/img/m4/footer_nav_1.png",
          title: 'A&C帮助与支持中心'
        },
        {
          img: "/mobile/static/img/m4/footer_nav_1.png",
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
    goToBuy: function () {
      this.$router.push({path: '/three', query: {cartype: 'carlistBMW3'}})
    },
    getCarDetail() {
      this.$api
          .getCarDetail({
            carModelName: "THE 3",
          })
          .then((res) => {
            if (res.code === 0) {
              res.data.listAccessoriesList.sort((a, b) => {
                return a.partsIndex - b.partsIndex;
              });
              this.list = [
                {
                  img: "/mobile/static/img/m4/1-3-1.jpg",
                  title: '碳纤维前部扰流饰板',
                  desc: '采用三段式设计，完美贴合你的车身曲面。享有A&C Care+¹ 配件保护计划，如有后期损坏，可享受A&C Care+随心换。',
                  more: '点击了解A&C Care+详情',
                  price: res.data.listAccessoriesList[0].partsPrice,
                },
                {
                  img: "/mobile/static/img/m4/1-3-2.jpg",
                  title: '碳纤维尾部扰流板',
                  desc: '中间镂空的尾部扰流板设计，经过精准优化以及CFD测试，在高速状态下可提供巨大的下压力，更减重至380g，它几乎不会对你的尾门开启产生负担。',
                  price: res.data.listAccessoriesList[1].partsPrice,
                },
                {
                  img: "/mobile/static/img/m4/1-3-3.jpg",
                  title: '碳纤维尾部扩散器饰板',
                  desc: '优雅但不失个性的独特设计，可以允许你为两个独立后扰流配件Spoiler Guys  喷涂车身色或其他个性化颜色。当然，你也可以后期单独造型更加凶悍的Spoiler Guys。',
                  price: res.data.listAccessoriesList[2].partsPrice,
                },
                {
                  img: "/mobile/static/img/m4/1-3-4.jpg",
                  title: '拓展Spoiler Guys² 组件',
                  desc: '有了拓展Spoiler Guys组件，你的BMW 3可以以更夸张的姿态展现它的个性。两个刀锋的设计为尾部扰流提供更好的帮助。',
                  price: res.data.listAccessoriesList[4].partsPrice,
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
  background: #121212;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  color: #fff;

  .content {
    width: 100%;
    background: #121212;
    min-height: calc(100% - 180px);

    .top {
      width: 100%;

      &-img {
        width: 100%;
        height: 215px;

        img {
          width: 100%;
        }
      }

      &-tips {
        text-align: center;
        line-height: 1;
        text-align: center;

        &-common {
          font-size: 10px;
          padding-bottom:8px;
        }
        .mg-6{
          padding-bottom:6px;
        }

        &-h1 {
          font-size: 20px;
          line-height: 1;
        }
      }

      &-btn {
        margin: 18px auto;
        width: 88px;
        height: 26px;
        background: #3e7afd;
        text-align: center;
        line-height: 28px;
        font-size: 10px;
        border-radius: 2px;
      }

      &-more {
        font-size: 8px;
        text-align: center;
        line-height: 1.2;

        &-arrow {
          width: 14px;
          height: 8px;
          margin: 4px auto 25px;

          img {
            width: 100%;
          }
        }
      }
    }

    .details {
      width: 100%;

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

        .h1 {
          font-size: 12px;
          line-height: 1;
          padding: 8px 0;
          overflow: hidden;
        }

        .h3 {
          font-size: 6px;
          line-height: 1.6;
          width:86%;
          margin:0 auto;

          &:first-child {
            margin-top: 0;
          }
        }
      }

      &-car {
        width: 100%;

        .them3 {
          width: 100%;
          background-size: 100% 100%;
          position: relative;
          img{
            display: block;
            margin:18px 0;
          }
        }
      }

      &-config {
        &-tips {
          line-height: 1;
          background: #201f1f;
          text-align: center;
          padding: 25px;

          .h3 {
            font-size: 8px;
            line-height: 1.4;
          }

          .h1 {
            font-size: 12px;
            padding: 5px 0 8px;
          }
        }
      }

      &-parts {
        background: #201f1f;
        padding: 0 2px;

        .parts-item {
          width: 185px;
          height: 400px;
          font-size: 8px;
          line-height: 1;

          &-img {
            width: 185px;
            height: 185px;

            img {
              width: 100%;
              display: block;
            }
          }

          &-msg {
            width: 100%;
            height: 200px;
            padding: 24px 8px 20px;
            background: #201f1f;
            flex:1;

            &-title {
              font-size: 11px;
            }

            .h8 {
              font-size: 7px;
              height: 8px;

              .more{
                margin-top:3px;
              }
            }
            &-desc {
              margin-top:6px;
              font-size: 9px;
              line-height: 1.4;
              text-align: center;
              font-weight: 100;
              word-break: break-all;
            }

            &-price {
              font-size: 7px;
            }
          }
        }

        .parts-tips {
          font-size: 6px;
          line-height: 1.2;
          width: 100%;
          text-align: center;
          background: #201f1f;
          padding-bottom: 10px;
          color: #636363;

          div {
            width: 80%;
            margin: 0 auto;
          }
        }
      }

      &-swaper {
        width: 100%;

        &-wenan {
          padding: 22px 0 0;
          width: 100%;
          height: 95px;
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
          width: 100%;
          // height: 190px;
          &-img {
            width: 375px;
            // height: 190px;
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
      padding: 8px 24px;

      .trait-item {
        width: 100%;

        .item-img {
          width: 100%;
          height: 184px;
          overflow: hidden;

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
            font-size: 8px;
            color: rgba(255, 255, 255, 0.78);
            line-height: 1.4;
            margin: 7px 0 22px;
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
        height: 89px;
        text-align: center;
        line-height: 1;

        .desc {
          &-logo {
            margin: 20px auto 10px;
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
            font-size: 4px;
          }
        }
      }
    }

    .detail-list {
      width: 100%;

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
            border-radius: 100%;
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
      height: 200px;
      background: url('/mobile/static/img/m4/1-8.png') no-repeat bottom;
      background-size: cover;

      &-desc {
        margin-top: 8px;
        font-size: 7px;
        line-height: 1;
        padding: 11px 0;

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
    }

    .service-list {
      width: 100vw;
      height: 66px;
      background: #262626;

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
      padding: 13px 34px;
      font-size: 8px;
      font-weight: 100;
      color: #8b8b8b;
      margin-bottom: 20px;

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
