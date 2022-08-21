<template>
  <div class="footer">
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" @click="item.show = !item.show">
        <div class="item d-flex jc-between ai-center">
          <div>{{ item.name }}</div>
          <div class="icon" :style="{backgroundImage: !item.show ? 'url(\'/mobile/static/img/others/add.png\')' : 'url(\'/mobile/static/img/others/sub.png\')'}"></div>
        </div>
        <ul class="list-childer" v-show="item.show">
          <li v-for="childer in item.childer" :key="childer.name" @click.stop="toGo(childer)">
            {{ childer.name }}
          </li>
        </ul>
      </li>
    </ul>
    <!-- <div class="copyright"></div> -->
    <div class="footer-tips">
      <div class="">
        <span @click="$router.push({ name: 'clause' })">隐私政策及使用条款</span>
        <span>中国大陆/简体中文</span>
      </div>
      <div>2022-2027 © Achen&Cybe 版权所有.</div>
      <div>
        <a href="http://beian.miit.gov.cn/" >京ICP备2022009322号</a>
      </div>
      <div>
        本站直接或间接为消费者提供商品或服务的商业宣传均属于“广告”（包装及参数、售后保障等商品信息除外）
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        list: [
          {
            name: '选购与渠道',
            show: false,
            childer: [
              {
                name: 'A&C官方商城',
                router: '/'
              },
              {
                name: '淘宝官方商城',
                type: 'taobao'
              },
              {
                name: 'eBay官方商城',
                type: 'ebay'
              }
            ]
          },
          {
            name: '俱乐部与社区',
            show: false,
            childer: [
              {
                name: '微信公众号',
                type: 'gzh'
              },
              {
                name: '小红书',
                type: 'xhs'
              },
              {
                name: '	CARBEN',
                type: 'carben'
              }
            ]
          },
          {
            name: '帮助与支持中心',
            show: false,
            childer: [
              {
                name: 'SUPPORT 支持中心',
                type: 'AC'
              }
            ]
          },
          {
            name: '市场与合作',
            show: false,
            childer: [
              {
                name: '投资者关系',
                router: '/InvestorsPage'
              },
              {
                name: '经销商加盟',
                router: '/InvestorsFormPage'
              },
              {
                name: '海外渠道探索',
                router: '/InvestorsFormPage'
              }
            ]
          }
        ]
      }
    },
    methods: {
      toGo(item) {
        if (item.type) {
          this.$router.push({ path: '/footerDetail', query: { type: item.type } })
        } else {
          this.$router.push({ path: item.router })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list {
    width: 100%;
    background: #000;
    padding: 0 15px;
    li {
      color: #fff;
      width: 100%;
      font-size: 12px;
      font-weight: bold;
      padding: 0 14px;
      .item {
        height: 34px;
        font-weight: 100;
        border-bottom: 1px solid #434343;
      }
      .icon {
        width: 13px;
        height: 13px;
        background: url('/mobile/static/img/others/add.png') no-repeat;
        background-size: 100% 100%;
      }
      .list-childer li {
        height: 34px;
        line-height: 34px;
        font-weight: 100;
        border-bottom: 1px solid #434343;
        text-align:left;
      }
    }
  }
  .footer-tips{
    background: #000;
    padding: 0 30px 30px;
    color:#646464;
    font-size: 10px;
    line-height:1.2;
    div:nth-child(1){
      padding:20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    div:nth-child(2){
      padding-bottom:10px;
    }
    div:nth-child(3){
      a{
        color:#4a79fa;
        text-decoration:underline;
        padding-bottom:2px;
      }
    }

  }
</style>
