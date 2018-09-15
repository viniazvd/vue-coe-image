<h1 align="center">vue-coe-image ✅</h1>

<p align="center">
  <q>Component for progressive and lazy rendering images</q>
</p>

<p align="center">
  ✨ <a href="#">Example</a>✨
</p>

**Install**

`yarn add vue-coe-image@latest`

**Include Plugin**
```javascript
import Vue from 'vue'

import { VueCoeImage } from 'vue-coe-image'

Vue.use(VueCoeImage)
```

**Use**
```vue
<template>
  <div>
    <vue-coe-image
      :src="src"
      fallback="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    />
    <button @click="changeImage">coe</button>
  </div>
</template>

<script>
import VueCoeImage from 'vue-coe-image'

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
```

## Props

Name       |   type   | required | About
-----      | -------  | -------- | ------


## Events

Name       | About
-----      | -----

