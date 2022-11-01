import httpClient from "../http/client/axios";

export const getPokemons = async (pokemon) => {
  let result = await httpClient.get(`/pokemon-species/${pokemon}/`);

  let pokemonsAndEvolutions = [];
  await fetch(`${result.data.evolution_chain.url}`)
    .then((response) => response.json())
    .then((data) => {
      pokemonsAndEvolutions.push(
        data?.chain?.species?.name ?? data?.chain?.species?.name
      );
      pokemonsAndEvolutions.push(
        data?.chain?.evolves_to[0]?.species?.name ??
          data?.chain?.evolves_to[0]?.species?.name
      );
      pokemonsAndEvolutions.push(
        data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name ??
          data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name
      );
    });

  const pokemons = pokemonsAndEvolutions.filter((data) => data);

  const promisesArray = pokemons.map(async (pokemon) => {
    const response = await getPokemon(pokemon);
    return response.data;
  });

  const pokemonsData = await Promise.all(promisesArray);

  return pokemonsData;
};

export const getPokemon = async (pokemon) => {
  const data = await httpClient.get(`/pokemon/${pokemon}`);
  return data;
};
