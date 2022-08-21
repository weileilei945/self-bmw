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
            name: 'C-class',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'A45 AMG',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'G63 AMG',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'AMG GT',
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
