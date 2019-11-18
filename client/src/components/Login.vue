<template>
    <form @submit="login($event)">
        <label for="user">User:</label>
        <input type="text" name="user" id="user" v-model="credentials.user" />
        <label for="pass">Pass:</label>
        <input type="password" name="pass" id="pass" v-model="credentials.pass"  />
        <button type="submit">Login</button>
    </form>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI.js'
export default {
  data: () => ({ credentials: { user: '', pass: '' } }),
  methods: {
    async login (event) {
      event.preventDefault()
      const { data: response } = await GameClosetAPI.login(this.credentials)
      this.$emit('popup', response)
    }
  }
}
</script>

<style></style>
