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
            name: '全部车型',
            _id: 1,
            path: '/cartype'
          },
          {
            name: '合作与联络',
            _id: 2,
            path: '/InvestorsFormPage'
          },
          {
            name: 'A&C价值观',
            _id: 3,
            path: '/ValuesPage'
          },
          {
            name: 'A&C艺术馆',
            _id: 4,
            path: '/ArtGalleryPage'
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
