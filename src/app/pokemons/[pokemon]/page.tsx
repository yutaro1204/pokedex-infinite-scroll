import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { fetchPokemon } from '@/app/api'
import { PokemonDetail } from '@/app/components/pokemon'

export default async function Pokemon({ params }: { params: { pokemon: string } }) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['pokemon'], () => fetchPokemon(params.pokemon))
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="p-[24px]">
      <Hydrate state={dehydratedState}>
        <PokemonDetail pokemon={params.pokemon} />
      </Hydrate>
    </main>
  )
}
