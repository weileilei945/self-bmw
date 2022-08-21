<template>
  <ul class="list">
    <li v-for="(item, index) in list" :key="index" @click="toGo(item)">
      <div>{{ item.name }}</div>
      <div class="car-img" style="">
        <img :src="item.img" alt="" height="" />
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    height: {
      type: [String, Number],
      default: 98
    }
  },
  data() {
    return {}
  },
  methods: {
    toGo(item) {
      if (item.router) {
        this.$router.push({ name: item.router })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  background: #252525;
  padding: 0 21px 50px;
  min-height: calc(100% - 180px);
  li {
    width: 100%;
    height: 129px;
    font-size: 18px;
    box-sizing: border-box;
    border-bottom: 1px solid #4f4f4f;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    .car-img {
      height: 100px;
      img {
        height: 100%;
      }
    }
  }
}
</style>
