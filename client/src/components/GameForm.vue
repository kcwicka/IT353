<template lang="html">
    <form @submit="processForm($event)">
        <div>
            <input placeholder="Game Name" type="text" id="GameName" v-model="gameData.title">
        </div>
        <div>
            <input placeholder="Publisher" type="text" id="Publisher" v-model="gameData.publisher">
        </div>
        <div>
            <input placeholder="Genre" list="Genres" id="Genre" v-model="gameData.genre">
        </div>
        <div>
            Players: <input type="number" id="MinPlayers" v-model="gameData.players.min">
        -- <input type="number" id="MaxPlayers" v-model="gameData.players.max">
        </div>
        <div>
            <input type="hidden" id="_id" v-model="gameData._id">
            <button type="submit" title="Put in Closet">✔️</button>
        </div>
        <datalist id="Genres">
            <optgroup label="Board Games">
                <option value="Strategy"></option>
            </optgroup>
            <optgroup label="Card Games">
                <option value="Trading Card Games"></option>
            </optgroup>
        </datalist>
    </form>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI.js'

export default {
  data () {
    return {
      gameData: {
        title: '',
        publisher: '',
        genre: '',
        players: {
          min: 0,
          max: 0
        },
        _id: ''
      }
    }
  },
  mounted () {
    if (this.curData) {
      this.gameData = this.curData
    }
  },
  methods: {
    async processForm (event) {
      event.preventDefault()
      const game = Object.assign({ view: true }, this.gameData)
      if (game._id === '') {
        delete game._id
      }
      const { data: response } = await GameClosetAPI.saveGame(game)
      let pop
      if (response.ok) {
        setTimeout(() => { this.$router.push('/closet') }, 1000)
        pop = response.ok.ops ? response.ok.ops[0] : response.ok
      } else {
        pop = response.error
      }
      this.$emit('popup', pop)
    }
  },
  props: ['curData']
}
</script>

<style></style>
