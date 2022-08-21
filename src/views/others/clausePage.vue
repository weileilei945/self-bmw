<template>
  <div class="home-page">
    <div>
      <img src="/mobile/static/img/logo.png" alt=""/>
      <div class="clause-box">
        <div v-for="(item,idx) in textList" :key="item.title" class="clause-item"  :class="{'border-bottom':(idx == (textList.length - 1))}">
          <div class="title">{{ item.title }}</div>
          <p class="content" v-for="p in item.content" :key="p">
            {{ p }}
          </p>
        </div>
      </div>
      <div class="clause-box">
        <div v-for="item in salesList" :key="item.title" class="clause-item" style="">
          <div class="title">{{ item.title }}</div>
          <div class="content" v-for="p in item.list" :key="p">
            {{ p }}
          </div>
          <div class="margin20" v-if="item.list1"></div>
          <div class="content" v-for="p in item.list1" :key="p">
            {{ p }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textList: [
        {
          title: "接受条款",
          content: [
            "登录访问本网站，即表明您承诺已阅读、理解并接受如下使用条款。若您不理解或不接受其中的任何内容，您可以关闭本网页。北京高思律动汽车科技有限公司（以下简称GAUSS MOTION）保留在任何时间不经通知更新并修改本使用条款的权利，就任何违反本使用条款的行为，GAUSS MOTION有权采取法律措施并要求合理赔偿。",
          ],
        },
        {
          title: "著作权",
          content: [
            "除另有说明外，本网站所有内容的著作权均归属GAUSS MOTION。任何人未经GAUSS MOTION或享有著作权的第三方书面许可，不得以任何方式将本网站的任何内容复制、散布、影印、展示、被链接到其他网站、通过超链接传送、以镜像法上载至其他服务器、保留在信息检索系统，或因任何商业目的下载或复制。若因非商业目的下载或复制本网页内容，则在使用过程中不得修改任何内容，且应保留其原件所含的版权声明或其他权属声明的内容及形式。",
          ],
        },
        {
          title: "商标权",
          content: [
            "除另有说明外，本网站展示、提及或以其他方式使用的所有商标、标识均归属GAUSS MOTION。未经GAUSS MOTION或享有商标权的第三方书面许可，不得以任何方式使用上述商标、标识。",
          ],
        },
        {
          title: "声明",
          content: [
            "本网站及其内容仅为您提供方便使用。GAUSS MOTION力争提供准确信息，但不对信息的准确性承担责任。GAUSS MOTION有权未经通知修改网站内容或产品信息。",
            "本网站所有内容均以现有状态为准，且GAUSS MOTION不对网站内容作出任何保证、承诺或陈述。GAUSS MOTION在此特别声明，在法律允许的最大范围内，不对网站的任何内容作出保证或承诺，无论明示或暗示方式，包括对于产品的性能、适用性、合法性的说明。",
          ],
        },
        {
          title: "责任限制",
          content: [
            "就本网站、使用网站或因信赖网站内容而产生任何损失，包括直接、间接、特殊、附带、惩罚的损失，GAUSS MOTION及其关联方、分公司、董事、代理人、员工或其他代表人均不承担责任。",
          ],
        },
        {
          title: "产品供应",
          content: [
            "本网站展示的产品、服务等及相关说明，在各国及地区可能存在差异。如您需要特定产品或服务信息，可与当地代理商联系。",
          ],
        },
        {
          title: "第三方链接",
          content: [
            "为方便您的使用，本网站可能包含链接至第三方网站，GAUSS MOTION对第三方网站的任何内容均不承担责任。在使用第三方网站时，您可能需要查阅和接受其使用条款。此外，第三方链接并不意味GAUSS MOTION对该网站任何产品或服务的认可。",
          ],
        },
        {
          title: "访问受密码保护/安全区域",
          content: [
            "只有授权用户才能访问和使用本网站密码保护的安全区域。未经授权的用户试图访问这些区域可能会被GAUSS MOTION追究法律责任。",
          ],
        },
        {
          title: "适用法律及纠纷管辖",
          content: [
            "除法律冲突下的强行规定外，本使用条款的内容、履行及解释适用中国法律。因本使用条款或本网站引起的任何冲突或争议，经友好协商无法解决，应提交中国国际经济和贸易仲裁委员会（ CIETAC ）按照其当时的仲裁规则以仲裁方式解决。仲裁地点为中国北京，仲裁使用中文，包括提交的文件及仲裁过程使用的语言。仲裁裁决为终极裁决，对各方均有约束力。",
          ],
        },
      ],
      salesList: [
        {
          title: "退货政策",
          list: [
            "符合以下条件可以申请退货：",
            "√ 订单处于排期当中，尚未进行发货；",
            "√ 客户收到货物 7 个自然日内，产品无制造缺陷，产品外包装、附件、赠品、说明书完整，没有任何人为损坏，产品并未装车，没有产生任何磨损及使用痕迹，并且您需要承担退货产生的物流费用；",
            "√ 客户收到货物 7 个自然日内，发现产品存在非人为损坏的性能故障或表面瑕疵；"
          ],
          list1: [
            "以下情况我们有权拒绝客户的退货要求：",
            "×非Achen&Cybe官方网站订购的订单；",
            "×自收货日起超过 7 个自然日后提出退货要求的；",
            "×退货品不全，外包装、附件、赠品、说明书、产品背面标识不完整、或外观人为原因导致受损；",
            "×退货时无法提供合法的购买凭证或单据，或对单据进行伪造、涂改；",
            "×发生非产品本身质量问题导致的碰撞、烧毁，磨损、不正确安装、未按说明书指引使用和操作所造成的商品质量问题；",
            "×因不可避免因素，如火灾、水灾、雷击、交通事故等不可抗拒力造成损坏的产品；",
            "×联系Achen&Cybe支持并确认退货服务后，没有在 7 个自然日内寄出相应物件；",
            "×政策所述其他情况；"
          ]
        },
        {
          title: "退货指引",
          list: [
            "如需申请退货，请在收到货物的 7 个自然日内按以下方式操作。",
            "1）登录 Achen&Cybe官方网站；",
            "2）进入下方“帮助与支持中心”的“Support支持中心”；",
            "3）添加Achen&Cybe Support客户服务专员并描述您的退货需求。",
            "我们将在 1 至 2 个工作日审核您的退货退款申请。",
            "若您在退货过程中遇到任何问题，可联系 “Achen&Cybe Support”协助处理。",
            "*退款处理时效在活动期间可能会有延迟，敬请谅解。"
          ]
        },
        {
          title: "退款时间",
          list: [
            "1） 如订单未发货，我们将在 1 个工作日内审核您的退款申请。当退货申请审核通过，Achen&Cybe会原路将款项退回。",
            "2） 如订单已发货，我们将在 1 至 2 个工作日审核您的退款申请。若退货申请审核通过，且退回的商品经检测符合退货标准，Achen&Cybe会原路将款项退回。 ",
            "其余支付方式退款到账时间如下：",
            "- 支付宝：4 至 7 个工作日，实际请以银行到账为准;",
            "- 微信：4 至 7 个工作日，实际请以银行到账为准;"
          ]
        },
        {
          title: "退货运费",
          list: [
            "除产品性能故障的损坏以外的其他原因导致的退货，客户需承担退货运费；"
          ]
        },
        {
          title: "换货政策",
          list: [
            "如符合以下条件之一，可以要求换货：",
            "√ 客户收到货物 15 个自然日内，发现产品在一个或多个重要的方面存在与原产品描述严重不符的情形；",
            "√ 客户收到货物 15 个自然日内，发现产品存在非人为损坏的性能故障或表面瑕疵；"
          ],
          list1: [
            "以下情况我们有权拒绝客户的换货要求：",
            "×自收货日起超过 15 个自然日后提出换货要求的；",
            "×换货时无法提供合法的购买凭证或单据，或对单据进行伪造、涂改；",
            "×换货品不全、或外观人为原因导致受损；",
            "× 经 Achen&Cybe支持部门检测，本身不存在质量问题；",
            "×发生非产品本身质量问题导致的碰撞、烧毁，磨损、不正确安装、未按说明书指引使用和操作所造成的商品质量问题；",
            "×因不可避免因素，如火灾、水灾、雷击、交通事故等不可抗拒力造成损坏的产品；",
            "× 联系Achen&Cybe换货服务后，没有在 7 个自然日内寄出相应物件；",
            "× 因运输导致货损提出换货但未能提供运输公司出具的货损凭证的；",
            "×政策所述其他情况；"
          ]
        },
        {
          title: "换货指引",
          list: [
            "如果您收到的商品需要办理换货，请您在到货物15个自然日内联系Achen&Cybe Support客户服务专员处理换货；",
            "联系方式： 至SUPPORT支持中心添加Specialis专家的企业微信号;"
          ]
        },
        {
          title: "换货运费",
          list: [
            "产品性能故障或表面瑕疵导致的换货，Achen&Cybe承担换货双程运费。"
          ]
        }
      ]
    };
  },
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.home-page {
  text-align: center;
  line-height: 1.2;
  text-align: center;

  img {
    margin-top: 40px;
    width: 40%;
  }

  .clause-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 6%;
    margin: 0 auto;
    color: #fff;

    .clause-item {
      padding: 20px 0;

      .title {
        text-align: left;
        font-size: 18px;
        margin-bottom: 10px;
      }

      .content {
        text-align: justify;
        margin-bottom: 10px;
        line-height: 1.6;
        font-size: 12px;
        font-weight: 100;
      }

      .margin20 {
        margin-top: 30px;
      }
    }

    .clause-item + .clause-item {
      border-top: 1px solid #fff;
    }
  }
}

.clause-box + .clause-box {
  margin-top: 10px;
  margin-bottom: 80px;
}

.border-bottom {
  border-bottom: 1px solid #fff;
}
</style>
