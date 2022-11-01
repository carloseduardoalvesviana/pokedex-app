<script>
import { getPokemons } from "../services/pokemonService";

export default {
  name: "HomePage",
  data() {
    return {
      pokemons: [],
      pokemonName: null,
      message: null,
    };
  },
  methods: {
    async getPokemons() {
      try {
        const response = await getPokemons(this.pokemonName);
        this.pokemons = response;
        this.message = "";
      } catch (error) {
        this.message = "Pokemon não encontrado";
      }
    },

    toDetails(pokemonId) {
      this.$router.push({ name: "details", params: { id: pokemonId } });
    },
  },
};
</script>

<template>
  <main class="container">
    <form action="" method="post">
      <input
        type="text"
        name="pokemon"
        id="pokemon"
        v-model="pokemonName"
        class="pokemon-name"
        placeholder="ditto"
      />
      <button type="button" @click="getPokemons">Procurar</button>
    </form>

    <p v-if="message">
      {{ message }}
    </p>

    <section class="content-pokemon">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="pokemon-details"
        @click="toDetails(pokemon.id)"
      >
        <img
          :src="pokemon?.sprites?.front_default"
          class="pokemon-image"
          alt="pokemon"
          aria-describedby="pokemon"
        />
        <p>
          <strong>{{ pokemon?.name }}</strong>
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.container {
  max-width: 800px;
  margin: auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;

  form {
    min-width: 310px;
    display: flex;

    button {
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 5px;
      padding: 0 5px;
    }
  }

  .pokemon-name {
    padding: 5px;
    outline: none;
    width: 100%;
    height: 35px;
    max-height: 40px;
    border: none;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .messageContent {
    background: #f46060;
    width: 400px;
    border-radius: 10px;
    padding: 5px;
    color: #fff;
    margin-top: 30px;
    text-align: center;
  }
}
.content-pokemon {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .pokemon-image {
    margin-top: -50px;
  }

  .pokemon-details {
    text-align: center;
    width: 200px;
    background: #fff;
    margin: 50px 5px;
    border-radius: 10px;
    height: 100px;
    cursor: pointer;

    &:hover {
      background: #f2f7f9;
    }
  }
}
</style>
