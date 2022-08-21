<template>
  <div class="home-page">
    <div>
      <img src="/mobile/static/img/logo.png" class="logo" />
      <div class="title">Care+计划</div>
      <div class="content-box">
        <div class="content-item" v-for="item in list" :key="item.title">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
          <ul>
            <li v-for="item in item.list" :key="item">{{ item }}</li>
          </ul>
          <div class="info">{{ item.info }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        list: [
          {
            title: '什么是Achen&Cybe Care+',
            content:
              '在您订购Achen&Cybe产品后，您将获得为期两年的Achen&Cybe Care+服务。该服务使Achen&Cybe与您共担零部件受损的风险。如果您订购的组件在Care+时效内发生损坏或碰撞，您将可以以全新配件50%的价格换购同款组件。'
          },
          {
            title: '获得Achen&Cybe Care+',
            content:
              'Care+服务跟随您的产品发放，无需您单独支付费用，也无需单独注册。您可以凭借产品序列号享受Care+服务。Care+时效自产品出库的时间开始计算。'
          },
          {
            title: '服务内容',
            content:
              'Achen&Cybe Care+为您提供车辆及组件受损后的以旧换新服务，您需要联系Achen&Cybe售后专员以确认Care+产品受损状态是否符合换新标准，并且您需要支付零部件官方价格50%的费用，其余50%的费用将由Achen&Cybe承担。',
            info: '案例举例：您的前部扰流饰板在进入低洼路面工况时与地面发生剐蹭，并且剐蹭位于可见面上。此时您需要联系Achen&Cybe售后专员，拍摄配件受损零部件的照片以确认是否符合更换标准。确认可享受care+服务后您需要自行将受损零部件寄送至Achen&Cybe售后中心，寄回旧件需要您支付物流费用至物流承运商。Achen&Cybe售后中心收到您寄回的零部件后会检查是否与图片相符并检查背部零件识别码。一切都符合要求后Achen&Cybe售后中心会为您发送全新零部件的订购链接，待您完成支付后Achen&Cybe售后中心将为您发出一件崭新的产品，新产品的物流费用由Achen&Cybe售后中心承担。'
          },
          {
            title: '要求及描述',
            list: [
              '您购买的Achen&Cybe组件受损面位于可见面上，并且受损长度大于或等于100mm。',
              '您购买的Achen&Cybe组件背部零部件识别码必须清晰可见，以供验证零部件为Achen&Cybe正品。如果您的零部件受损过于严重，背部零部件识别码已不可被识别，或背部缺少零部件识别码，Achen&Cybe将不能为您提供Care+服务。',
              '您必须将受损的带有零部件识别码的Achen&Cybe组件寄回至售后中心并经过确认后才可以以相应价格订购新的组件。',
              '您只能订购受损零部件的同款组件。'
            ]
          },
          {
            title: '订购新的组件',
            content:
              '如果遇到库存不足或物流受限，您将与新订购Achen&Cybe组件的顾客共同排队等待货物发出，发货会根据订单顺序依次进行。'
          }
        ]
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .home-page {
    color: #fff;
    line-height: 1.2;
    text-align: center;

    .logo {
      margin-top: 40px;
      width: 50%;
    }

    .title {
      margin-top: 10px;
      font-size: 30px;
      font-weight: bolder;
    }

    .content-box {
      width: 100%;
      box-sizing: border-box;
      padding: 0 6% 40px;
      margin: 0 auto;

      .content-item {
        font-size: 16px;
        margin-top: 24px;
        font-weight: 300;

        h2 {
          font-size: 18px !important;
          margin-bottom: 10px;
          text-align: left;
          font-weight: 300;
        }

        p {
          font-size: 12px;
          text-align: justify;
          word-break: break-all;

        }

        .info {
          font-size: 10px;
          margin-top: 6px;
          text-align: justify;
          font-weight: 100;
        }

        ul {
          padding-left: 20px;
          list-style: disc;

          li {
            font-size: 12px;
            text-align: justify;
          }
        }
      }
    }
  }
</style>
