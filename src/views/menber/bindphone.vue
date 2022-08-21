<template>
  <div class="container">
    <div class="content">
      <div class="content-login">
        <div class="logo">
          <img src="/mobile/static/img/logo_w.png" alt=""/>
          <div class="tips-text">
            验证您的手机号以进行订购
          </div>
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
                type: 2,
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
              .saveClientInfo({
                id: this.$store.state.userInfo.id,
                mobile: this.form.phone,
                vcode: this.form.vcode,
              })
              .then((res) => {
                if (res.code === 0) {
                  this.$toast({
                    type: "success",
                    message: "修改成功",
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
                  return this.$api.getClientInfo({
                    id: this.$store.state.userInfo.id,
                  });
                }
              })
              .then((res) => {
                if (res.code === 0) {
                  this.$store.commit("setUserInfo", res.data);
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
        height: 140px;
        text-align: center;

        img {
          width: 200px;
        }

        tips-text {
          font-size: 12px;
          font-weight: 100;
        }
      }


    }

    ::v-deep .form {
      padding: 0 40px;
      margin: 0 auto 100px;

      .el-input-group__append {
        background-color: #fff !important;
      }
    }
  }
}
</style>
