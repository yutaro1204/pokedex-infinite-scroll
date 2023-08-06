import { Pokemon } from "../types/index"

type Response = {
  count: number
  next: string
  previous: string
  results: Pokemon[]
}

export async function fetchPokemon(pokemon: string): Promise<Pokemon> {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    return res.json()
  }).catch((error) => {
    console.error(error)
  })

  return {
    name: data.name,
    icon: data.sprites.front_default,
    types: data.types.map((type: any) => type.type.name)
  }
}

export function fetchPokemonDetails(pokemons: []) {
  const promises = pokemons.map((pokemon: any) => {
    return fetch(pokemon.url, {
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      return res.json()
    }).catch((error) => {
      console.error(error)
    })
  })

  return Promise.all(promises)
}

export async function fetchPokemons(): Promise<Response> {
  const data =  await fetch('https://pokeapi.co/api/v2/pokemon', {
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    return res.json()
  }).catch((error) => {
    console.error(error)
  })

  const details = await fetchPokemonDetails(data.results)

  const res = {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: details.map((detail: any) => {
      return {
        name: detail.name,
        icon: detail.sprites.front_default,
        types: detail.types.map((type: any) => type.type.name)
      }
    })
  }

  return res
}

export async function fetchMorePokemons(url: string): Promise<Response> {
  const data =  await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    return res.json()
  }).catch((error) => {
    console.error(error)
  })

  const details = await fetchPokemonDetails(data.results)

  const res = {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: details.map((detail: any) => {
      return {
        name: detail.name,
        icon: detail.sprites.front_default,
        types: detail.types.map((type: any) => type.type.name)
      }
    })
  }

  return res
}
