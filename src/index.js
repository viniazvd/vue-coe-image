import './style.css'

const image = {
  name: 'vue-coe-image',

  props: {
    src: {
      type: String,
      required: true
    },
    srcset: String,
    fallback: String,
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
      default: 1000
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

  mounted () {
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
      const fallbackSrc = this.fallback
      const imageSource = this.hasError ? fallbackSrc : this.src

      if (this.intersected) {
        if (this.srcset) {
          return this.srcset
        } else {
          return imageSource
        }
      } else {
        return ''
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
      attrs: { src: this.image },
      class: 'lazy-load-image',
      on: {
        load: this.animate,
        error: this.handleError
      }
    })

    return h('div', { class: 'vue-coe-image' }, [ svg, image ])
  },

  beforeDestroy () {
    // defensive code
    this.observer.unobserve()
  }
}

export default image

export const VueCoeImage = {
  install (Vue, { name = 'vue-coe-image' } = {}) {
    Vue.component(name, this)
  }
}
