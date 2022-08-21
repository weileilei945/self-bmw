<template>
  <ul class="list">
    <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">
      <div>{{ item.name }}</div>
      <div class="arrow"></div>
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
      }
    },
    data() {
      return {}
    },
    methods: {
      handleClick(item) {
        this.$emit('handle-click', item)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list {
    background: #252525;
    padding: 0 21px;
    min-height: calc(100% - 180px);
    li {
      width: 100%;
      height: 49px;
      font-size: 14px;
      box-sizing: border-box;
      border-bottom: 1px solid #4f4f4f;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      .arrow {
        width: 18px;
        height: 12px;
        background: url('/mobile/static/img/others/arrowdown.png') no-repeat;
        background-size: 100% 100%;
        transform: rotate(-90deg);
      }
    }
  }
</style>
