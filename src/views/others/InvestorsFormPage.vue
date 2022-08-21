<template>
  <div class="home-page">
    <div class="content-box">
      <div class="banner-box">
        <img src="/mobile/static/img/form/4-1.png" />
      </div>
      <div class="icon-box">
        <div v-for="item in iconList" :key="item.label">
          <img :src="item.icon" />
          <div>{{ item.label }}</div>
        </div>
      </div>
      <div class="tips-box font-small">
        <p v-for="item in tipList" :key="item">{{ item }}</p>
      </div>
      <div class="form-box">
        <form>
          <div class="form-item">
            <label for="name">您的称呼：</label>
            <div style="padding: 0 10px">
              <input id="name" type="text" name="name"  v-model="form.name" />
              <span class="sex-box">
                <input type="hidden" name="sex" v-model="form.sex" />
                  {{ form.sex === "先生" ? "先生" : "女士" }}
                <span class="up-btn" @click="form.sex = form.sex === '先生' ? '女士' : '先生'"></span>
                <span class="down-btn" @click="form.sex = form.sex === '先生' ? '女士' : '先生'"></span>
              </span>
            </div>
          </div>
          <div class="form-item">
            <label for="company">所属公司/机构：</label>
            <div>
              <input id="company" type="text" name="company" v-model="form.company" />
            </div>
          </div>
          <div class="form-item">
            <label for="attr">行业属性：</label>
            <div>
              <input id="attr" type="text" name="attr" v-model="form.attr" />
            </div>
          </div>
          <div class="form-item">
            <label for="content">合作意向描述：</label>
            <div>
              <textarea id="content" type="text" name="content" v-model="form.content" style="height: 214px" />
            </div>
          </div>
          <div class="form-item">
            <label>您的联系方式：</label>
            <div class="inline-label">
              <label>
                <span>微信/电话:</span>
                <input id="phone" type="text" name="phone" v-model="form.phone" />
              </label>
            </div>
            <div class="inline-label">
              <label>
                <span>电子邮箱:</span>
                <input id="email" type="text" name="email" v-model="form.email" />
              </label>
            </div>
          </div>
          <!-- <div class="form-item" style="margin-top: 60px">
            <div>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :limit="4"
                :before-upload="beforeUpload"
                :multiple="true"
              >
                <div>
                  <div class="uplaod-box">附加一个文件（选填）</div>
                  <div slot="tip" class="el-upload__tip"
                    >可用格式DOC、PDF、PPT、JPG、BMP、GIF，您可最多上传4个文件，<br/>单个文件大小不可超过15mb</div
                  >
                </div>
              </el-upload>
            </div>
          </div> -->
        </form>
        <button @click="submit">点此提交表单</button>
        <!-- <div style="margin-bottom: 50px">Achen&Cybe期待与您的合作。</div> -->
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>

export default {
  data() {
    return {
      iconList: [
        {
          icon: '/mobile/static/img/form/4-2.png',
          label: '模具合作商及供应商'
        },
        {
          icon: '/mobile/static/img/form/4-3.png',
          label: '零售商'
        },
        {
          icon: '/mobile/static/img/form/4-4.png',
          label: '全球经销商'
        },
        {
          icon: '/mobile/static/img/form/4-5.png',
          label: '物流承运商（国际/国内）'
        }
      ],
      tipList: [
        '1.请填写表单并提交，我们的商务团队将会尽快与您取得联系。',
        '2.如果您有不同于以上四项的合作或业务需求，可以在表单属性中填写具体事项。',
        '3.Achen&Cybe 信息保密准则：表单回收后，您的信息将被加密，第三方无法读取。'
      ],
      form: {
        name: '',
        sex: "先生",
        company: '',
        attr: '',
        content: '',
        phone: '',
        email: '',
        other: ''
      }
    }
  },
  methods: {
    // beforeUpload(file) {
    //   const typeList = ['DOC', 'PDF', 'PPT', 'JPG', 'BMP', 'GIF']
    //   let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1).toUpperCase()
    //   const extension = typeList.indexOf(testmsg) > -1
    //   if (!extension) {
    //     alert('可用格式DOC、PDF、PPT、JPG、BMP、GIF')
    //   }
    //   return extension
    // }
    submit() {
      const formHasVal = Object.keys(this.form).some((item) => {
        return this.form[item] && item !== "sex";
      });
      if (formHasVal) {
        const mobile = (value) => {
          return /^1[3-9]\d{9}$/.test(value);
        };
        const email = (value) => {
          return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
              value
          );
        };
        if (this.form.phone && !mobile(this.form.phone)) {
          this.$toast({ type: 'fail', message: '手机号不合法' });
          return;
        }
        if (this.form.email && !email(this.form.email)) {
          this.$toast({ type: 'fail', message: '邮箱不合法' });
          return;
        }
        let data = {
          named: this.form.name,
          gender: this.form.sex,
          subordinateCompanies: this.form.company,
          industryAttributes: this.form.attr,
          descriptionCooperation: this.form.content,
          phone: this.form.phone,
          emailAddress: this.form.email,
          attachmentAddress: "",
          attachmentLocalAddress: "",
          attachmentName: "",
        };
        this.$api.saveInvestors(data).then((res) => {
          if (res.code === 0) {
            this.$router.push({ name: "FormResult" });
          }
        });
      } else {
        this.$toast({ type: 'fail', message: '请先完成表单' });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  text-align: center;
  .content-box {
    width: 100%;

    .banner-box {
      width: 100%;
      color: #fff;
      position: relative;

      img {
        width: 100%;
        display: block;
      }
    }

    .icon-box {
      width: calc(100% - 20px);
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      margin: 30px 10px;
      font-size: 6px;
      line-height: 1.2;
      img {
        width: 40px;
        margin-bottom: 10px;
      }
    }

    .tips-box {
      margin-bottom: 30px;
      color: #fff;
      font-size: 6px;
      font-weight: 100;
      p {
        margin-bottom: 4px;
      }
    }

    .form-box {
      width: calc(100% - 20px);
      background: #2d2d2d;
      box-shadow: -10px 10px 30px #0c0c0c;
      color: #fff;
      margin: 0 auto 20px;
      padding: 30px 0;

      .form-item {
        label {
          font-size: 12px;
          line-height: 24px;
        }

        & > div {
          width: 340px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;

          &.inline-label {
            width: 340px;

            label {
              width: 100%;
              display: flex;
              height: 38px;
              margin-left: -32px;

              span {
                min-width: 78px;
                font-size: 12px;
                height: 38px;
                line-height: 38px;
                margin-right: 10px;
                text-align: right;
              }

              input {
                width: 340px;
                line-height: 2;
                font-size: 12px;
              }
            }
          }

          input,
          textarea {
            width: 100%;
            border: 1px solid #505050;
            background: none;
            padding: 6px 10px;
            resize: none;
            color: #fff;
            line-height: 2;
            font-size: 12px;
          }

          .sex-box {
            width: 100px;
            box-sizing: border-box;
            margin-left: 16px;
            border: 1px solid #505050;
            height: 36px;
            line-height: 36px;
            position: relative;
            padding-right: 10px;

            .up-btn {
              position: absolute;
              right: 10px;
              top: 8px;
              width: 0;
              height: 0;
              border-top: 0px solid transparent;
              border-right: 4px solid transparent;
              border-bottom: 6px solid #fff;
              border-left: 4px solid transparent;
              cursor: pointer;

              &:hover {
                border-bottom-color: #409eff;
              }
            }

            .down-btn {
              position: absolute;
              right: 10px;
              bottom: 8px;
              width: 0;
              height: 0;
              border-top: 6px solid #fff;
              border-right: 4px solid transparent;
              border-bottom: 0px solid transparent;
              border-left: 4px solid transparent;
              cursor: pointer;

              &:hover {
                border-top-color: #409eff;
              }
            }
          }

          .upload-demo {
            .uplaod-box {
              border: 1px dashed #fff;
              font-size: 18px;
              line-height: 34px;
              width: 340px;
              margin: 0 auto;
            }

            .el-upload__tip {
              color: #fff;
              width: 560px;
              font-size: 10px;
              margin-top: 14px;
              line-height:1.4;
            }
          }
        }

        .inline-label + .inline-label {
          margin-top: 30px;
        }
      }

      button {
        width: 80%;
        font-size: 12px;
        background-color: #3d7bfe;
        color: #fff;
        margin: 38px 0;
      }
    }
  }
}
</style>
