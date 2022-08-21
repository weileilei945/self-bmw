<template>
  <div class="container">
    <div class="content">
      <div class="content-login">
        <div class="logo"></div>
        <div class="tips">
          <div class="h1">注册</div>
          <div class="h3">欢迎加入Achen&Cybe俱乐部</div>
        </div>
        <div class="tabs-box">
            <span @click="active = 0" :class="{ active: active === 0 }"
            >邮箱注册</span
            >
          <span @click="active = 1" :class="{ active: active === 1 }"
          >手机号注册</span
          >
          <span
              class="border-line"
              :style="{ left: active === 0 ? 0 : '50%' }"
          ></span>
        </div>
        <el-form
            class="form"
            ref="emailForm"
            key="emailForm"
            :rules="emailRules"
            :model="emailForm"
            v-if="active === 0"
        >
          <el-form-item prop="email">
            <el-input
                v-model="emailForm.email"
                placeholder="邮箱*"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="emailForm.password"
                type="password"
                placeholder="密码*"
            ></el-input>
          </el-form-item>
          <el-form-item prop="againPassword">
            <el-input
                v-model="emailForm.againPassword"
                type="password"
                placeholder="再次输入密码*"
            ></el-input>
          </el-form-item>
          <el-form-item prop="subscribe">
            <el-checkbox v-model="emailForm.subscribe"
            >同意并愿意遵守Achen&Cybe
              <el-link
                  style="margin-top: -3px"
                  @click.native.stop="$router.push({ name: 'clause' })"
              >使用条款
              </el-link
              >
            </el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm('emailForm')"
            >提交
            </el-button
            >
            <br/>
            <div style="text-align: center">
              <el-link
                  type="primary"
                  :underline="false"
                  @click="$router.push({ name: 'LoginEmail' })"
              >立即登录
              </el-link
              >
            </div>
          </el-form-item>
        </el-form>
        <el-form
            class="form"
            ref="phoneForm"
            key="phoneForm"
            :rules="phoneRules"
            :model="phoneForm"
            v-if="active === 1"
        >
          <el-form-item prop="phone">
            <el-input v-model="phoneForm.phone" placeholder="手机号*">
              <template slot="append">
                <span v-show="seconds != 0">{{ seconds }}秒后重试</span>
                <el-button class="append" v-show="seconds == 0" @click="takeCode"
                >获取验证码
                </el-button
                >
              </template>
            </el-input>

          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="phoneForm.password"
                type="password"
                placeholder="密码*"
            ></el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <el-input
                v-model="phoneForm.vcode"
                placeholder="验证码*"
            ></el-input>
          </el-form-item>
          <el-form-item prop="subscribe">
            <el-checkbox v-model="phoneForm.subscribe"
            >同意并愿意遵守Achen&Cybe
              <el-link
                  style="margin-top: -3px"
                  @click.native.stop="$router.push({ name: 'clause' })"
              >
                使用条款
              </el-link>
            </el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm('phoneForm')"
            >提交
            </el-button
            >
            <br/>
            <div style="text-align: center">
              <el-link
                  type="primary"
                  :underline="false"
                  @click="$router.push({ name: 'LoginEmail' })"
              >立即登录
              </el-link
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.emailForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      active: 1,
      seconds: 0,
      emailForm: {
        email: "",
        password: "",
        againPassword: "",
        subscribe: "",
      },
      emailRules: {
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {
            pattern:
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            message: "邮箱格式非法",
            trigger: "blur",
          },
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
        againPassword: [
          {required: true, message: "请再次输入密码", trigger: "blur"},
          {validator: validatePwd, trigger: "blur"},
        ],
        subscribe: [
          {
            required: true,
            message: "请查看并勾选使用条款",
            trigger: "change",
          },
        ],
      },

      phoneForm: {
        email: "",
        password: "",
        vcode: "",
        subscribe: "",
      },
      phoneRules: {
        phone: [
          {required: true, message: "请输入手机号", trigger: "blur"},
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式非法",
            trigger: "blur",
          },
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
        vcode: [{required: true, message: "请输入验证码", trigger: "blur"}],
        subscribe: [
          {
            required: true,
            message: "请查看并勾选使用条款",
            trigger: "change",
          },
        ],
      },
    }
  },
  methods: {
    takeCode() {
      this.$refs.phoneForm.validateField("phone", (valid) => {
        if (!valid) {
          this.$api
              .sendCode({
                phone: this.phoneForm.phone,
                type: 1,
              })
              .then((res) => {
                if (res.code === 0) {
                  this.$toast({
                    type: "success",
                    message: "发送成功",
                  })
                  this.seconds = 60;
                  let timer = setInterval(() => {
                    this.seconds = this.seconds - 1;
                    if (this.seconds == 0) {
                      clearInterval(timer);
                    }
                  }, 1000);
                }
              });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const Request =
              formName === "emailForm"
                  ? this.$api.registeredByEmail
                  : this.$api.registeredByPhone;
          Request(this[formName])
              .then((res) => {
                if (res.code === 0) {
                  this.$toast({
                    type: "success",
                    message: "注册成功,正在登录",
                  });
                  this.$store.commit("setTicket", res.data.ticket);
                  return this.$api.getUserId({ticket: res.data.ticket});
                }
              })
              .then((res) => {
                if (res && res.code === 0) {
                  return this.$api.getClientInfo({id: res.data.userId});
                }
              })
              .then((res) => {
                if (res && res.code === 0) {
                  this.$store.commit("setUserInfo", res.data);
                  this.$toast({
                    type: "success",
                    message: "登录成功",
                    onClose: () => {
                      if (window.sessionStorage.getItem("isCompletion")) {
                        let query = JSON.parse(window.sessionStorage.getItem("isCompletion"));
                        this.$router.push({
                          name: "ShopCar",
                          query: query,
                        });
                      } else {
                        this.$router.push("/");
                      }
                    },
                  });
                }
              });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  background: #111;
  height: calc(100vh - 44px - 136px);
  overflow: auto;
  box-sizing: border-box;

  .content {
    width: 100%;
    height:100%;
    background: #252525;
    padding: 10px;

    &-login {
      width: 100%;
      height: 100%;
      background: #fff;
      overflow: auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .logo {
        width: 100%;
        height: 80px;
        background: url('/mobile/static/img/logo_w.png') no-repeat center;
        background-size: 200px;
        margin-top:-15px;
      }

      .tips {
        height: 42px;
        color: #666;
        text-align: center;

        .h1 {
          font-size: 20px;
          line-height: 1;
        }

        .h3 {
          font-size: 12px;
          line-height:1.6;
        }
      }

      .tabs-box {
        height: 50px;
        line-height: 50px;
        width: calc(100% - 80px);
        margin: 0px 40px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #eee;
        position: relative;
        text-align: center;

        span {
          width: 50%;
          cursor: pointer;

          &.active {
            color: #4aabf2;
          }
        }

        .border-line {
          position: absolute;
          width: 50%;
          bottom: 0;
          height: 2px;
          z-index: 2;
          background-color: #4aabf2;
          transition: left 0.3s;
        }
      }

      ::v-deep .form {
        padding: 0 40px;
        margin: 30px auto 0;
        width:100%;

        .el-input-group__append {
          background-color: #fff !important;
        }
      }
      ::v-deep .el-form-item:nth-child(3){
         margin-bottom:10px;
       }
      ::v-deep .el-form-item:nth-child(4){
        margin-bottom:10px;
      }
      ::v-deep .el-form-item:nth-child(5){
        margin-bottom:0px;
      }
    }
  }
}
</style>
