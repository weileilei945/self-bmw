<template>
  <div class="container">
    <List :list="list" @handle-click="handleClick"></List>
  </div>
</template>
<script>
  import List from '../../components/list.vue'
  export default {
    name: '',
    components: {
      List,
    },
    data() {
      return {
        list: [
          {
            name: 'BMW品牌',
            _id: 1,
            path: '/bmw'
          },
          {
            name: 'DODGE品牌',
            _id: 2,
            path: '/dodge'
          },
          {
            name: 'Audi品牌',
            _id: 3,
            path: '/Audi'
          },
          {
            name: 'Mercedes-Benz品牌',
            _id: 4,
            path: '/benz'
          },
          {
            name: 'Volkswagen品牌',
            _id: 5,
            path: '/volkswagen'
          },
          {
            name: 'PORSCHE品牌',
            _id: 6,
            path: '/porsche'
          }
        ]
      }
    },
    methods: {
      handleClick(item) {
        this.$router.push(item.path)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    background: #252525;
    height: 100%;
    overflow: auto;
  }
</style>
