<template>
  <div class="container">
    <div class="content">
      <div class="content-login">
        <img class="logo" src="/mobile/static/img/logo_w.png" alt=""/>
        <el-form
            class="form"
            ref="form"
            key="form"
            :rules="rules"
            :model="form"
        >
          <el-form-item prop="password">
            <el-input
                v-model="form.password"
                placeholder="新密码*"
            ></el-input>
          </el-form-item>
          <el-form-item prop="againPassword">
            <el-input
                v-model="form.againPassword"
                placeholder="再次输入新密码*"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm"
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
  data() {
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入的新密码不一致"));
      } else {
        callback();
      }
    };
    return {
      height: "",
      form: {
        password: "",
        againPassword: "",
      },
      rules: {
        password: [{required: true, message: "请输入新密码", trigger: "blur"}],
        againPassword: [
          {required: true, message: "请再次输入新密码", trigger: "blur"},
          {validator: validatePwd, trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api
              .saveClientInfo({
                id: this.$store.state.userInfo.id,
                password: this.form.password,
              })
              .then((res) => {
                if (res.code === 0) {
                  this.$toast({
                    type: "success",
                    message: "修改成功",
                    onClose: () => {
                      this.$router.push({name: "Order"});
                    },
                  });
                  return this.$api.getClientInfo({id: this.$store.state.userInfo.id});
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
      flex-direction: column;
      justify-content: center;



      .logo {
        width: 200px;
        margin:0 auto;
      }
    }


    ::v-deep .form {
      padding: 0 40px;

      .forget-text {
        float: right;
        font-size: 12px;
        line-height: 43px;
      }
    }
  }
}
</style>
