import './style.css'

const image = {
  name: 'vue-coe-image',

  props: {
    src: {
      type: [String, File],
      required: true
    },
    srcset: String,
    fallback: String,
    animation: {
      type: Boolean,
      default: true
    },
    delay: {
      type: [String, Number],
      default: 0
    },
    blurLevel: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1500
    },
    intersectionOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      rate: 1,
      observer: null,
      intersected: false,
      hasError: false
    }
  },

  watch: {
    src (x, y) {
      if (x !== y) this.hasError = false
    }
  },

  created () {
    setTimeout(() => {
      this.observer = new IntersectionObserver(targets => {
        const image = targets[0]

        if (image.isIntersecting) {
          this.intersected = true
          this.observer.disconnect()
          this.$emit('intersect')
        }
      }, this.intersectionOptions)

      this.observer.observe(this.$el)
    }, this.delay)
  },

  computed: {
    image () {
      const image = this.hasError ? this.fallback : this.src

      if (this.intersected) {
        return (this.srcset && this.srcset) || image
      }
    },

    deviation () {
      return this.blurLevel * this.rate
    }
  },

  methods: {
    animate () {
      const start = Date.now() + this.duration

      const step = () => {
        const remaining = start - Date.now()

        if (remaining < 0) {
          this.rate = 0
        } else {
          this.rate = remaining / this.duration
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    },

    handleError () {
      if (process.env.NODE_ENV !== 'production' && !this.fallback) {
        console.warn('an error occured during the image loading')
      }

      this.hasError = true
      this.$emit('error')
    }
  },

  render (h) {
    const feGaussianBlur = h('feGaussianBlur', { attrs: { in: 'SourceGraphic', stdDeviation: this.deviation } })
    const filter = h('filter', { attrs: { id: 'blur' } }, [ feGaussianBlur ])
    const defs = h('defs', null, [ filter ])

    const svg = h('svg', {
      class: ['filter-defs-svg hidden'],
      attrs: { xmlns: 'http://www.w3.org/2000/svg', version: '1.1' } }, [ defs ])

    const image = h('img', {
      style: this.style,
      attrs: { src: this.image },
      class: 'lazy-load-image',
      ref: 'img',
      on: {
        load: this.animation && this.animate,
        error: this.handleError
      }
    })

    return h('div', { class: 'vue-coe-image' }, [ this.animation && svg, image ])
  },

  beforeDestroy () {
    this.observer.unobserve(this.$refs.img)
  }
}

export default image

export const VueCoeImage = {
  install (Vue) {
    Vue.component('VueCoeImage', image)
  }
}