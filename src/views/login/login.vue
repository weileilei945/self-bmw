<template>
  <div class="container">
    <div class="content">
      <div class="content-login">
        <div class="logo">
          <div class="h1">登入</div>
          <div class="h2">欢迎回来。</div>
        </div>
        <div class="tabs-box">
            <span class="active">
              手机登录
            </span>
          <span
              class="border-line"
              style="left:25%"
          ></span>
        </div>
        <el-form
            ref="form"
            key="form"
            class="form"
            :rules="rules"
            :model="form"
        >
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="在此输入手机号*">
              <template slot="append">
                <span v-show="seconds != 0">{{ seconds }}秒后重试</span>
                <el-button class="append" v-show="seconds == 0" @click="takeCode"
                >获取验证码
                </el-button
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <el-input v-model="form.vcode" placeholder="验证码*"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm()"
            >提交
            </el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: '',
  data() {
    return {
      seconds: 0,
      form: {
        phone: "",
        vcode: "",
      },
      rules: {
        phone: [
          {required: true, message: "请输入手机号", trigger: "blur"},
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式非法",
            trigger: "blur",
          },
        ],
        vcode: [{required: true, message: "请输入验证码", trigger: "blur"}],
      },
    }
  },
  methods: {
    takeCode() {
      this.$refs.form.validateField("phone", (valid) => {
        if (!valid) {
          this.$api
              .sendCode({
                phone: this.form.phone,
                type: 0,
              })
              .then((res) => {
                if (res.code === 0) {
                  this.$toast({ type: 'success', message: '发送成功！' });
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
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api
              .loginByPhone(this.form)
              .then((res) => {
                if (res.code === 0) {
                  this.$store.commit("setTicket", res.data.ticket);
                  return this.$api.getUserId({ ticket: res.data.ticket });
                }
              })
              .then((res) => {
                if (res.code === 0) {
                  return this.$api.getClientInfo({ id: res.data.userId });
                }
              })
              .then((res) => {
                if (res.code === 0) {
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
  }
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
    height: 100%;
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
        padding-bottom: 44px;
        text-align: center;

        .h1 {
          font-size: 22px;
          line-height: 1.2;
        }

        .h2 {
          font-size: 14px;
          text-align: center;
          line-height: 1;
        }
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
      width: 100%;
      padding: 0 40px;
      margin-top: 30px;

      .forget-text {
        float: right;
        font-size: 12px;
        line-height: 43px;
      }
    }
  }
}
</style>
