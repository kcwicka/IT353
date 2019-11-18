<template>
    <header>
        <button type="button" @click="link('/')" title="Home">🎲</button>
        <button type="button" @click="link('/add-game')" title="Add...">➕</button>
        <button type="button" @click="link('/closet')" title="View...">📃</button>
        <button type="button" id="toggle" @click="togglePalette()" title="Toggle Night Mode" />
    </header>
</template>

<script>
export default {
  data: () => ({ light: '🌞', dark: '🌑', toggle: {} }),
  mounted () {
    this.toggle = document.querySelector('#toggle')
    this.toggle.innerText =
      document.body.classList.contains('pal-solar-dk')
        ? this.light
        : this.dark
  },
  methods: {
    togglePalette () {
      const config =
        (this.toggle.innerText === this.dark)
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
      this.toggle.innerText = this.toggle.innerText.replace(config.oldBtn, config.newBtn)
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
