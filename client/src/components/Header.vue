<template>
    <header>
        <span id="navbar" v-if="loggedIn">
            <button type="button" @click="link('/')" title="Home">🎲</button>
            <button type="button" @click="link('/add-game')" title="Add...">➕</button>
            <button type="button" @click="link('/closet')" title="View...">📃</button>
            <button type="button" id="toggle" @click="togglePalette()" title="Toggle Night Mode">{{ togg }}</button>
        </span>
        <Login v-else @popup="$emit('popup', $event)"/>
    </header>
</template>

<script>
import Login from './Login'
export default {
  components: { Login },
  data: () => ({ light: '🌞', dark: '🌑', toggle: {} }),
  props: [ 'loggedIn', 'togg' ],
  methods: {
    togglePalette () {
      const toggle = document.querySelector('#toggle')
      const config =
        (toggle.innerText === this.dark)
          ? ({
            oldBtn: this.dark,
            newBtn: this.light,
            oldPal: 'pal-solar-lt',
            newPal: 'pal-solar-dk'
          })
          : ({
            oldBtn: this.light,
            newBtn: this.dark,
            oldPal: 'pal-solar-dk',
            newPal: 'pal-solar-lt'
          })
      document.body.classList.replace(config.oldPal, config.newPal)
      toggle.innerText = toggle.innerText.replace(config.oldBtn, config.newBtn)
    },
    test () {
      this.$router.push('/')
    },
    async link (src) {
      try {
        await this.$router.push(src)
      } catch (err) { }
    }
  }
}
</script>

<style></style>
