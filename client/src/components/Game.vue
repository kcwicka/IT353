<template>
    <li>
        <table>
            <tr>
                <td>Game Name</td>
                <td><b>{{ game.title }}</b></td>
            </tr>
            <tr>
                <td>Publisher</td>
                <td><b>{{ game.publisher }}</b></td>
            </tr>
            <tr>
                <td>Game Genre</td>
                <td><b>{{ game.genre }}</b></td>
            </tr>
            <tr>
                <td>Players</td>
                <td><b>{{ game.players.min }} to {{ game.players.max }}</b></td>
            </tr>
            <tr>
                <td colspan="100%">
                    <button title="Update Game" type="button" @click="$router.push({ name: 'Update Game', params: { curData: game } })">📝</button>
                    <button title="Delete Game" type="button" @click="removeGame(game._id)">🗑️</button>
                </td>
            </tr>
        </table>
    </li>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI'
export default {
  props: [ 'game' ],
  methods: {
    async removeGame (id) {
      const { data: response } = await GameClosetAPI.removeGame(id)
      if (response.ok) {
        this.$emit('refresh', response.ok)
      } else {
        this.$emit('popup', response.error)
      }
    }
  }
}
</script>

<style></style>
