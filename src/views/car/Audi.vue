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
            name: 'S4/A4',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'RS 4',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'A6',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'RS 6',
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
