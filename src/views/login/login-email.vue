<template>
<div class="container">
    <div class="content">
      <div class="content-login">
        <div class="logo">
          <div class="h1">登入</div>
          <div class="h2">欢迎回来。</div>
        </div>
        <div class="tabs-box">
            <span @click="active = 0" :class="{ active: active === 0 }"
            >手机登录</span
            >
          <span @click="active = 1" :class="{ active: active === 1 }"
          >邮箱登录</span
          >
          <span
              class="border-line"
              :style="{ left: active === 0 ? 0 : '50%' }"
          ></span>
        </div>
        <el-form
            class="form"
            ref="phoneForm"
            key="phoneForm"
            :rules="phoneRules"
            :model="phoneForm"
            v-if="active === 0"
        >
          <el-form-item prop="phone">
            <el-input
                v-model="phoneForm.phone"
                placeholder="手机号*"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="phoneForm.password"
                type="password"
                placeholder="密码*"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm('phoneForm')"
            >立即登录
            </el-button
            >
            <div>
              <span>
                <el-link
                    type="primary"
                    :underline="false"
                    @click="$router.push({ name: 'Register' })"
                >立即注册</el-link
                >
              </span>

              <div
                  class="forget-text"
                  @click="$router.push({ name: 'Login' })"
              >
                忘记密码
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-form
            class="form"
            ref="emailForm"
            key="emailForm"
            :rules="emailRules"
            :model="emailForm"
            v-if="active === 1"
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
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm('emailForm')"
            >立即登录
            </el-button
            >
            <div>
              <span>
                <el-link
                    type="primary"
                    :underline="false"
                    @click="$router.push({ name: 'Register' })"
                >立即注册</el-link
                >
              </span>

              <div
                  class="forget-text"
                  @click="$router.push({ name: 'Login' })"
              >
                忘记密码
              </div>
            </div>
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
      active: 0,
      seconds: 0,
      emailForm: {
        email: "",
        password: "",
      },
      phoneForm: {
        phone: "",
        password: "",
      },
      emailRules: {
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {
            pattern:
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            message: "邮箱格式非法",
            trigger: "onBlur",
          },
        ],
        password: [{required: true, message: "请输入密码", trigger: "onBlur"}],
      },
      phoneRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式非法",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const Request =
              formName === "emailForm"
                  ? this.$api.loginByEmail
                  : this.$api.loginByPhonePwd;
          Request(this[formName])
              .then((res) => {
                if (res.code === 0) {
                  console.log(this)
                  this.$store.commit("setTicket", res.data.ticket);
                  return this.$api.getUserId({ticket: res.data.ticket});
                }
              })
              .then((res) => {
                if (res.code === 0) {
                  return this.$api.getClientInfo({id: res.data.userId});
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
      width:100%;
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
