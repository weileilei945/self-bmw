<template>
  <div class="container">
    <div class="content">
      <div class="content-login">
        <div class="logo">
          <img src="/mobile/static/img/logo_w.png" alt=""/>
        </div>
        <el-form
            ref="form"
            key="form"
            class="form"
            :rules="rules"
            :model="form"
        >
          <el-form-item prop="email">
            <el-input
                v-model="form.email"
                placeholder="在此输入邮箱*"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm()"
            >提交</el-button
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
        email: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            message: "邮箱格式非法",
            trigger: "blur",
          },
        ],
      },
    }
  },
  watch: {
    "$store.state.userInfo": {
      handler(userInfo) {
        this.form = {
          email: userInfo.mailbox,
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
                mailbox: this.form.email,
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
          font-weight: 100
        }
      }


    }

    ::v-deep .form {
      padding: 0 40px;

       .el-input-group__append {
        background-color: #fff !important;
      }
    }
  }
}
</style>
