<template>
  <div class="container">
    <div class="content">
      <div class="content-login">
        <img class="logo" src="/mobile/static/img/logo_w.png" alt=""/>
        <el-form
            ref="form"
            key="form"
            class="form"
            :rules="rules"
            :model="form"
        >
          <el-form-item prop="nickName">
            <el-input
                v-model="form.nickName"
                placeholder="在此输入ID*"
            ></el-input>
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
      form: {
        nickName: "",
        clientName: "",
      },
      rules: {
        nickName: [{required: true, message: "请输入ID", trigger: "blur"}],
      },
    }
  },
  watch: {
    "$store.state.userInfo": {
      handler(userInfo) {
        this.form = {
          nickName: userInfo.nickName,
        };
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api
              .saveClientInfo({
                id: this.$store.state.userInfo.id,
                nickName: this.form.nickName,
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
      flex-direction: column;
      align-content: center;
      justify-content: center;

      .logo {
        width: 200px;
        margin: 0 auto;
      }


    }

    ::v-deep .form {
      padding: 0 60px;

      .forget-text {
        float: right;
        font-size: 12px;
        line-height: 43px;
      }
    }
  }
}
</style>
