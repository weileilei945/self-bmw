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
            name: 'The3',
            img: '/mobile/static/img/navbar/m3m4.png',
            router: 'the3'
          },
          {
            name: 'M3/M4',
            img: '/mobile/static/img/navbar/the3.png',
            router: 'm4'
          },
          {
            name: 'The5',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'X3',
            img: '/mobile/static/img/navbar/other.png'
          },
          {
            name: 'M2',
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
