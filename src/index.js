import './style.css'

const image = {
  name: 'vue-coe-image',

  props: {
    loaderImage: {
      type: String,
      default: 'https://cdn-images-1.medium.com/max/1600/1*9EBHIOzhE1XfMYoKz1JcsQ.gif'
    },
    src: {
      type: [String, File],
      required: true
    },
    srcset: String,
    fallback: {
      type: String
    },
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
      default: 500
    },
    intersectionOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      rate: 1,

      observer: {},

      image: null,
      imageHandler: null,

      hasError: false,
      intersected: false
    }
  },

  watch: {
    src: 'setSource',
    hasError: 'setFallback'
  },

  created () {
    this.image = this.loaderImage

    this.$once('hook:mounted', () => {
      setTimeout(() => {
        this.observer = new IntersectionObserver(targets => {
          const image = targets[0]

          if (image.isIntersecting) {
            this.intersected = true
            this.setImage()
            this.observer.disconnect()
            this.$emit('intersect')
          }
        }, this.intersectionOptions)

        this.observer.observe(this.$el)
      }, this.delay)
    })

    this.$once('hook:beforeDestroy', () => {
      setTimeout(() => {
        this.observer.unobserve(this.$el)
      }, this.delay)
    })
  },

  computed: {
    deviation () {
      return this.blurLevel * this.rate
    }
  },

  methods: {
    setSource (x, y) {
      if (x !== y) {
        this.hasError = false
        this.setImage()
      }
    },

    setFallback (status) {
      if (status) this.image = this.fallback
    },

    handleLoad () {
      this.image = this.imageHandler.src
      this.animation && this.animate()
    },

    handleError () {
      if (process.env.NODE_ENV !== 'production' && !this.fallback) {
        console.warn('an error occured during the image loading')
      }

      this.hasError = true
      this.$emit('error')
    },

    setImage () {
      this.imageHandler = new Image()
      this.imageHandler.src = this.src || this.placeholder

      this.imageHandler.onload = this.handleLoad
      this.imageHandler.onerror = this.handleError
    },

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
      ref: 'img',
      class: 'lazy-load-image',
      style: `url(${this.image})`,
      attrs: { src: this.image }
    })

    return h('div', { class: 'vue-coe-image' }, [ !this.hasError && this.intersected && svg, image ])
  },

  install (Vue) {
    Vue.component('VueCoeImage', image)
  }
}

export default image
