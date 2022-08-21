<template>
    <div class="home-page" style="background-color: #090909">
      <div>
        <div
          style="
            width: 100%;
            background-color: #201e1f;
            padding-top: 10px;
            padding-bottom: 10px;
          "
        >
          <img src="/mobile/static/img/values/top_banner.jpg" class="top-img" />
        </div>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 12% 0;
            flex-direction: column;
            align-items: center;
          "
        >
          <img src="/mobile/static/img/values/logo_studio1.png" width="40%" />
          <div class="p-text font-content">
            Achen&Cybe
            Studio的设计团队来自于国内外主机厂与设计公司，有着极为丰富的量产车设计经验。具备从概念设计——CAS数字模型——工程结构设计——验证模型——A面数字模型的整套造型设计开发能力。
          </div>
        </div>
        <div style="width: 100%; display: flex; justify-content: center; padding: 10px 0px 20px; margin: -10px 0;text-align:center">
          <img src="/mobile/static/img/values/picture1_price.png" width="120%" height="100%" style="margin-left:-20px" />
        </div>

        <div
          style="width: 100%; padding: 20px 0px 0"
          class="values-banner"
          v-for="item in banner"
          :key="item.title"
        >
          <img :src="item.img" width="100%" height="100%" style="display:block" />
          <div>
            <div class="title">{{ item.title }}</div>
            <div class="sub-title">{{ item.subTitle }}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

  export default {
    data() {
      return {
        banner: [
          {
            title: '设计，不容小觑。',
            subTitle:
              'Achen&Cybe品牌坚持原创的高品质设计，致力于打造媲美甚至超越原厂的高性能风格化组件。Achen&Cybe Studio的设计团队不仅能精准解读各个品牌的设计语言并为其量身打造外观组件，更能为组件注入颇具艺术性与设计感的基因，以更高的设计品质呈现更激进的组件效果。有了Achen&Cybe风格化组件的加持，你的车辆将会更具动感与性能感。',
            img: '/mobile/static/img/values/banner_1.jpg'
          },
          {
            title: '数字表面，精准的造型控制。',
            subTitle:
              '有了专业的数字团队的加持，产品的设计能进一步完善与增强。Achen&Cybe Studio的数字团队通过逆向原车外表面及内部结构，利用Nurbs建模软件制作CAS数据，在数据得到验证后会深入设计A级曲面，使光影呈现极致流畅。创建可用于生产的 A 级表面可能非常耗时并且需要专业技能，但会换来极致的产品效果。',
            img: '/mobile/static/img/values/banner_2.jpg'
          },
          {
            title: '工艺，永无止境',
            subTitle:
              'Achen&Cybe拥有先进的碳纤维技术，生产流程和工艺水准可以媲美主机厂的原厂标准。Achen&Cybe Studio的工艺团队积累了非常丰富的量产车碳纤维零部件生产经验，曾多年来服务于超跑制造商。从需求分析、材料选择、结构及工艺开发，到样品试制、品质验证、批量生产验证、量产交付，每一个环节都严格把控流程与品质。',
            img: '/mobile/static/img/values/banner_3.jpg'
          }
        ]
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .home-page {
    text-align: center;
    .top-img {
      box-shadow: -6px 20px 20px 4px #000;
      width: 96%;
      display: block;
      margin:0 auto;
    }
    .p-text {
      color: #fff;
      width: 80%;
      line-height: 1.4;
      margin-top: 20px;
    }

    .values-banner {
      color: #fff;

      img {
        width: 100%;
      }

      & > div {
        bottom: 6px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;

        .title {
          font-size: 15px;
          text-align: left;
          line-height: 3;
        }

        .sub-title {
          margin-top:-4.8px;
          font-size: 12px;
          line-height: 1.4;
          text-align: justify;
          font-weight: 100;
        }
      }
    }

    .values-banner:last-child {
      margin-bottom: 20px !important;
    }
  }
</style>
