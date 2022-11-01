<script>
import { getPokemon } from "../services/pokemonService";

export default {
  name: "PokemonDetails",
  created() {
    this.getPokemonDetails();
  },
  data() {
    return { pokemon: {} };
  },
  methods: {
    async getPokemonDetails() {
      const { id } = this.$route.params;
      const data = await getPokemon(id);
      this.pokemon = { ...data.data };
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<template>
  <main class="container">
    <div class="pokemon-details">
      <header>
        <img
          class="pokemon-img"
          :src="pokemon?.sprites?.front_default"
          alt="pokemon"
          aria-describedby="pokemon"
        />
        <p>
          <strong>{{ pokemon?.species?.name }}</strong>
        </p>
      </header>

      <section class="infor">
        <ul>
          <li v-for="(stat, index) in pokemon?.stats" :key="index">
            <span>{{ stat?.stat?.name }}: </span>
            <span> {{ stat?.base_stat }}</span>
          </li>
        </ul>
      </section>
    </div>
    <footer class="footer-pokemon-details" @click="back">
      <p>Voltar..</p>
    </footer>
  </main>
</template>

<style lang="scss">
.pokemon-details {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 20px;

  .pokemon-img {
    margin-top: -55px;
    background: #eff1f7;
    border-radius: 50px;
  }
}

.footer-pokemon-details {
  margin-top: 20px;
  padding: 0 15px;
  cursor: pointer;
  border-radius: 5px;
}

.infor {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    list-style-position: inside;

    li {
      margin: 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px;
    }
  }
}
</style>
