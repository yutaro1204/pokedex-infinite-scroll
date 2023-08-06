import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { fetchPokemons } from '@/app/api'
import { PokemonsList } from '@/app/components/pokemons/index'

export default async function Pokemons() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['pokemons'], fetchPokemons)
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="p-[24px]">
      <Hydrate state={dehydratedState}>
        <PokemonsList />
      </Hydrate>
    </main>
  )
}
