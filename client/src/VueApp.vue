<template>
    <div id="vue-app">
        <Header @popup="popup($event)" :loggedIn="loggedIn" :togg="togg" />
            <main>
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
    return { loggedIn: false, palette: 'pal-solar-lt' }
  },
  components: {
    Footer,
    Header
  },
  mounted () {
    // TODO: Maybe cookie to see user preference for color scheme
    document.body.classList.add(this.palette)
  },
  methods: {
    popup (event) {
      let response, popMsg, popClass
      if (event.ok) {
        // Good Things!
        response = event.ok
        if (response.loggedIn) {
          // Response from logging in
          this.loggedIn = response.loggedIn
          popMsg = 'You are now logged in!'
          popClass = 'success'
        }
      } else {
        // Bad Things!
        response = event.error
        popMsg = event.error
        popClass = 'error'
      }

      console.log('API Response:')
      console.log(response)
      console.log('Popup Message:')
      console.log(popMsg)
      console.log('Popup Type/Class:')
      console.log(popClass)
    }
  }
}
</script>

<style>
@import './assets/css/layouts.css';
@import './assets/css/palettes.css';
</style>
