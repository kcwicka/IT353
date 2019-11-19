<template>
    <li class="curved">
          <pre>Game Name   {{ game.title }}
Publisher   {{ game.publisher }}
Game Genre  {{ game.genre }}
Players     {{ game.players.min }} to {{ game.players.max }}</pre>
        <button class="curved" title="Update Game" type="button" @click="$router.push({ name: 'Update Game', params: { curData: game } })">📝</button>
        <button class="curved" title="Delete Game" type="button" @click="removeGame(game._id)">🗑️</button>
    </li>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI'
export default {
  props: [ 'game' ],
  methods: {
    async removeGame (id) {
      const { data: response } = await GameClosetAPI.removeGame(id)
      this.$emit('popup', response)
      if (response.ok) {
        this.$emit('refresh', response)
      }
    }
  }
}
</script>

<style></style>
