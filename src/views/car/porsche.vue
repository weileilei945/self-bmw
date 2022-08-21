<template>
  <div class="container">
    <CarList :list="carList"></CarList>
  </div>
</template>
<script>
  import CarList from '../../components/car-list.vue'
  export default {
    name: '',
    components: {
      CarList
    },
    data() {
      return {
        carList: [
          {
            name: '911',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: '718',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'Macan',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'Panamera',
            img: '/mobile/static/img/navbar/other.png'
          }
        ]
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
