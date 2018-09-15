<template>
  <div id="#app" class="app">
    <vue-coe-image
      class="coe"
      :src="src"
      fallback="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    />

    <button @click="changeImage">coe</button>
  </div>
</template>

<script>
import VueCoeImage from '../src/index'

export default {
  components: { VueCoeImage },

  data () {
    return {
      src: 'https://3.bp.blogspot.com/-PRG407gZ9bE/V0TCSHFQKcI/AAAAAAAADjE/KbkLmxIXcjMcx4hKTFnDSQxcdPqGuNNWwCLcB/s1600/flamengologo.png'
    }
  },

  methods: {
    changeImage () {
      this.src = 'https://www.urbanarts.com.br/imagens/produtos/065033/Detalhes/urubu-do-mengao.jpg'
    }
  }
}
</script>

<style scoped>
.coe {
  max-width: 300px;
  max-width: 300px;
}

.app {
  height: 2000px;
  position: relative;
}

.coe {
  bottom: 0;
  position: absolute;
  max-width: 300px;
  max-width: 300px;
}
</style>
