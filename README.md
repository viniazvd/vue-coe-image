<h1 align="center">vue-coe-image ✅</h1>

<p align="center">
  <q>Component for progressive and lazy rendering images inspired by:
    <a href='https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API'>
      <b>Intersection Observer API</b>
    </a>
  </q>
</p>

<p align="center">
  <a href="https://github.com/VitorLuizC/vue-data-tablee"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

<br>

<p align="center">
  ✨ <a href="#">Example</a>✨
</p>

<br>

**Explanation**
https://developers.google.com/web/tools/lighthouse/audits/offscreen-images

<br>

**Disclaimer**

In the past, it was very difficult and expensive to detect the visibility of a particular element.

The Intersection Observer API solves this problem in a really organized, efficient and performative way. 
It provides a workable template that we can observe to be notified when an element enters the viewport.

<br>

**Competitive Diferentials**
<ul style='margin: 0; padding: 0; color: red; list-style-type: none;'>
  <li>Loads image only when it enters the viewport (<i>check in browser network</i>)</li>
  <li>Progressive image loading with animations</li>
  <li>Performant progressive blur using SVG</li>
  <li>You receive intersection events to decide whether or not to perform tasks or animation processes based on whether the user will see the result or not.</li>
</ul>

<br>

**Warning**
<br>
The IntersectionObserver API is not fully supported by all modern browsers just yet, but there’s a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) for it maintained by the w3c.

<br>

**Install**

`yarn add vue-coe-image@latest`


**Include Plugin**
```javascript
import Vue from 'vue'

import { VueCoeImage } from 'vue-coe-image'

Vue.use(VueCoeImage)
```

<br>

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

<br>

**A Note on Performance**

<p>Observe the elements occupy memory and CPU!</p>

<p>For this reason, immediately after finding the element, we use an instance method named <b>disconnect</b> to stop observing and make the lib more performative.</p>


<br>

## Props

Name                |   type   | required | About
-----               | -------  | -------- | ------
src                 |  String  |  `true`  | Image to load when crossing viewport
srcset              |  String  |  `false` | Images to be used for different resolutions
fallback            |  String  |  `false` | Also known as a 'placeholder', this prop avoids an error if it fails or delays loading the image.
intersectionOptions |  Object  |  `false` | [options by mdn](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer)


You could listen to the intersect and load events for more complex animations and state handling:

## Events

Name       | About
-----      | -----
intersect  | Triggered when the image intersects the viewport
error      | Triggered when an image upload error occurs

