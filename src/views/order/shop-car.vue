<template>
  <div class="container">
    <div class="content">
      <div class="my-car">
        <div class="h1">我的购物车</div>
        <div class="tab-box d-flex">
          <div class="common" :class="{ active: type === 1 }" @click="type = 1">为我送货</div>
          <div class="common" :class="{ active: type === 2 }" @click="type = 2">配送至服务商</div>
        </div>
        <div class="price">您的购物车总计 {{ $formatPrice(total, "RMB") }}。</div>
      </div>
      <div class="goods">
        <div class="title">商品</div>
        <div class="img-list">
          <div class="d-flex" style="margin:0 auto;"
               :style="{ width: 90 * list.length + 12 * (list.length - 1) + 'px' }">
            <div class="item" v-for="(item, index) in list" :key="index">
              <img :src="item.img" alt=""/>
            </div>
          </div>
        </div>
        <div class="logo-tips">基于 {{
            $route.query.cartype === "carlistBMW3"
                ? "BMW The 3"
                : $route.query.cartype === "carlistM3"
                    ? "BMW M3/M4"
                    : "Challenger SRT"
          }} 的雷肯茨博碳纤维风格化组件
        </div>
        <div class="common-tips first">
          所有部件均参与Achen&Cybe Care+计划，您无需额外付费即可享受Care+服务，即发生意外剐蹭后5折置换全新的配件。
          <span @click="$router.push({name:'CarEPlusPage'})">进一步了解Achen&Cybe Care+计划。</span>
        </div>
        <div class="common-tips">
          购买后您将有资格加入Achen&Cybe俱乐部，享受更多俱乐部线下活动、车友圈动态、车友生活分享及A&C产品资讯。
          <span @click="$router.push({name:'ClubPage'})">进一步了解Achen&Cybe Club。 </span>
        </div>
      </div>
      <div class="addr">
        <div class="address">今天订购，送货至：<span>{{ clientAdderss }}</span></div>
        <div class="send">预计{{ $route.query.completionTime }}送达</div>
        <div class="desc">
          <p>我们将随机分配物流承运商，您可以在订单详情中追踪承运商物流状态。</p>
          <p>免费物流服务</p>
        </div>
      </div>
      <div class="service">
        <template v-if="type === 1">
          <div class="address-title">您的送货地址是哪里？</div>
          <div>
            <div class="address-con">
              <div class="address-left">
                <div>填写送货地址</div>
                <div
                    class="ipt-box"
                    style="cursor: pointer"
                    @click="addAddress"
                    v-if="!address.length"
                >
                  新建收获地址
                </div>
                <button
                    @click="addressClick"
                    class="address-btn"
                    v-if="address.length"
                >
                  {{ isEdit ? "保存地址" : "修改地址" }}
                </button>
                <div class="tips-box" style="color:rgba(255,255,255,0.6)">
                  <div style="margin-bottom: 20px">请注意以下几点：</div>
                  <div>
                    我们将使用收件人手机号码来发送有关送货状态更新的短信以及安排送货。
                  </div>
                  <div>
                    我们将使用联系人电话号码来沟通有关订单或付款方面的事宜。
                  </div>
                  <div>请填写中国大陆的收货地址。</div>
                </div>
              </div>
              <div class="address-right">
                <template v-if="address.length">
                  <template v-if="isEdit">
                    <input
                        type="text"
                        name="name"
                        v-model="form.name"
                        placeholder="姓名"
                    />
                    <span
                        @click="addressShow = true">
                      <input
                          type="text"
                          name="city"
                          v-model="form.city"
                          placeholder="请选择省份/城市"
                          disabled
                      />
                    </span>

                    <van-popup v-model="addressShow" round position="bottom">
                      <van-cascader
                          v-model="addressVal"
                          title="请选择服务商所在地区"
                          :options="cityList"
                          :field-names="{
                            text: 'label',
                            value: 'id',
                            children: 'children',
                          }"
                          active-color="#397bff"
                          @close="addressShow = false"
                          @finish="addressFinish"
                      />
                    </van-popup>
                    <!--                    <el-cascader-->
                    <!--                        :options="cityList"-->
                    <!--                        v-model="form.city"-->
                    <!--                        filterable-->
                    <!--                        :props="{-->
                    <!--                          value: 'label',-->
                    <!--                        }"-->
                    <!--                        placeholder="请选择省份/城市"-->
                    <!--                    ></el-cascader>-->
                    <input
                        type="text"
                        name="address"
                        v-model="form.address"
                        placeholder="请输入详细地址"
                    />
                    <input
                        type="text"
                        name="phone"
                        v-model="form.phone"
                        placeholder="收件人电话号码"
                    />
                  </template>
                  <template v-else>
                    <div
                        class="ipt-box"
                        v-for="item in address"
                        :key="item.id"
                        @click="form = item"
                    >
                      <div>
                        <h6
                        >
                          送货地址
                        </h6>
                        <div
                        >
                          {{ item.name }}
                        </div>
                        <div
                        >
                          {{ item.address }}
                        </div>
                        <div
                        >
                          {{ item.phone }}
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="no-address"
                  >
                    您尚未创建任何收货地址
                  </div>
                </template>
              </div>
            </div>
            <!--              </form>-->
          </div>
        </template>
        <template v-else>
          <div class="service-tips">选择一个服务商</div>
          <div class="d-flex">
            <div class="left">
              <div class="lh-1">查找你身边的服务商</div>
              <div class="choose-city" @click="show = true">{{ merchantsCity ? merchantsCity : "请选择省份/城市" }}</div>
              <van-popup v-model="show" round position="bottom">
                <van-cascader
                    v-model="cascaderVal"
                    title="请选择服务商所在地区"
                    :options="merchantsCityList"
                    :field-names="{
                    text: 'label',
                    value: 'id',
                    children: 'children',
                  }"
                    active-color="#397bff"
                    @close="show = false"
                    @finish="onFinish"
                />
              </van-popup>
              <div class="service-box">
                <div class="left-common d-flex jc-between ai-center"
                     v-for="item in merchantsList"
                     :key="item.id"
                     :class="{ 'is-active': activeMerchants.id === item.id }"
                     @click="activeMerchants = item"
                >
                  <div class="text-left">
                    <div>{{ item.name }}</div>
                    <div style="padding-top: 2px">——{{ item.region }}</div>
                  </div>
                  <div class="free">{{ item.type === 0 ? "免费安装" : "付费安装" }}</div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="right-addr">
                <div>{{ activeMerchants.name }}</div>
                <div>{{ activeMerchants.address }}</div>
                <div>{{ activeMerchants.city }}</div>
              </div>
              <div class="right-msg">
                <div>{{ activeMerchants.tel }}</div>
                <div> {{ activeMerchants.week }}</div>
                <div> {{ activeMerchants.timer }}</div>
              </div>
              <div class="tips-common">
                <div class="item">
                  提取你的在线订单商品。你可以获得安装帮助，还能订购其他配件。可能需要测量体温并佩戴口罩。
                </div>
                <div class="item">当你的订单准备就绪后，我们会向你发送详细的取货说明电子邮件。</div>
              </div>
              <div class="s-tips">
                <div class="s-tips-title">请注意以下几点：</div>
                <p>如果存在需要拆除的旧部件，部分服务商可能会收取相关费用，具体费用以服务商报价为准。</p>
                <p>请勿使用Achen&Cybe合作之外的服务商以免对产品和您的车辆造成损坏。</p>
              </div>
            </div>
          </div>
        </template>

      </div>
      <div class="submit">
        <div class="submit-title">感谢您的订购，Achen&Cybe Club期待您的加入。</div>
        <div class="submit-btn" @click="toGo">继续以选择付款方式</div>
      </div>
    </div>
  </div>
</template>
<script>
const cname = returnCitySN.cname;

const dataCity = require("@/assets/city.json");
export default {
  name: '',
  data() {
    return {
      type: 1,
      isEdit: false,
      show: false,
      addressShow: false,
      addressVal: "",
      merchantsCity: "",
      form: {
        id: "",
        address: "",
        name: "",
        city: "",
        phone: "",
      },
      cascaderVal: "",
      shopList: [],
      address: [],
      cityList: dataCity,
      merchantsCityList: [],
      merchantsList: [],
      activeMerchants: {},
    }
  },
  watch: {
    "$store.state.userInfo": {
      handler(userInfo) {
        if (userInfo) {
          this.form = {
            address: userInfo.deliveryAddress,
            name: userInfo.deliveryName,
            city:
                userInfo.deliveryCityName && userInfo.deliveryCityName.split("/"),
            phone: userInfo.deliveryMobile,
          };
          if (
              Object.keys(this.form).some((key) => {
                return !!this.form[key];
              })
          ) {
            this.form.id = userInfo.id;
            this.address = [];
            this.address.push(this.form);
          } else {
            this.form.id = userInfo.id;
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    total() {
      let total = 0;
      if (this.shopList.length) {
        this.shopList.forEach((item) => {
          item.attrList.forEach((attr) => {
            if (attr.active) {
              total += Number(attr.price);
            }
          });
        });
      }
      return total.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      });
    },
    clientAdderss() {
      let result = cname;
      if (
          this.$store.state.userInfo &&
          this.type === 1 &&
          this.$store.state.userInfo.deliveryCityName
      ) {
        result = this.$store.state.userInfo.deliveryCityName.split("/")[1];
      } else if (this.type === 2) {
        result = this.activeMerchants.city;
      }
      return result;
    },
    list() {
      return this.shopList.filter(item => {
        return item.attrList.some(item => {
          return item.active
        })
      })

    }
  },
  mounted() {
    if (window.sessionStorage.getItem("isCompletion")) {
      window.sessionStorage.removeItem("isCompletion");
    }
    if (window.localStorage.getItem("activeShopList")) {
      this.shopList = JSON.parse(window.localStorage.getItem("activeShopList"));
      this.activeMerchants = this.merchantsList[0];
    } else {
      alert("请先选择商品");
    }
    this.getCity();
  },
  methods: {
    addressFinish({selectedOptions}) {
      this.addressShow = false;
      this.form.city = selectedOptions.map((option) => option.label).join('/');
    },
    onFinish({selectedOptions}) {
      this.show = false;
      this.merchantsCity = selectedOptions.map((option) => option.label).join('/');
      this.getFacilitatorList(this.cascaderVal);
    },

    getCity() {
      this.$api.getAddressAll().then((res) => {
        if (res.code === 0) {
          this.merchantsCityList = res.data.map((item) => {
            let result = {
              id: item.id,
              label: item.cityName,
              level: item.level,
              code: item.cityCode,
              parentId: item.parentId,
            };
            if (item.listAddress) {
              result.children = item.listAddress.map((item) => {
                return {
                  id: item.id,
                  label: item.cityName,
                  level: item.level,
                  code: item.cityCode,
                  parentId: item.parentId,
                };
              });
            }
            return result;
          });
          this.cascaderVal = this.merchantsCityList[0].children[0].id;
          this.merchantsCity = this.merchantsCityList[0].label + '/' + this.merchantsCityList[0].children[0].label,
              this.getFacilitatorList(this.cascaderVal);
        }
      });
    },
    getFacilitatorList(id) {
      if (typeof id !== "string") {
        id = id[1];
      }
      this.$api
          .getFacilitatorList({
            cityid: id,
          })
          .then((res) => {
            if (res.code === 0) {
              this.merchantsList = [];
              this.activeMerchants = {};
              this.merchantsList = res.data.map((item) => {
                return {
                  id: item.id,
                  name: item.facilitatorName,
                  region: item.facilitatorAddressName,
                  city: item.providerCityName,
                  address: item.facilitatorPlace,
                  type: 0,
                  tel: item.phone,
                  week: item.workingHours,
                  timer: item.workingTime,
                };
              });
              if (this.merchantsList.length) {
                this.activeMerchants = this.merchantsList[0];
              }
            }
          });
    },
    addAddress() {
      let id = "";
      for (var i = 0; i < 3; i++) {
        id += Math.floor(Math.random() * 10);
      }
      this.address.push({
        id: id,
        address: "",
        name: "",
        city: "",
        phone: "",
      });
      this.form = this.address[this.address.length - 1];
      this.isEdit = true;
    },
    addressClick() {
      if (this.isEdit) {
        let city = this.form.city ? this.form.city : '';
        if (typeof city !== 'string') {
          city = city.join("/")
        }
        let data = {
          deliveryName: this.form.name,
          deliveryCityName: city,
          deliveryAddress: this.form.address,
          deliveryMobile: this.form.phone,
        };
        if (
            !Object.keys(data).every((key) => {
              return !!data[key];
            })
        ) {
          alert("请完整填写表单");
          return;
        }
        data.id = this.$store.state.userInfo.id;
        data.deliveryCity = "";
        this.$api.saveClientInfo(data).then((res) => {
          if (res.code === 0) {
            this.$api
                .getClientInfo({
                  id: this.$store.state.userInfo.id,
                })
                .then((res) => {
                  if (res.code === 0) {
                    this.$store.commit("setUserInfo", res.data);
                  }
                });
            this.isEdit = !this.isEdit;
          }
        });
      } else {
        this.isEdit = !this.isEdit;
      }
    },
    toGo() {
      let hasaAddress = true;
      if (this.type == "1") {
        Object.values(this.form).forEach((item) => {
          if (!item) {
            hasaAddress = false;
          }
        });
      } else {
        if (!Object.keys(this.activeMerchants).length) {
          hasaAddress = false;
        }
      }

      if (hasaAddress) {
        window.localStorage.removeItem("facilitatorId");
        let shopCar = this.shopList.map((item) => {
          return item.attrList;
        });
        shopCar = shopCar.flat(Infinity);
        window.localStorage.setItem("shopCar", JSON.stringify(shopCar));
        if (this.type == "1" && this.isEdit) {
          let city = this.form.city ? this.form.city : '';
          if (typeof city !== 'string') {
            city = city.join("/")
          }
          let data = {
            deliveryName: this.form.name,
            deliveryCityName: city,
            deliveryAddress: this.form.address,
            deliveryMobile: this.form.phone,
          };
          if (
              !Object.keys(data).every((key) => {
                return !!data[key];
              })
          ) {
            alert("请完整填写表单");
            return;
          }
          data.id = this.$store.state.userInfo.id;
          data.deliveryCity = "";
          this.$api.saveClientInfo(data).then((res) => {
            if (res.code === 0) {
              this.$api
                  .getClientInfo({
                    id: this.$store.state.userInfo.id,
                  })
                  .then((res) => {
                    if (res.code === 0) {
                      this.$store.commit("setUserInfo", res.data);
                    }
                  });
              this.isEdit = !this.isEdit;
            }
          });
        } else if (this.type == "2") {
          window.localStorage.setItem("facilitatorId", this.activeMerchants.id);
        }
        this.$router.push({
          name: "payment",
          query: {cartype: this.$route.query.cartype},
        });
      } else {
        this.$toast({
          message: "请先补全收货地址",
          type: "fail"
        });
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  background: #191919;
  height: 100%;
  overflow: auto;
  color: #fff;

  .van-cascader {
    color: #323233;
  }

  .content {
    width: 100%;
    padding: 0 21px;
    padding: 10px 10px 0;
    background: #191919;

    .my-car {
      height: 120px;
      border-bottom: 1px solid #434343;
      padding: 16px 20px 0;

      .h1 {
        font-size: 15px;
        line-height: 1;
      }

      .tab-box {
        width: 180px;
        height: 26px;
        background: #fff;
        border-radius: 3px;
        overflow: hidden;
        margin: 28px auto 10px;

        .common {
          width: 50%;
          font-size: 12px;
          text-align: center;
          color: #2c2c2c;
          height: 26px;
          line-height: 26px;

          &.active {
            background: #397bff;
            color: #fff;
          }
        }
      }

      .price {
        text-align: center;
        line-height: 1;
        font-size: 15px;
        margin-bottom: 10px;

      }
    }

    .goods {
      height: 220px;
      padding: 0 20px;

      .title {
        font-size: 15px;
        line-height: 40px;
        height: 40px;
      }

      .img-list {
        width: 100%;
        overflow-x: auto;

        .item {
          width: 90px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .item + .item {
          margin-left: 12px;
        }
      }

      .logo-tips {
        padding-bottom: 8px;
        font-size: 12px;
        line-height: 1;
        border-bottom: 1px solid #434343;
      }

      .common-tips {
        font-size: 8px;
        line-height: 1.4;
        height: 30px;
        margin-top: 8px;
        border-bottom: 1px solid #434343;

        span {
          color: #4a79fa;
        }
      }
    }

    .addr {
      height: 95px;
      border-bottom: 1px solid #434343;
      line-height: 1;
      padding: 20px 20px 0;

      .address {
        font-size: 8px;

        span {
          color: #4a79fa;
        }
      }

      .send {
        padding: 8px 0 6px;
        font-size: 13px;
      }

      .desc {
        font-size: 8px;
        line-height: 1.4;
      }
    }

    .service {
      font-size: 8px;
      padding: 0 20px;
      line-height: 1.8;


      .address-title {
        font-size: 12px;
        margin: 16px 0 18px;
      }

      .address-con {
        display: flex;
        justify-content: center;
        align-items: stretch;
        align-content: stretch;

        .ipt-box {
          width: 116px;
          border: 1px solid #3f3f3f;
          padding: 8px;
          text-align: center;
          background-color: #0c0c0c;
          border-radius: 2px;
          color: #fff;
          margin: 10px 0 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .address-btn {
          background-color: #3d7bfe;
          color: #fff;
          padding: 4px 8px;
          font-size: 8px;
          cursor: pointer;
          margin: 10px 0 30px;
        }

        input {
          width: 160px;
          border: 1px solid #3f3f3f;
          padding: 8px;
          text-align: center;
          background-color: #000;
          margin-bottom: 12px;
          border-radius: 2px;
          color: #fff;

          &::placeholder {
            color: #fff;
          }

          &:hover {
            border-color: #fff;
          }
        }

        .address-left {
          width: 160px;
          text-align: left;
        }

        .address-right {
          width: calc(100vw - 160px);
          margin-left: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .no-address {
            color: #535353;
            font-weight: 100;
          }

          .ipt-box {
            margin-top: 0px;
            width: 160px;
            cursor: pointer;
            padding: 10px 12px;
            font-size: 10px;

            h6 {
              font-size: 10px;
              color: #eee;
              font-weight: 100;
              text-align: left;
              margin-bottom: 6px;
            }

            div {
              font-size: 12px;
              text-align: left;
              line-height: 1.6;
            }
          }
        }
      }


      &-tips {
        font-size: 13px;
        height: 60px;
        padding: 16px 0;
        text-align: center;
        line-height: 1;
      }

      .left {
        width: 160px;

        .lh-1 {
          line-height: 1;
        }

        .choose-city {
          margin: 10px 0 15px;
          width: 116px;
          height: 27px;
          color: #fff;
          border: 1px solid #424242;
          text-align: center;
          line-height: 27px;
          border-radius: 3px;
        }

        .service-box {
          height: 200px;
          overflow: auto;
          padding-bottom: 20px;

          .left-common {
            width: 135px;
            margin-bottom: 12px;
            height: 27px;
            color: #fff;
            border: 1px solid #424242;
            text-align: center;
            line-height: 27px;
            border-radius: 3px;
            padding: 2px 5px;
            line-height: 1;

            .free {
              font-size: 10px;
            }

            &.is-active {
              border-color: #3d7bfe;
              color: #3d7bfe;
            }
          }
        }
      }

      .right {
        flex: 1;
        font-size: 8px;
        line-height: 1;

        &-addr {
          font-size: 10px;
          margin-bottom: 10px;

          div {
            margin-bottom: 4px;
          }
        }

        &-msg {
          font-size: 10px;

          margin-bottom: 10px;

          div {
            margin-bottom: 4px;
          }
        }

        .tips-common {
          font-size: 7px;
          line-height: 1.4;

          .item {
            margin-bottom: 13px;
          }
        }

        .s-tips {
          font-size: 6px;
          color: rgba(255, 255, 255, 0.6);

          &-title {
            font-size: 6px;
            margin-bottom: 10px;
          }

          p {
            margin-bottom: 4px;
            line-height: 1.4;
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
}
</style>
