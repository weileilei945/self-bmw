<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="app-content-box" :class="{'al-center':isCenter}">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'
import Footer from './components/footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      isCenter: false,
    }
  },
  mounted() {
    if (localStorage.getItem("ticket")) {
      this.$api
          .verifySticket({ticket: localStorage.getItem("ticket")})
          .then((res) => {
            if (res.code === 0) {
              return this.$api.getUserId({
                ticket: localStorage.getItem("ticket"),
              });
            } else {
              this.$store.commit("loginOut");
            }
          })
          .then((res) => {
            if (res && res.code === 0) {
              return this.$api.getClientInfo({id: res.data.userId});
            } else if (res.code === 500) {
              this.$store.commit("loginOut");
              this.$router.push({name: "LoginEmail"})
            }
          })
          .then((res) => {
            if (res && res.code === 0) {
              this.$store.commit("setUserInfo", res.data);
            }
          })
    }
  },
  watch: {
    "$route": {
      handler(val) {
        const navRouter = ["Volkswagen", "Porsche", "Audi", "Benz", "Bwm", "Dodge", "CarType", "user", "Car"];
        if (navRouter.indexOf(val.name) > -1) {
          this.isCenter = false;
        } else {
          this.isCenter = true;
        }
      }
    }
  }
}
</script>


<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: Noto Sans SC, Avenir, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
}

div {
  box-sizing: border-box;
}

.app-content-box {
  min-height: calc(100vh - 44px - 136px);
  background-color: #252525;
  display: flex;
  justify-content: center;
}

.al-center {
  align-items: center;
}

.font-large {
  font-size: 20px !important;
}

.font-medium {
  font-size: 15px !important;
}

.font-small {
  font-size: 6px !important;
  line-height: 1.6 !important;
}

.font-mini {
  font-size: 8px !important;
  color: #8b8b8b !important;
}

.font-content {
  font-size: 12px !important;
  line-height: 1.4 !important;
  font-weight: 100 !important;
}


@for $i from 1 through 140 {
  .font-#{$i} {
    font-size: #{$i}px !important;
  }
}

// 字体
$fontSizeArr: 100, 300, 500; // 取值范围只能是所定义的这几个值
@each $item in $fontSizeArr {
  .fw-#{$item} {
    font-weight: #{$item};
  }
}
</style>
