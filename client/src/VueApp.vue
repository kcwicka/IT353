<template>
    <div id="vue-app">
        <Header @popup="popup($event)" :loggedIn="loggedIn" :togg="togg" />
        <div id="notify" class="curved" style="display: none; visibility: hidden;" />
        <main class="curved">
            <router-view @popup="popup($event)"/>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'VueApp',
  computed: {
    togg: () => this.palette === 'pal-solar-lt' ? '🌞' : '🌑'
  },
  data () {
    return {
      loggedIn: false,
      notify: void 0,
      palette: 'pal-solar-lt'
    }
  },
  components: {
    Footer,
    Header
  },
  mounted () {
    // TODO: Maybe cookie to see user preference for color scheme
    document.body.classList.add(this.palette)
    this.notify = document.querySelector('#notify')
  },
  methods: {
    popup (event) {
      let popMsg, popClass
      if (event.ok) {
        // Good Things!
        popClass = 'success'
        const response = event.ok
        if (response.loggedIn) {
          this.loggedIn = response.loggedIn
          popMsg = 'You are now logged in!'
        } else if (response.added) {
          popMsg = 'A new game was added to your closet'
        } else if (response.updated) {
          popMsg = 'Game information has been updated'
        } else if (response.removed) {
          popMsg = 'Game was marked for removal'
        } else {
          popMsg = ' Uh... what'
          popClass = 'warning'
        }
      } else {
        // Bad Things!
        popMsg = event.error
        popClass = 'error'
      }

      this.notify.style.display = 'block'
      this.notify.style.visibility = 'visible'
      this.notify.innerText = popMsg
      this.notify.classList.add(popClass)
      setTimeout(this.clearPopup, 5000)
    },
    clearPopup () {
      this.notify.innerText = ''
      this.notify.classList.remove('error', 'warning', 'success')
      this.notify.style.display = 'none'
      this.notify.style.visibility = 'hidden'
    }
  }
}
</script>

<style>
@import './assets/css/layouts.css';
@import './assets/css/palettes.css';
</style>
